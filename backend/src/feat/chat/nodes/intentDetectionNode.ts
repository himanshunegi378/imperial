/**
 * Intent Detection Node
 * 
 * This node determines if the user wants to CREATE a new component, EDIT an existing one,
 * or is just having casual conversation (IDLECHAT). Uses conversation context and LLM
 * classification to understand user intent.
 */

import { z } from 'zod';
import { llmService } from './shared';
import { graphState } from '../graphState';
import { IntentType, EditInstructions, NodeResult } from './shared/types';
import { IDLECHAT_PATTERNS, ModelType } from './shared/constants';

/**
 * Schema for intent classification result
 */
const IntentSchema = z.object({
    intent: z.enum(['CREATE', 'EDIT', 'IDLECHAT']).describe(
        "CREATE if user wants a completely new component, EDIT if modifying the existing one, IDLECHAT if user is just chatting casually without UI requests"
    ),
    reasoning: z.string().describe("Brief explanation of why this classification was chosen"),
    targetElements: z.array(z.string()).optional().describe(
        "If EDIT, list specific elements to modify (e.g., 'button', 'heading', 'price text')"
    )
});

/**
 * Intent Detection Node
 * 
 * Determines if the user wants to CREATE a new component or EDIT an existing one.
 * Uses conversation context and LLM classification to understand user intent.
 * 
 * @param state - Current graph state with user message and optional previous component
 * @returns Intent type (CREATE/EDIT), previous component reference, and edit instructions
 */
export const intentDetectionNode = async (state: typeof graphState.State): Promise<Partial<typeof graphState.State>> => {
    console.log("--- 🔍 DETECTING USER INTENT ---");
    
    const { userMessage } = state.input;
    const previousComponent = state.previousComponent;
    
    // If no previous component exists, still run intent detection to catch IDLECHAT
    // Only default to CREATE if the message is clearly a UI generation request
    if (!previousComponent) {
        // Check if this is clearly an IDLECHAT message first
        const isIdleChat = IDLECHAT_PATTERNS.GREETINGS.test(userMessage.trim()) ||
                          IDLECHAT_PATTERNS.RESPONSES.test(userMessage.trim()) ||
                          userMessage.trim().length < IDLECHAT_PATTERNS.MIN_LENGTH && !IDLECHAT_PATTERNS.UI_KEYWORDS.test(userMessage);
        
        if (isIdleChat) {
            console.log("--- No previous component but message is clearly IDLECHAT ---");
            return {
                intentType: 'IDLECHAT' as IntentType,
                previousComponent: null,
                editInstructions: null
            };
        }
        
        console.log("--- No previous component found, defaulting to CREATE mode ---");
        return {
            intentType: 'CREATE' as IntentType,
            previousComponent: null,
            editInstructions: null
        };
    }
    
    // Use LLM to classify intent
    const result = await llmService.invokeModel(ModelType.LLAMA_3_3_70B_VERSATILE, [
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

# IDLECHAT Intent Indicators:
- Casual conversation: "hi", "hello", "thanks", "thank you", "you're welcome"
- Compliments/feedback: "nice", "good", "great", "awesome", "I like it", "looks good"
- Questions about the system: "how does this work?", "what can you do?"
- General chat: "how are you?", "what's your name?", "tell me about yourself"
- Non-UI related topics: weather, personal questions, general conversation
- Expressions of satisfaction: "perfect", "exactly what I wanted", "that's it"

# Decision Rules:
1. When user is just chatting or giving feedback → IDLECHAT
2. When previous component exists AND request is incremental → EDIT
3. When request asks for completely different component → CREATE
4. When in doubt with existing component → prefer EDIT (preserves user work)
5. Explicit "new" or "create" keywords → CREATE
6. If no UI-related keywords and just casual conversation → IDLECHAT`
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
Classify the user's intent as CREATE, EDIT, or IDLECHAT.`
        }
    ], IntentSchema);
    
    console.log(`--- Intent Detected: ${result.intent} ---`);
    console.log(`--- Reasoning: ${result.reasoning} ---`);
    if (result.targetElements && result.targetElements.length > 0) {
        console.log(`--- Target Elements: ${result.targetElements.join(', ')} ---`);
    }
    
    const editInstructions: EditInstructions | null = result.targetElements ? {
        targetElements: result.targetElements,
        reasoning: result.reasoning
    } : null;
    
    return {
        intentType: result.intent as IntentType,
        previousComponent: previousComponent,
        editInstructions: editInstructions
    };
};
