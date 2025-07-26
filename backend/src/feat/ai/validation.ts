import { z } from 'zod';

const codeSchema = z.union([
  z.object({
    tailwind: z.string().min(1, 'Tailwind code is required')
  }),
  z.object({
    html: z.string().min(1, 'HTML code is required')
  })
]);

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

export const validateComponent = (component) => {
  return componentSchema.safeParse(component);
};

export const validateComponents = (components) => {
  if (!Array.isArray(components)) {
    return {
      success: false,
      error: new Error('Expected an array of components')
    };
  }

  const results = components.map(component => ({
    component,
    result: validateComponent(component)
  }));

  const allValid = results.every(r => r.result.success);
  
  if (allValid) {
    return {
      success: true,
      data: results.map(r => r.result.data)
    };
  }

  const errors = results
    .filter(r => !r.result.success)
    .map((r, index) => ({
      index,
      errors: r.result.error.issues
    }));

  return {
    success: false,
    errors
  };
};