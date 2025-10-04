/**
 * LLM Service for UI Generator Graph Nodes
 * 
 * This service provides centralized LLM management with a flexible factory pattern.
 * Users can select specific models or chains based on their needs, with automatic
 * fallback handling and rate limit resilience.
 */

import { ChatGroq } from '@langchain/groq';
import { z } from 'zod';
import { BaseMessage } from '@langchain/core/messages';
import { BaseLanguageModelInput } from '@langchain/core/language_models/base';
import { env } from '../../../../env';
import { MODEL_CONFIGS, ModelType, ModelConfig } from './constants';

/**
 * LLM Service class for managing model instances with factory pattern
 */
export class LlmService {
    private static instance: LlmService;
    private modelCache: Map<string, ChatGroq>;
    
    private constructor() {
        this.modelCache = new Map<string, ChatGroq>();
    }

    /**
     * Get singleton instance of LlmService
     */
    public static getInstance(): LlmService {
        if (!LlmService.instance) {
            LlmService.instance = new LlmService();
        }
        return LlmService.instance;
    }

    /**
     * Get a specific model instance by model type
     * @param modelType - The specific model type to use
     * @param customConfig - Optional custom configuration to override defaults
     * @returns ChatGroq model instance
     */
    public getModel(modelType: ModelType, customConfig?: Partial<ModelConfig>): ChatGroq {
        // Check cache first
        const cacheKey = `${modelType}_${JSON.stringify(customConfig || {})}`;
        if (this.modelCache.has(cacheKey)) {
            return this.modelCache.get(cacheKey)!;
        }

        // Validate that the model type exists
        const validModelType = Object.values(ModelType).find(type => type === modelType);
        if (!validModelType) {
            throw new Error(`Unknown model type: ${modelType}`);
        }
        
        // Create a default config for the model
        let config: ModelConfig = {
            model: modelType,
            temperature: 0.3,
            description: `Custom model: ${modelType}`,
            useCase: ['custom']
        };

        // Apply custom configuration overrides
        if (customConfig) {
            config = { ...config, ...customConfig };
        }

        // Create new model instance
        const model = new ChatGroq({
            apiKey: env.GROQ_API_KEY,
            model: config.model,
            temperature: config.temperature
        });

        // Cache the instance
        this.modelCache.set(cacheKey, model);
        
        return model;
    }

    /**
     * Create a chain of models for fallback scenarios
     * @param models - Array of ChatGroq model instances
     * @returns Array of ChatGroq model instances (same as input)
     */
    public getChain(models: ChatGroq[]): ChatGroq[] {
        if (!models || models.length === 0) {
            throw new Error('Chain must contain at least one model');
        }
        
        return models;
    }

    /**
     * Invoke a single model with optional structured output
     */
    // Overload 1: With schema - returns structured output
    async invokeModel<TSchema extends z.ZodTypeAny>(
        modelType: ModelType,
        messages: BaseLanguageModelInput,
        schema: TSchema,
        customConfig?: Partial<ModelConfig>
    ): Promise<z.infer<TSchema>>;

    // Overload 2: Without schema - returns BaseMessage
    async invokeModel(
        modelType: ModelType,
        messages: BaseLanguageModelInput,
        customConfig?: Partial<ModelConfig>
    ): Promise<BaseMessage>;

    // Implementation
    async invokeModel<TSchema extends z.ZodTypeAny>(
        modelType: ModelType,
        messages: BaseLanguageModelInput,
        schemaOrCustomConfig?: TSchema | Partial<ModelConfig>,
        customConfig?: Partial<ModelConfig>
    ): Promise<z.infer<TSchema> | BaseMessage> {
        const model = this.getModel(modelType, customConfig);
        const schema = typeof schemaOrCustomConfig === 'object' && 'parse' in schemaOrCustomConfig 
            ? schemaOrCustomConfig as TSchema 
            : undefined;
        
        if (schema) {
            return await model.withStructuredOutput(schema).invoke(messages) as z.infer<TSchema>;
        } else {
            return await model.invoke(messages) as BaseMessage;
        }
    }

    /**
     * Invoke LLM chain with automatic fallback on rate limits
     * Tries models in sequence until one succeeds or all fail
     */
    // Overload 1: With schema - returns structured output
    async invokeChain<TSchema extends z.ZodTypeAny>(
        models: ChatGroq[],
        messages: BaseLanguageModelInput,
        schema: TSchema
    ): Promise<z.infer<TSchema>>;

    // Overload 2: Without schema - returns BaseMessage
    async invokeChain(
        models: ChatGroq[],
        messages: BaseLanguageModelInput
    ): Promise<BaseMessage>;

    // Implementation
    async invokeChain<TSchema extends z.ZodTypeAny>(
        models: ChatGroq[],
        messages: BaseLanguageModelInput,
        schema?: TSchema
    ): Promise<z.infer<TSchema> | BaseMessage> {
        // Validate models array
        if (!models || models.length === 0) {
            throw new Error('Models array cannot be empty');
        }
        
        let lastError: Error | undefined;
        
        for (let i = 0; i < models.length; i++) {
            const model = models[i];
            const isLastModel = i === models.length - 1;
            
            try {
                if (i > 0) {
                    console.log(`--- ⚠️ MODEL ${i} RATE LIMITED, TRYING FALLBACK ${i + 1}/${models.length} ---`);
                    console.log(`--- Fallback Model: ${model.model} ---`);
                }
                
                if (schema) {
                    const result = await model.withStructuredOutput(schema).invoke(messages) as unknown as z.infer<TSchema>;
                    return result;
                } else {
                    const result = await model.invoke(messages) as BaseMessage;
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
                    console.error(`--- ❌ ALL ${models.length} MODELS FAILED ---`);
                }
                throw error;
            }
        }
        
        // Should never reach here, but TypeScript needs it
        throw lastError || new Error('No LLMs provided');
    }

    /**
     * Clear the model cache (useful for testing or memory management)
     */
    public clearCache(): void {
        this.modelCache.clear();
    }

    /**
     * Get cache statistics
     */
    public getCacheStats(): { size: number; models: string[] } {
        return {
            size: this.modelCache.size,
            models: Array.from(this.modelCache.keys())
        };
    }
}

/**
 * Export singleton instance for use across nodes
 */
export const llmService = LlmService.getInstance();
