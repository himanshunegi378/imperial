# UI Generator Graph - Modular Architecture

## Overview

The UI Generator Graph has been refactored into a clean, modular architecture following good system design principles. The monolithic `uiGeneratorGraph.ts` file has been broken down into separate, focused modules.

## Directory Structure

```
backend/src/feat/chat/nodes/
├── shared/                          # Shared utilities and services
│   ├── types.ts                     # Type definitions
│   ├── constants.ts                 # Configuration constants
│   ├── llmService.ts                # LLM management service
│   ├── vectorSearchService.ts       # Vector search with caching
│   └── index.ts                     # Shared module exports
├── intentDetectionNode.ts           # Intent classification logic
├── idleChatNode.ts                  # Casual conversation handling
├── uiGenerationNode.ts              # Component generation logic
├── messageConsolidatorNode.ts       # Message finalization
├── index.ts                         # Node exports
└── ARCHITECTURE.md                  # This documentation
```

## Architecture Benefits

### 1. **Separation of Concerns**
- Each node has a single responsibility
- Shared logic is centralized in services
- Clear boundaries between different functionalities

### 2. **Maintainability**
- Easy to locate and modify specific functionality
- Reduced coupling between components
- Better code organization and readability

### 3. **Testability**
- Individual nodes can be unit tested in isolation
- Shared services can be mocked for testing
- Clear interfaces make testing easier

### 4. **Reusability**
- Shared services can be used across different nodes
- Common utilities are centralized
- Easy to extend with new functionality

### 5. **Performance**
- Singleton pattern for services reduces initialization overhead
- Caching is centralized and efficient
- LLM chains are optimized and reused

## Node Responsibilities

### Intent Detection Node (`intentDetectionNode.ts`)
- **Purpose**: Classifies user intent (CREATE/EDIT/IDLECHAT)
- **Input**: User message, optional previous component
- **Output**: Intent type, edit instructions, component reference
- **Dependencies**: `llmService.fastLlm`

### Idle Chat Node (`idleChatNode.ts`)
- **Purpose**: Handles casual conversation without UI generation
- **Input**: User message, chat context
- **Output**: Natural response message
- **Dependencies**: `llmService.fastLlm`, SSE emitter

### UI Generation Node (`uiGenerationNode.ts`)
- **Purpose**: Generates or modifies HTML/Tailwind components
- **Input**: User message, intent type, optional previous component
- **Output**: Component name, HTML code, user message
- **Dependencies**: `llmService.kim2Llm`, `vectorSearchService`

### Message Consolidator Node (`messageConsolidatorNode.ts`)
- **Purpose**: Finalizes conversation history
- **Input**: User message, AI response
- **Output**: LangChain message objects
- **Dependencies**: None (pure function)

## Shared Services

### LLM Service (`llmService.ts`)
- **Purpose**: Centralized LLM management with flexible factory pattern
- **Features**: Dynamic model selection, fallback chains, caching, rate limit handling
- **Pattern**: Singleton with factory methods for model instantiation
- **API**: `getModel(modelName, config)`, `invokeModel()`, `invokeChain()`

### Vector Search Service (`vectorSearchService.ts`)
- **Purpose**: Vector similarity search with caching
- **Features**: LRU cache, performance optimization, result transformation
- **Pattern**: Singleton with cache management

### Types (`types.ts`)
- **Purpose**: Centralized type definitions
- **Features**: Intent types, edit instructions, service interfaces
- **Pattern**: Pure type definitions

### Constants (`constants.ts`)
- **Purpose**: Configuration, model definitions, and magic numbers
- **Features**: Model enums, frozen configs, search limits, patterns, events
- **Pattern**: Immutable configuration objects with enum-based model selection
- **Models**: FAST, CREATIVE, ANALYTICAL, LIGHTWEIGHT, PREMIUM

## Main Graph File

The main `uiGeneratorGraph.ts` file is now clean and focused:

```typescript
// Clean imports
import { intentDetectionNode, idleChatNode, uiGenerationNode, messageConsolidatorNode } from './nodes';

// Simple workflow definition
const workflow = new StateGraph(graphState)
    .addNode('intentDetection', intentDetectionNode)
    .addNode('idleChat', idleChatNode)
    .addNode('generateComponent', uiGenerationNode)
    .addNode('consolidateAiMessages', messageConsolidatorNode)
    // ... edges and routing
```

## Migration Benefits

### Before Refactoring
- 669 lines in single file
- Mixed concerns and responsibilities
- Difficult to test individual components
- Hard to maintain and extend
- Fixed model instances (no flexibility)

### After Refactoring
- 93 lines in main file (86% reduction)
- Clear separation of concerns
- Easy to test and maintain
- Modular and extensible architecture
- **NEW**: Flexible model selection with factory pattern

## Flexible Model Selection System

### Key Features
- **Dynamic Model Selection**: Choose models at runtime based on use case
- **Factory Pattern**: `llmService.getModel(modelName, config)` for instantiation
- **Automatic Caching**: Models are cached for performance
- **Fallback Chains**: Predefined chains for resilience
- **Custom Configurations**: Override default settings per use case

### Usage Examples
```typescript
// Simple model selection
const response = await llmService.invokeModel('FAST', messages);

// Custom configuration
const model = llmService.getModel('CREATIVE', { temperature: 0.8 });

// Chain with fallbacks
const response = await llmService.invokeChain('ANALYTICAL', messages);
```

### Available Models
- **FAST**: llama-3.3-70b-versatile (intent detection, quick responses)
- **CREATIVE**: moonshotai/kimi-k2-instruct (code generation, UI components)
- **ANALYTICAL**: deepseek-r1-distill-llama-70b (analysis, planning)
- **LIGHTWEIGHT**: llama-3.1-8b-instant (simple tasks)
- **PREMIUM**: llama-3.1-70b-versatile (complex reasoning)

## Usage Examples

### Adding a New Node
1. Create new node file in `nodes/` directory
2. Implement node function following the pattern
3. Import and add to workflow in main file
4. No changes needed to shared services

### Extending Shared Services
1. Add new methods to service classes
2. Update types if needed
3. All nodes automatically benefit from new functionality

### Testing Individual Components
```typescript
// Test individual nodes
import { intentDetectionNode } from './nodes/intentDetectionNode';

// Test shared services
import { llmService } from './nodes/shared/llmService';
```

This modular architecture provides a solid foundation for future enhancements while maintaining the existing functionality and performance characteristics.
