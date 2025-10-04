# LLM Service - Flexible Model Selection Guide

## Overview

The refactored LLM Service now provides a flexible factory pattern that allows users to select specific models or chains based on their needs. This guide shows how to use the new `getModel()` and `invokeModel()` methods.

## Quick Start

```typescript
import { llmService } from './shared';

// Use a predefined model
const model = llmService.getModel('FAST');
const response = await model.invoke(messages);

// Or use the convenience method
const response = await llmService.invokeModel('CREATIVE', messages);
```

## Available Model Configurations

### Predefined Models

| Model Name | Use Case | Model Type | Temperature | Description |
|------------|----------|------------|-------------|-------------|
| `FAST` | Intent detection, quick responses | llama-3.3-70b-versatile | 0.3 | Fast, general-purpose model |
| `CREATIVE` | Code generation, UI components | moonshotai/kimi-k2-instruct | 0.5 | Creative code generation |
| `ANALYTICAL` | Analysis, planning, validation | deepseek-r1-distill-llama-70b | 0.1 | Analytical reasoning |
| `LIGHTWEIGHT` | Simple tasks, basic classification | llama-3.1-8b-instant | 0.2 | Lightweight and fast |
| `PREMIUM` | Complex reasoning, detailed analysis | llama-3.1-70b-versatile | 0.4 | High-quality responses |

### Model Chains

| Chain Name | Models | Use Case |
|------------|--------|----------|
| `ANALYTICAL` | PREMIUM → ANALYTICAL → FAST | Complex analysis with fallbacks |
| `CREATIVE` | CREATIVE → PREMIUM → FAST | Creative tasks with fallbacks |
| `FAST_RESPONSE` | FAST → LIGHTWEIGHT → ANALYTICAL | Quick responses with fallbacks |

## Usage Examples

### 1. Basic Model Selection

```typescript
import { llmService } from './shared';

// Get a specific model
const fastModel = llmService.getModel('FAST');
const creativeModel = llmService.getModel('CREATIVE');

// Use directly
const response = await fastModel.invoke(messages);
```

### 2. Convenience Methods

```typescript
// Single model invocation
const response = await llmService.invokeModel('FAST', messages);

// With structured output
const result = await llmService.invokeModel('CREATIVE', messages, schema);

// Chain invocation with fallbacks
const response = await llmService.invokeChain('ANALYTICAL', messages);
```

### 3. Custom Configuration

```typescript
// Override default configuration
const customModel = llmService.getModel('FAST', {
    temperature: 0.7,
    description: 'High creativity mode'
});

// Custom model by type
const customModel2 = llmService.getModel('llama-3.1-70b-versatile', {
    temperature: 0.2
});
```

### 4. Structured Output

```typescript
import { z } from 'zod';

const schema = z.object({
    intent: z.enum(['CREATE', 'EDIT', 'IDLECHAT']),
    reasoning: z.string()
});

// Get structured output
const result = await llmService.invokeModel('FAST', messages, schema);

// Or with chain
const result2 = await llmService.invokeChain('ANALYTICAL', messages, schema);
```

### 5. Error Handling with Fallbacks

```typescript
try {
    const response = await llmService.invokeModel('FAST', messages);
} catch (error) {
    // Handle single model failure
    console.log('Fast model failed, trying fallback...');
    const response = await llmService.invokeModel('LIGHTWEIGHT', messages);
}

// Or use chains for automatic fallback
const response = await llmService.invokeChain('FAST_RESPONSE', messages);
```

## Migration from Old System

### Before (Old System)
```typescript
// Old way - fixed model instances
const result = await llmService.fastLlm.withStructuredOutput(schema).invoke(messages);
const result2 = await llmService.kim2Llm.invoke(messages);
```

### After (New System)
```typescript
// New way - flexible model selection
const result = await llmService.invokeModel('FAST', messages, schema);
const result2 = await llmService.invokeModel('CREATIVE', messages);

// Or get model instances for reuse
const fastModel = llmService.getModel('FAST');
const result3 = await fastModel.withStructuredOutput(schema).invoke(messages);
```

## Advanced Usage

### 1. Model Caching

Models are automatically cached for performance:

```typescript
// First call creates and caches the model
const model1 = llmService.getModel('FAST');

// Subsequent calls return cached instance
const model2 = llmService.getModel('FAST'); // Same instance

// Cache statistics
const stats = llmService.getCacheStats();
console.log(`Cached models: ${stats.models.join(', ')}`);
```

### 2. Custom Model Types

```typescript
import { ModelType } from './shared/constants';

// Use specific model types
const model = llmService.getModel(ModelType.LLAMA_3_1_70B_VERSATILE, {
    temperature: 0.5
});
```

### 3. Dynamic Model Selection

```typescript
function getModelForTask(taskType: string) {
    switch (taskType) {
        case 'classification':
            return 'FAST';
        case 'code_generation':
            return 'CREATIVE';
        case 'analysis':
            return 'ANALYTICAL';
        default:
            return 'PREMIUM';
    }
}

const modelType = getModelForTask('code_generation');
const response = await llmService.invokeModel(modelType, messages);
```

### 4. Performance Optimization

```typescript
// Pre-instantiate commonly used models
const fastModel = llmService.getModel('FAST');
const creativeModel = llmService.getModel('CREATIVE');

// Reuse instances for multiple calls
const results = await Promise.all([
    fastModel.invoke(messages1),
    creativeModel.invoke(messages2)
]);
```

## Best Practices

### 1. Model Selection Guidelines

- **Intent Detection**: Use `FAST` or `LIGHTWEIGHT`
- **Code Generation**: Use `CREATIVE` 
- **Analysis/Reasoning**: Use `ANALYTICAL` or `PREMIUM`
- **Quick Responses**: Use `FAST` or `LIGHTWEIGHT`
- **Complex Tasks**: Use `PREMIUM` or chains

### 2. Fallback Strategy

```typescript
// Use chains for critical operations
const response = await llmService.invokeChain('CREATIVE', messages);

// Or implement custom fallback logic
async function robustInvoke(messages: any[]) {
    try {
        return await llmService.invokeModel('PREMIUM', messages);
    } catch (error) {
        console.log('Premium model failed, falling back to FAST');
        return await llmService.invokeModel('FAST', messages);
    }
}
```

### 3. Memory Management

```typescript
// Clear cache when needed (e.g., in tests)
llmService.clearCache();

// Monitor cache usage
const stats = llmService.getCacheStats();
if (stats.size > 10) {
    llmService.clearCache();
}
```

### 4. Testing

```typescript
// Mock models for testing
const mockModel = {
    invoke: jest.fn().mockResolvedValue({ content: 'test response' })
};

// Test with different model configurations
const fastResponse = await llmService.invokeModel('FAST', testMessages);
const creativeResponse = await llmService.invokeModel('CREATIVE', testMessages);
```

## Configuration Reference

### Model Config Interface

```typescript
interface ModelConfig {
    model: ModelType;
    temperature: number;
    description?: string;
    useCase?: string[];
}
```

### Available Model Types

```typescript
enum ModelType {
    LLAMA_3_3_70B_VERSATILE = 'llama-3.3-70b-versatile',
    KIMI_K2_INSTRUCT = 'moonshotai/kimi-k2-instruct',
    DEEPSEEK_R1_DISTILL = 'deepseek-r1-distill-llama-70b',
    GPT_OSS_20B = 'openai/gpt-oss-20b',
    LLAMA_3_1_8B_INSTANT = 'llama-3.1-8b-instant',
    LLAMA_3_1_70B_VERSATILE = 'llama-3.1-70b-versatile'
}
```

This flexible system provides better control over model selection while maintaining backward compatibility and adding powerful new features like automatic fallbacks and caching.
