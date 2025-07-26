import { z } from 'zod';
import { componentSchema } from "../../config/constants";

// Validation schema for get-rag-records endpoint
export const getRagRecordsSchema = z.object({
    lastId: z.string().optional(),
    limit: z.string().transform(val => Number(val)).pipe(z.number().positive().int()).optional().default(10)
});

// Validation schema for add-components endpoint
export const addComponentsSchema = z.object({
    components: z.array(
        componentSchema
    ).nonempty()
});


export const validateComponent = (component: z.infer<typeof componentSchema>) => {
    return componentSchema.safeParse(component);
};

export const validateComponents = (components: Array<z.infer<typeof componentSchema>>): {
    success: true,
    data: Array<z.infer<typeof componentSchema>>
} | {
    success: false,
    errors: Array<{ index: number, error: string }>
} => {
    if (!Array.isArray(components)) {
        return {
            success: false,
            errors: [{ index: -1, error: 'Expected an array of components' }]
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
            data: results.map(r => r.result.data!)
        };
    }

    const errors = results
        .filter(r => !r.result.success)
        .map((r, index) => ({
            index,
            error: r.result.error?.issues.map(issue => issue.message).join(', ') || 'Unknown error'
        }));

    return {
        success: false,
        errors
    };
};

export const getUserGeneratedComponentsSchema = z.object({
    userId: z.string()
});

export const deleteUserGeneratedComponentsSchema = z.object({
    userId: z.string(),
    componentIds: z.array(z.number())
});
