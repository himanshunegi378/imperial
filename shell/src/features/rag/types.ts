export interface ComponentCode {
  tailwind?: string;
  html?: string;
}

export interface ComponentMetadata {
  componentId: string;
  name: string;
  sourceDesignSystem: string;
  tags: string[];
  description: string;
  category: string;
  uxPattern: string;
  visualStyle: string[];
  code: ComponentCode;
}

export interface RagRecord {
  id: number;
  content: string; // stringified ComponentMetadata
  metadata: string; // stringified Omit<ComponentMetadata, 'code'>
}

export interface RagRecordOutput {
  records: Array<{
    id: number;
    content: ComponentMetadata;
    metadata: Omit<ComponentMetadata, 'code'>;
  }>;
  pagination: {
    currentCursor: number | null;
    nextCursor: number | null;
    hasNextPage: boolean;
    itemsPerPage: number;
  };
}

export interface RagResponse {
  records: RagRecord[];
  pagination: RagRecordOutput['pagination'];
}
