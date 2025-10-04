/**
 * Shared Types for UI Generator Graph Nodes
 * 
 * This file contains all type definitions used across the UI generator graph nodes.
 * Centralizes type definitions for better maintainability and consistency.
 */

import { BaseMessage } from '@langchain/core/messages';

/**
 * Type definition for LLM messages
 * Supports both BaseMessage objects and simple role/content objects
 */
export type LlmMessage = BaseMessage | {
    role: 'system' | 'user' | 'assistant';
    content: string;
};

/**
 * Intent type enumeration for user request classification
 */
export type IntentType = 'CREATE' | 'EDIT' | 'IDLECHAT';

/**
 * Edit instructions for targeted component modifications
 */
export interface EditInstructions {
    targetElements: string[];
    reasoning: string;
}

/**
 * Vector search cache configuration
 */
export interface CacheConfig {
    maxSize: number;
}

/**
 * Vector search result item
 */
export interface VectorSearchResult {
    document: any;
    score: number;
}

/**
 * Node execution context
 */
export interface NodeContext {
    emit?: (event: string, data: any) => void;
    cache?: Map<string, any[]>;
}

/**
 * LLM chain configuration
 */
export interface LlmChainConfig {
    apiKey: string;
    model: string;
    temperature: number;
}

/**
 * Model selection options for the LLM service
 */
export type ModelSelection = 
    | 'FAST' 
    | 'CREATIVE' 
    | 'ANALYTICAL' 
    | 'LIGHTWEIGHT' 
    | 'PREMIUM'
    | string; // Allow custom model names

/**
 * Chain selection options for fallback scenarios
 */
export type ChainSelection = 
    | 'ANALYTICAL' 
    | 'CREATIVE' 
    | 'FAST_RESPONSE'
    | string; // Allow custom chain names

/**
 * Node execution result interface
 */
export interface NodeResult {
    [key: string]: any;
}
