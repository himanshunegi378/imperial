/**
 * Shared Constants for UI Generator Graph Nodes
 * 
 * This file contains all constant values used across the UI generator graph nodes.
 * Centralizes configuration and magic numbers for better maintainability.
 */

/**
 * Configuration for caching and performance optimization
 */
export const CACHE_CONFIG = {
    maxSize: 100
} as const;

/**
 * Vector search result limits for different modes
 */
export const VECTOR_SEARCH_LIMITS = {
    CREATE_MODE: 10,
    EDIT_MODE: 3,
    IDLECHAT_MODE: 0
} as const;

/**
 * Available LLM model types
 */
export enum ModelType {
    LLAMA_3_3_70B_VERSATILE = 'llama-3.3-70b-versatile',
    KIMI_K2_INSTRUCT = 'moonshotai/kimi-k2-instruct',
    DEEPSEEK_R1_DISTILL = 'deepseek-r1-distill-llama-70b',
    GPT_OSS_20B = 'openai/gpt-oss-20b',
    LLAMA_3_1_8B_INSTANT = 'llama-3.1-8b-instant',
    LLAMA_3_1_70B_VERSATILE = 'llama-3.1-70b-versatile'
}

/**
 * Model configuration interface
 */
export interface ModelConfig {
    model: ModelType;
    temperature: number;
    description?: string;
    useCase?: string[];
}

/**
 * Frozen model configurations - immutable and optimized for different use cases
 */
export const MODEL_CONFIGS = Object.freeze({
    // Fast, general-purpose model for intent detection and quick tasks
    FAST: Object.freeze({
        model: ModelType.LLAMA_3_3_70B_VERSATILE,
        temperature: 0.3,
        description: 'Fast, general-purpose model for intent detection and quick tasks',
        useCase: ['intent_detection', 'quick_responses', 'classification']
    } as ModelConfig),

    // Creative code generation model with strong HTML/CSS capabilities
    CREATIVE: Object.freeze({
        model: ModelType.KIMI_K2_INSTRUCT,
        temperature: 0.5,
        description: 'Creative code generation model with strong HTML/CSS capabilities',
        useCase: ['code_generation', 'ui_components', 'creative_tasks']
    } as ModelConfig),

    // Analytical model for planning and validation tasks
    ANALYTICAL: Object.freeze({
        model: ModelType.DEEPSEEK_R1_DISTILL,
        temperature: 0.1,
        description: 'Analytical model for planning and validation tasks',
        useCase: ['analysis', 'planning', 'validation', 'reasoning']
    } as ModelConfig),

    // Lightweight model for simple tasks
    LIGHTWEIGHT: Object.freeze({
        model: ModelType.LLAMA_3_1_8B_INSTANT,
        temperature: 0.2,
        description: 'Lightweight model for simple, fast tasks',
        useCase: ['simple_responses', 'basic_classification', 'lightweight_tasks']
    } as ModelConfig),

    // High-quality model for complex tasks
    PREMIUM: Object.freeze({
        model: ModelType.LLAMA_3_1_70B_VERSATILE,
        temperature: 0.4,
        description: 'High-quality model for complex, nuanced tasks',
        useCase: ['complex_reasoning', 'premium_responses', 'detailed_analysis']
    } as ModelConfig)
} as const);

/**
 * Predefined model chains for different scenarios
 */
export const MODEL_CHAINS = Object.freeze({
    // Chain for analytical tasks with fallbacks
    ANALYTICAL: Object.freeze([
        MODEL_CONFIGS.PREMIUM,
        MODEL_CONFIGS.ANALYTICAL,
        MODEL_CONFIGS.FAST
    ]),

    // Chain for creative tasks with fallbacks
    CREATIVE: Object.freeze([
        MODEL_CONFIGS.CREATIVE,
        MODEL_CONFIGS.PREMIUM,
        MODEL_CONFIGS.FAST
    ]),

    // Chain for fast responses with fallbacks
    FAST_RESPONSE: Object.freeze([
        MODEL_CONFIGS.FAST,
        MODEL_CONFIGS.LIGHTWEIGHT,
        MODEL_CONFIGS.ANALYTICAL
    ])
} as const);

/**
 * Intent detection patterns for IDLECHAT classification
 */
export const IDLECHAT_PATTERNS = {
    GREETINGS: /^(hi|hello|thanks?|thank you|good|nice|great|awesome|perfect|how are you|what's your name|tell me about yourself|how does this work|what can you do)/i,
    RESPONSES: /^(you're welcome|no problem|sure|ok|okay|alright|yeah|yes|no)$/i,
    MIN_LENGTH: 10,
    UI_KEYWORDS: /create|make|build|generate|design/i
} as const;

/**
 * XML tag names for parsing LLM responses
 */
export const XML_TAGS = {
    NAME: 'name',
    COMPONENT: 'component',
    RESPONSE: 'response'
} as const;

/**
 * SSE Event types
 */
export const SSE_EVENTS = {
    IDLECHAT: 'idlechat',
    GENERATING: 'generating'
} as const;
