/**
 * UI Generation Node
 * 
 * This node generates HTML/Tailwind CSS code directly from user input.
 * Supports both CREATE and EDIT modes for incremental component refinement.
 */

import { llmService, vectorSearchService } from './shared';
import { graphState } from '../graphState';
import { parseXmlTagFormat } from '../utils/parseDynamicKeyValueFormat';
import { VECTOR_SEARCH_LIMITS, SSE_EVENTS, XML_TAGS, ModelType } from './shared/constants';

/**
 * UI Generation Node
 * 
 * Generates HTML/Tailwind CSS code directly from user input.
 * Supports both CREATE and EDIT modes for incremental component refinement.
 * 
 * @param state - Contains user message, intent type, and optional previous component
 * @returns Component name, HTML code, and user-friendly message
 */
export const uiGenerationNode = async (state: typeof graphState.State): Promise<Partial<typeof graphState.State>> => {
    const isEditMode = state.intentType === 'EDIT';
    const emit = state.sseEmitter;
    
    if (isEditMode) {
        console.log('--- ✏️ EDIT MODE: Modifying existing component ---');
    } else {
        console.log('--- 🎨 CREATE MODE: Generating new component ---');
    }

    // Get similar components for reference (fewer for EDIT mode)
    console.log('--- 🔍 FETCHING SIMILAR COMPONENTS ---');
    const similarityResults = await vectorSearchService.getCachedSimilarityResults(
        state.input.userMessage, 
        isEditMode ? VECTOR_SEARCH_LIMITS.EDIT_MODE : VECTOR_SEARCH_LIMITS.CREATE_MODE
    );
    console.log(`--- Found ${similarityResults.length} similar components ---`);
    
    // Emit generating event
    if (emit) {
        emit(SSE_EVENTS.GENERATING, { mode: isEditMode ? 'EDIT' : 'CREATE' });
    }

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
${(similarityResults || []).slice(0, isEditMode ? 3 : 5).map((result, index) => 
    `Example ${index + 1} (Score: ${result.score.toFixed(2)}):\n${result.document.pageContent}`
).join('\n\n')}
`;

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

    const {content} = await llmService.invokeModel(ModelType.KIMI_K2_INSTRUCT, [
        {
            role: 'system',
            content: enhancedSystemPrompt
        },
        ...state.messages,
        {
            role: 'user',
            content: userPrompt
        }
    ]);

    const { name, component, response } = parseXmlTagFormat(content.toString(), [XML_TAGS.NAME, XML_TAGS.COMPONENT, XML_TAGS.RESPONSE]);

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
