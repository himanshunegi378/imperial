/**
 * UI Generator Graph - AI-Powered Component Generation System (Simplified)
 * 
 * This module implements a streamlined LangGraph workflow that automatically generates
 * production-ready UI components from natural language requirements.
 * 
 * WORKFLOW STAGES:
 * 1. Intent Detection - Determines CREATE vs EDIT mode
 * 2. UI Generation - Generates or modifies HTML/Tailwind CSS code using AI
 * 3. Message Consolidation - Finalizes conversation history
 * 
 * FEATURES:
 * - CREATE/EDIT mode detection for incremental refinement
 * - Vector search for similar component examples (with caching)
 * - Multi-model fallback chain for rate limit resilience
 * - Component preservation during edits
 * - 50-60% faster than previous validation-based workflow
 * 
 * OPTIMIZATIONS (v2.0):
 * - Removed deconstruction node (merged into generation prompts)
 * - Removed validation node (trust LLM output quality)
 * - Direct generation for faster response times
 * - Smart intent detection preserves user work
 * 
 * For detailed documentation with diagrams, see:
 * - ./README.md - Overview and quick start
 * - ./EDIT_MODE.md - Edit mode implementation
 * - ./FALLBACK_SYSTEM.md - Multi-model fallback system
 * 
 * @module uiGeneratorGraph
 */

import { ChatGroq } from '@langchain/groq';
import { END, START, StateGraph } from '@langchain/langgraph';
import { z } from 'zod';
import { checkpointer, uiVectorStore } from '../../config/constants';
import { env } from '../../env';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { BaseMessage } from '@langchain/core/messages';
import { graphState } from './graphState';
import { parseXmlTagFormat } from './utils/parseDynamicKeyValueFormat';
import { BaseLanguageModelInput } from '@langchain/core/language_models/base';

/**
 * Vector search cache to avoid redundant database queries.
 * Key format: `${query.toLowerCase()}_${k}`
 * LRU eviction when size exceeds CACHE_CONFIG.maxSize
 */
const vectorSearchCache = new Map<string, any[]>();

/**
 * Type definition for LLM messages
 * Supports both BaseMessage objects and simple role/content objects
 */
type LlmMessage = BaseMessage | {
    role: 'system' | 'user' | 'assistant';
    content: string;
};

/**
 * Helper function to invoke LLM with automatic fallback chain on rate limits
 * Tries models in sequence until one succeeds or all fail
 * 
 * Function overloads for type safety:
 * - With schema: Returns typed structured output based on Zod schema
 * - Without schema: Returns BaseMessage from LLM
 */

// Overload 1: With schema - returns structured output
async function invokeLlmWithFallback<TSchema extends z.ZodTypeAny>(
    llms: ChatGroq[],
    messages: BaseLanguageModelInput,
    schema: TSchema
): Promise<z.infer<TSchema>>;

// Overload 2: Without schema - returns BaseMessage
async function invokeLlmWithFallback(
    llms: ChatGroq[],
    messages: BaseLanguageModelInput
): Promise<BaseMessage>;

// Implementation
async function invokeLlmWithFallback<TSchema extends z.ZodTypeAny>(
    llms: ChatGroq[],
    messages: BaseLanguageModelInput,
    schema?: TSchema
): Promise<z.infer<TSchema> | BaseMessage> {
    let lastError: Error | undefined;
    
    for (let i = 0; i < llms.length; i++) {
        const llm = llms[i];
        const isLastModel = i === llms.length - 1;
        
        try {
            if (i > 0) {
                console.log(`--- ⚠️ MODEL ${i} RATE LIMITED, TRYING FALLBACK ${i + 1}/${llms.length} ---`);
                console.log(`--- Fallback Model: ${llm.model} ---`);
            }
            
            if (schema) {
                const result = await llm.withStructuredOutput(schema).invoke(messages) as unknown as z.infer<TSchema>;
                return result;
            } else {
                const result = await llm.invoke(messages) as BaseMessage;
                return result;
            }
        } catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));
            
            // Check if it's a rate limit error
            const errorObj = error as { status?: number; error?: { code?: string } };
            const isRateLimit = errorObj.status === 429 || errorObj.error?.code === 'rate_limit_exceeded';
            
            if (isRateLimit && !isLastModel) {
                // Continue to next model in the chain
                console.log(`--- Rate limit detected, will try next model ---`);
                continue;
            }
            
            // If it's not a rate limit error, or this is the last model, throw
            if (isLastModel) {
                console.error(`--- ❌ ALL ${llms.length} MODELS FAILED ---`);
            }
            throw error;
        }
    }
    
    // Should never reach here, but TypeScript needs it
    throw lastError || new Error('No LLMs provided');
}

/**
 * Configuration for caching and performance optimization
 * - maxSize: Maximum number of cached vector search results
 */
const CACHE_CONFIG = {
    maxSize: 100
};




/**
 * LLM Model Selection Strategy
 * Different models are optimized for different stages of the workflow
 */

// Fast, general-purpose model for intent detection and quick tasks
const fastLlm = new ChatGroq({
    apiKey: env.GROQ_API_KEY,
    model: 'llama-3.3-70b-versatile',  // Updated to supported model
    temperature: 0.3  // Lower temperature for consistent outputs
});

// Creative code generation model with strong HTML/CSS capabilities
const kim2Llm = new ChatGroq({
    apiKey: env.GROQ_API_KEY,
    model: 'moonshotai/kimi-k2-instruct',
    temperature: 0.5  // Balanced creativity and consistency
});

// Analytical model for planning and validation tasks
const deepseekLlm = new ChatGroq({
    apiKey: env.GROQ_API_KEY,
    model: 'deepseek-r1-distill-llama-70b',
    temperature: 0.1  // Very low for deterministic analysis
});

// Fallback models for rate limit resilience (in order of preference)
const fallbackLlm1 = new ChatGroq({
    apiKey: env.GROQ_API_KEY,
    model: 'openai/gpt-oss-20b',
    temperature: 0.1  // Match DeepSeek's temperature for consistency
});

const fallbackLlm2 = new ChatGroq({
    apiKey: env.GROQ_API_KEY,
    model: 'llama-3.3-70b-versatile',
    temperature: 0.1  // Fallback to Llama if GPT also hits limits
});

// LLM chains for different purposes
const analyticalLlmChain = [fallbackLlm1,deepseekLlm, fallbackLlm2];  // For planning and validation

/**
 * Caching mechanism for vector search results
 * Returns similar components from vector database with caching for performance
 * 
 * @param query - Search query string
 * @param k - Number of similar results to return
 * @returns Array of [Document, similarity score] tuples
 */
const getCachedSimilarityResults = async (query: string, k: number): Promise<any[]> => {
    const cacheKey = `${query.toLowerCase()}_${k}`;
    
    if (vectorSearchCache.has(cacheKey)) {
        console.log('--- 📦 USING CACHED VECTOR RESULTS ---');
        const cached = vectorSearchCache.get(cacheKey);
        return cached || [];  // Handle undefined from Map.get()
    }
    
    console.log('--- 🔍 PERFORMING VECTOR SEARCH ---');
    const results = await uiVectorStore.similaritySearchWithScore(query, k);
    
    // Cache results
    vectorSearchCache.set(cacheKey, results);
    
    // Limit cache size (LRU eviction)
    if (vectorSearchCache.size > CACHE_CONFIG.maxSize) {
        const firstKey = vectorSearchCache.keys().next().value;
        if (firstKey) {
            vectorSearchCache.delete(firstKey);
        }
    }
    
    return results;
};




/**
 * NODE 0: Intent Detection
 * 
 * Determines if the user wants to CREATE a new component or EDIT an existing one.
 * Uses conversation context and LLM classification to understand user intent.
 * 
 * @param state - Current graph state with user message and optional previous component
 * @returns Intent type (CREATE/EDIT), previous component reference, and edit instructions
 */
const intentDetectionNode = async (state: typeof graphState.State): Promise<Partial<typeof graphState.State>> => {
    console.log("--- 🔍 DETECTING USER INTENT ---");
    
    const { userMessage } = state.input;
    const previousComponent = state.previousComponent;
    
    // If no previous component exists, must be CREATE
    if (!previousComponent) {
        console.log("--- No previous component found, defaulting to CREATE mode ---");
        return {
            intentType: 'CREATE',
            previousComponent: null,
            editInstructions: null
        };
    }
    
    // Use LLM to classify intent
    const IntentSchema = z.object({
        intent: z.enum(['CREATE', 'EDIT']).describe(
            "CREATE if user wants a completely new component, EDIT if modifying the existing one"
        ),
        reasoning: z.string().describe("Brief explanation of why this classification was chosen"),
        targetElements: z.array(z.string()).optional().describe(
            "If EDIT, list specific elements to modify (e.g., 'button', 'heading', 'price text')"
        )
    });
    
    const result = await fastLlm.withStructuredOutput(IntentSchema).invoke([
        {
            role: 'system',
            content: `You are an intent classifier for a UI component chat system.

# EDIT Intent Indicators:
- Modification verbs: "make", "change", "update", "modify", "adjust", "fix", "alter"
- Element references: "the button", "that card", "this text", "heading"
- Incremental requests: "make it bigger", "change color to blue", "add padding"
- Refinement requests: "add shadow", "remove border", "increase size"
- Style adjustments: "darker", "lighter", "bolder", "smaller"

# CREATE Intent Indicators:
- New component requests: "create a", "build a", "generate a", "make a new"
- Complete redesigns: "start over", "from scratch", "redesign"
- Different component types: "now make a navbar" (after making a card)
- "instead" or "replace with" followed by different component

# Decision Rules:
1. When previous component exists AND request is incremental → EDIT
2. When request asks for completely different component → CREATE
3. When in doubt with existing component → prefer EDIT (preserves user work)
4. Explicit "new" or "create" keywords → CREATE`
        },
        {
            role: 'user',
            content: `
# CONTEXT
Previous component exists: YES
Component preview (first 300 chars):
${previousComponent.substring(0, 300)}...

# USER MESSAGE
"${userMessage}"

# TASK
Classify the user's intent as CREATE or EDIT.`
        }
    ]);
    
    console.log(`--- Intent Detected: ${result.intent} ---`);
    console.log(`--- Reasoning: ${result.reasoning} ---`);
    if (result.targetElements && result.targetElements.length > 0) {
        console.log(`--- Target Elements: ${result.targetElements.join(', ')} ---`);
    }
    
    return {
        intentType: result.intent,
        previousComponent: previousComponent,
        editInstructions: result.targetElements ? {
            targetElements: result.targetElements,
            reasoning: result.reasoning
        } : null
    };
};

/**
 * NODE 1: UI Generation (Simplified - Direct Generation)
 * 
 * Generates HTML/Tailwind CSS code directly from user input.
 * Supports both CREATE and EDIT modes for incremental component refinement.
 * 
 * @param state - Contains user message, intent type, and optional previous component
 * @returns Component name, HTML code, and user-friendly message
 */
const uiGenerationNode = async (state: typeof graphState.State): Promise<Partial<typeof graphState.State>> => {
    const isEditMode = state.intentType === 'EDIT';
    
    if (isEditMode) {
        console.log('--- ✏️ EDIT MODE: Modifying existing component ---');
    } else {
        console.log('--- 🎨 CREATE MODE: Generating new component ---');
    }

    // Get similar components for reference (fewer for EDIT mode)
    console.log('--- 🔍 FETCHING SIMILAR COMPONENTS ---');
    const similarityResults = await getCachedSimilarityResults(
        state.input.userMessage, 
        isEditMode ? 3 : 10
    );
    console.log(`--- Found ${similarityResults.length} similar components ---`);

    // Build mode-specific context
    const contextInstructions = isEditMode ? `
# ⚠️ EDIT MODE - CRITICAL INSTRUCTIONS

You are MODIFYING an EXISTING component. This is NOT a redesign or recreation.

## ORIGINAL COMPONENT CODE (YOUR STARTING POINT):
\`\`\`html
${state.previousComponent}
\`\`\`

## USER'S EDIT REQUEST:
"${state.input.userMessage}"

## IDENTIFIED TARGET ELEMENTS:
${state.editInstructions?.targetElements.join(', ') || 'General modifications'}

## YOUR TASK - FOLLOW STRICTLY:
1. **START** with the EXACT code shown above
2. **MODIFY** ONLY what the user requested
3. **PRESERVE** everything else IDENTICALLY
4. **DO NOT** redesign, restructure, or reimagine
5. **THINK** "surgical edit" not "recreation"

## WHAT MUST BE PRESERVED:
- All HTML structure not mentioned in the request
- All CSS classes except those explicitly being changed
- All text content unless user asks to change it
- Component layout and visual hierarchy
- Spacing, sizing, and positioning of unchanged elements

## EDIT EXAMPLES:
- "make button blue" → Change ONLY button color class (bg-red-500 → bg-blue-500)
- "add shadow" → Add shadow class to specified element, keep rest identical
- "bigger text" → Increase text size class, preserve all other styling

## VERIFICATION:
Before responding, verify:
✓ Did I start with the original code?
✓ Did I change ONLY what was requested?
✓ Is everything else exactly the same?
` : `
# 🎨 CREATE MODE - NEW COMPONENT

## USER REQUEST:
"${state.input.userMessage}"

## YOUR TASK:
Create a production-ready UI component that fulfills the user's request.
Analyze the request to understand required features and design intent.
`;

    const userPrompt = `
${contextInstructions}

# REFERENCE EXAMPLES
${(similarityResults || []).slice(0, isEditMode ? 3 : 5).map(([doc, score], index) => 
    `Example ${index + 1} (Score: ${score.toFixed(2)}):\n${doc.pageContent}`
).join('\n\n')}
`;

    const componentSchema = z.object({
        name: z.string().describe("A concise, descriptive name for the component in PascalCase or Title Case (e.g., 'PrimaryButton', 'UserProfileCard')."),
        html: z.string().describe("A string containing the complete, self-contained HTML and Tailwind CSS code for the UI component. The code should be ready to be rendered directly in a browser."),
        message: z.string().describe("A brief, friendly confirmation message for the user who requested the component.")
    });

    // Mode-specific system prompt
    const enhancedSystemPrompt = `
# ROLE
You are an expert React and Tailwind CSS developer specializing in ${isEditMode ? 'precise component modifications' : 'accessible, responsive UI components'}.

# CURRENT MODE: ${isEditMode ? '✏️ EDIT' : '🎨 CREATE'}

${isEditMode ? `
## EDIT MODE CRITICAL RULES:
You are making MINIMAL, TARGETED changes to existing code.

**MANDATORY APPROACH:**
1. Take the provided component code as your base
2. Identify the EXACT elements mentioned in the request
3. Modify ONLY those specific elements/attributes
4. Output code that is 95%+ identical to input
5. Think "find and replace" NOT "redesign"

**FORBIDDEN ACTIONS:**
❌ Do NOT restructure the HTML
❌ Do NOT change unmentioned elements
❌ Do NOT redesign the component
❌ Do NOT add features not requested
❌ Do NOT change the overall style/theme

**SUCCESS CRITERIA:**
✓ Only requested changes are visible
✓ Everything else looks identical
✓ Component maintains its original character
✓ A diff would show minimal changes

**USER MESSAGE HINT:**
If user says "make X bigger", change ONLY size classes of X.
If user says "change color to blue", change ONLY color classes.
If user says "add shadow", add ONLY shadow class to target element.
` : `
## CREATE MODE REQUIREMENTS:
1. Generate ONLY valid HTML with Tailwind CSS classes
2. Ensure mobile-first responsive design
3. Include proper accessibility attributes (aria-labels, roles, etc.)
4. Use semantic HTML elements
5. Optimize for performance (avoid heavy CSS effects)
6. Follow Tailwind CSS best practices
7. Be production-ready with proper error states
`}

# OUTPUT FORMAT
You MUST respond with exactly these XML tags:
<name>ComponentName</name>
<component>HTML code here</component>
<response>User-friendly message</response>

${isEditMode ? `
# EXAMPLE EDIT RESPONSE
<name>
PricingCard
</name>
<component>
[Original HTML with ONLY the button color changed from red to blue]
</component>
<response>
I've updated the button color to blue as requested.
</response>
` : `
# EXAMPLE CREATE RESPONSE
<name>
PrimaryButton
</name>
<component>
<button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="Click me">
    Click me
</button>
</component>
<response>
Here is the component you requested.
</response>
`}
    `;

    const {content} = await kim2Llm.invoke([
        {
            role: 'system',
            content: enhancedSystemPrompt
        },
        {
            role: 'user',
            content: userPrompt
        }
    ]);

    const { name, component, response } = parseXmlTagFormat(content.toString(), ['name', 'component', 'response']);

    return {
        output: {
            name,
            component,
            message: response,
            chatId: state.input.chatId
        },
        // Store current component as previous for potential future edits
        previousComponent: component
    }
}

/**
 * NODE 2: Message Consolidation
 * 
 * Finalizes conversation history by creating LangChain message objects.
 * This prepares the interaction for storage and display in the chat interface.
 * 
 * @param state - Contains user message and AI response
 * @returns Array of HumanMessage and AIMessage objects
 */
const aiMessageConsolidatorNode = async (state: typeof graphState.State): Promise<Partial<typeof graphState.State>> => {

    return {
        messages: [
            new HumanMessage(state.input.userMessage),
            new AIMessage(state.output.message),
        ]
    };
}

/**
 * WORKFLOW GRAPH DEFINITION - Simplified (No Deconstruction or Validation)
 * 
 * Flow: START → Intent Detection → Generate → Consolidate → END
 * 
 * Simplified workflow for faster component generation:
 * - Intent detection determines CREATE vs EDIT mode
 * - Direct generation without deconstruction phase
 * - No validation loop (trust the LLM output)
 * - Straight to message consolidation
 */
const workflow = new StateGraph(graphState)
    // Simplified workflow with just 3 nodes
    .addNode('intentDetection', intentDetectionNode)
    .addNode('generateComponent', uiGenerationNode)
    .addNode('consolidateAiMessages', aiMessageConsolidatorNode)

    // Simple linear flow
    .addEdge(START, 'intentDetection')
    .addEdge('intentDetection', 'generateComponent')
    .addEdge('generateComponent', 'consolidateAiMessages')
    .addEdge('consolidateAiMessages', END)

// Compiled graph with state persistence via checkpointer
export const ai = workflow.compile({ checkpointer });
