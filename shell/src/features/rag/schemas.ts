import { z } from 'zod';

// Component code schema
export const codeSchema = z.object({
  tailwind: z.string().optional(),
  html: z.string().optional()
}).refine(data => data.tailwind || data.html, {
  message: "At least one of 'tailwind' or 'html' must be provided",
  path: ['code']
});

// Component schema matching backend requirements
export const componentSchema = z.object({
  componentId: z.string().min(1, 'Component ID is required'),
  name: z.string().min(1, 'Name is required'),
  sourceDesignSystem: z.string().min(1, 'Source design system is required'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  uxPattern: z.string().min(1, 'UX pattern is required'),
  visualStyle: z.array(z.string()).min(1, 'At least one visual style is required'),
  code: codeSchema
});

// Schema for the array of components
export const componentsArraySchema = z.array(componentSchema)
  .min(1, 'At least one component is required');

// Helper function to format Zod errors into a more readable format
export const formatZodErrors = (error: z.ZodError) => {
  return error.format()._errors.map((message: string) => message)
    .concat(
      Object.entries(error.format())
        .filter(([key]) => key !== '_errors')
        .flatMap(([key, value]: [string, any]) => {
          if (typeof value === 'object' && '_errors' in value) {
            return value._errors.map((message: string) => `${key}: ${message}`);
          }
          return [];
        })
    ).join('\n');
};
