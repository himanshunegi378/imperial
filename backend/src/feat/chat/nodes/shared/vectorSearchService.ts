/**
 * Vector Search Service for UI Generator Graph Nodes
 * 
 * This service provides centralized vector search functionality with caching
 * to avoid redundant database queries across all graph nodes.
 */

import { uiVectorStore } from '../../../../config/constants';
import { VectorSearchResult, CacheConfig } from './types';
import { CACHE_CONFIG } from './constants';

/**
 * Vector Search Service class for managing similarity searches and caching
 */
export class VectorSearchService {
    private static instance: VectorSearchService;
    private cache: Map<string, VectorSearchResult[]>;
    
    private constructor() {
        this.cache = new Map<string, VectorSearchResult[]>();
    }

    /**
     * Get singleton instance of VectorSearchService
     */
    public static getInstance(): VectorSearchService {
        if (!VectorSearchService.instance) {
            VectorSearchService.instance = new VectorSearchService();
        }
        return VectorSearchService.instance;
    }

    /**
     * Get cached similarity results with LRU eviction
     * Returns similar components from vector database with caching for performance
     * 
     * @param query - Search query string
     * @param k - Number of similar results to return
     * @returns Array of [Document, similarity score] tuples
     */
    async getCachedSimilarityResults(query: string, k: number): Promise<VectorSearchResult[]> {
        const cacheKey = `${query.toLowerCase()}_${k}`;
        
        if (this.cache.has(cacheKey)) {
            console.log('--- 📦 USING CACHED VECTOR RESULTS ---');
            const cached = this.cache.get(cacheKey);
            return cached || [];  // Handle undefined from Map.get()
        }
        
        console.log('--- 🔍 PERFORMING VECTOR SEARCH ---');
        const results = await uiVectorStore.similaritySearchWithScore(query, k);
        
        // Transform results to match our interface
        const transformedResults: VectorSearchResult[] = results.map(([doc, score]: [any, number]) => ({
            document: doc,
            score: score
        }));
        
        // Cache results
        this.cache.set(cacheKey, transformedResults);
        
        // Limit cache size (LRU eviction)
        this.evictLRU();
        
        return transformedResults;
    }

    /**
     * Clear the cache
     */
    public clearCache(): void {
        this.cache.clear();
    }

    /**
     * Get cache statistics
     */
    public getCacheStats(): { size: number; maxSize: number } {
        return {
            size: this.cache.size,
            maxSize: CACHE_CONFIG.maxSize
        };
    }

    /**
     * Evict least recently used items when cache exceeds max size
     */
    private evictLRU(): void {
        if (this.cache.size > CACHE_CONFIG.maxSize) {
            const firstKey = this.cache.keys().next().value;
            if (firstKey) {
                this.cache.delete(firstKey);
            }
        }
    }
}

/**
 * Export singleton instance for use across nodes
 */
export const vectorSearchService = VectorSearchService.getInstance();
