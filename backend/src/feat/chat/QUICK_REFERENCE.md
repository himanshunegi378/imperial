# UI Generator Graph - Quick Reference

## 🚀 Quick Start

```typescript
import { ai } from './uiGeneratorGraph';

// Execute the graph
const result = await ai.invoke(
  {
    input: {
      userMessage: "Create a modern pricing card with hover effects",
      chatId: "chat_123"
    }
  },
  {
    configurable: { thread_id: "thread_123" }
  }
);

// Access the generated component
console.log(result.output.name);        // "PricingCard"
console.log(result.output.component);   // HTML/Tailwind CSS code
console.log(result.output.message);     // User-friendly response
```

## 📊 Visual Workflow

```
┌────────────────────────────────────────────────────────────────┐
│                         START                                  │
└────────────────────────┬───────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────────────────────────────┐
│  NODE 1: Requirement Deconstruction                            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  Input:  User message                                          │
│  LLM:    DeepSeek (analytical)                                 │
│  Action: Create technical plan + Vector search                 │
│  Output: Enhanced prompt + Similar components                  │
└────────────────────────┬───────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────────────────────────────┐
│  NODE 2: UI Generation                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  Input:  Plan + Examples + Feedback (if retry)                 │
│  LLM:    Kimi-K2 (creative coder)                              │
│  Action: Generate HTML/Tailwind CSS                            │
│  Output: Component name + Code + Message                       │
└────────────────────────┬───────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────────────────────────────┐
│  NODE 3: Validation                                            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  Input:  Generated component                                   │
│  LLM:    DeepSeek (critical evaluator)                         │
│  Action: Score quality (1-10) + Provide feedback               │
│  Output: isValid + Score + Feedback                            │
└────────────────────────┬───────────────────────────────────────┘
                         ↓
           ┌─────────────┴─────────────┐
           ↓                           ↓
    ┌─────────────┐            ┌─────────────┐
    │  Valid &    │            │  Invalid    │
    │  Score ≥ 7  │            │  OR Low     │
    │             │            │  Score      │
    └──────┬──────┘            └──────┬──────┘
           │                          │
           │                    ┌─────┴─────┐
           │                    │  Retries  │
           │                    │  < 2?     │
           │                    └─────┬─────┘
           │                          │
           │                    ┌─────┴─────┐
           │              Yes   ↓      No   │
           │              ┌─────┘           │
           │              ↓                 │
           │       ┌────────────┐           │
           │       │  Loop back │           │
           │       │  to NODE 2 │           │
           │       └────────────┘           │
           │                                │
           └────────────┬───────────────────┘
                        ↓
┌────────────────────────────────────────────────────────────────┐
│  NODE 4: Message Consolidation                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  Action: Create conversation history                           │
│  Output: HumanMessage + AIMessage                              │
└────────────────────────┬───────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────────────────────────────┐
│                          END                                   │
└────────────────────────────────────────────────────────────────┘
```

## 🎯 Key Concepts

### State Object
```typescript
{
  input: {
    userMessage: string,    // User's request
    chatId: string         // Session identifier
  },
  plan: {
    enhancedPrompt: string // Technical specifications
  },
  similarityResults: [    // Reference examples
    [Document, number]    // [document, similarity_score]
  ],
  output: {
    name: string,         // Component name (PascalCase)
    component: string,    // HTML/Tailwind code
    message: string,      // User-friendly response
    chatId: string
  },
  validation: {
    isValid: boolean,     // Passes quality check?
    feedback: string,     // Improvement suggestions
    score: number        // Quality score (1-10)
  },
  retryCount: number     // Revision attempts
}
```

### LLM Models

| Model | Purpose | Temp | When to Use |
|-------|---------|------|-------------|
| **DeepSeek R1** | Analysis & Validation | 0.1 | Planning, critical evaluation |
| **Kimi-K2** | Code Generation | 0.5 | Creating HTML/CSS components |
| **Llama 3.1** | General Tasks | 0.3 | Quick, simple operations |

### Configuration

```typescript
VALIDATION_CONFIG = {
  minScoreThreshold: 7,   // Minimum quality score to accept
  maxRetries: 2,          // Maximum regeneration attempts
  cacheSize: 100          // Vector search cache entries
}
```

## 🔧 Common Modifications

### Change Minimum Quality Score
```typescript
// In uiGeneratorGraph.ts
const VALIDATION_CONFIG = {
  minScoreThreshold: 8,  // Increase for higher quality (more retries)
  // ...
}
```

### Increase Max Retries
```typescript
const VALIDATION_CONFIG = {
  maxRetries: 3,  // Allow more refinement attempts
  // ...
}
```

### Adjust Vector Search Results
```typescript
// In requirementDeconstructionNode
getCachedSimilarityResults(userMessage, 15)  // Get more examples
```

### Change Generation Model
```typescript
// Replace kim2Llm with different model
const customLlm = new ChatGroq({
  apiKey: env.GROQ_API_KEY,
  model: 'your-preferred-model',
  temperature: 0.4
});
```

## 📝 Validation Criteria

Components are evaluated on 6 dimensions:

1. **Functionality** - Meets user requirements?
2. **Code Quality** - Valid HTML, proper Tailwind usage?
3. **Accessibility** - ARIA labels, semantic elements?
4. **Responsiveness** - Mobile-first design?
5. **Performance** - Optimized, no unnecessary effects?
6. **Security** - No XSS vulnerabilities?

**Scoring Guide:**
- 9-10: Perfect, production-ready ✅
- 7-8: Good, minor improvements 👍
- 5-6: Acceptable, needs refinement ⚠️
- 3-4: Poor, significant issues ❌
- 1-2: Unacceptable, major problems 🚫

## 🐛 Debugging

### Enable Verbose Logging
```typescript
// Add to each node
console.log('Current state:', JSON.stringify(state, null, 2));
```

### Check Cache Performance
```typescript
// Monitor cache hits/misses in console
// Look for: "📦 USING CACHED VECTOR RESULTS" vs "🔍 PERFORMING VECTOR SEARCH"
```

### Inspect Validation Feedback
```typescript
console.log('Validation:', {
  isValid: state.validation?.isValid,
  score: state.validation?.score,
  feedback: state.validation?.feedback
});
```

### View Vector Search Results
```typescript
// In requirementDeconstructionNode
console.log('Similar components:', similarityResults.map(([doc, score]) => ({
  score,
  preview: doc.pageContent.substring(0, 100)
})));
```

## 🧪 Testing

### Test Single Node
```typescript
import { requirementDeconstructionNode } from './uiGeneratorGraph';

const mockState = {
  input: {
    userMessage: "Create a button",
    chatId: "test_123"
  }
};

const result = await requirementDeconstructionNode(mockState);
console.log(result.plan);
```

### Test Full Workflow
```typescript
const result = await ai.invoke({
  input: {
    userMessage: "Create a responsive navbar",
    chatId: "test_456"
  }
}, {
  configurable: { thread_id: "test_thread" }
});

expect(result.output.component).toBeDefined();
expect(result.validation.score).toBeGreaterThanOrEqual(7);
```

## 📦 Dependencies

```json
{
  "@langchain/groq": "^0.x.x",
  "@langchain/langgraph": "^0.x.x",
  "@langchain/core": "^0.x.x",
  "zod": "^3.x.x"
}
```

## 🔗 Related Files

- `graphState.ts` - State schema definition
- `chat.validation.ts` - Input validation
- `utils/parseDynamicKeyValueFormat.ts` - XML parsing utility
- `../../config/constants.ts` - Vector store and checkpointer
- `UI_GENERATOR_GRAPH.md` - Detailed documentation

## 💡 Tips

1. **Cache Warming**: Pre-populate cache with common queries during app initialization
2. **Prompt Tuning**: Adjust system prompts in each node for better results
3. **Model Selection**: Experiment with different models for each stage
4. **Parallel Processing**: Both deconstruction steps run in parallel - maintain this pattern
5. **Error Handling**: Max retries prevent infinite loops - adjust based on needs

## 🚨 Common Issues

### Issue: Low quality scores
**Solution**: Review validation criteria, check reference examples quality

### Issue: Slow response
**Solution**: Check cache hits, reduce vector search k value, use faster models

### Issue: Infinite loops
**Solution**: Verify maxRetries is set correctly, check shouldContinue logic

### Issue: Inconsistent outputs
**Solution**: Lower temperature values, improve prompt specificity

