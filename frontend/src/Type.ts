// Type.ts
/*import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Tittel må være minst 1 karakter"),
  description: z.string().optional(),
  categories: z.array(z.string()).optional(),
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Ugyldig dato"
  }),
});

export type ProjectType = z.infer<typeof ProjectSchema>;

// src/features/projects/Type.ts
import { z } from 'zod';
import { projectSchema } from './helpers/validate'; // Importer Zod-skjemaet

// Infer TypeScript type from Zod schema
export type ProjectType = z.infer<typeof projectSchema>;

*/

export type ProjectType = {
    id: string;
    title: string;
    description?: string;
    categories?: string[];
    date: string;
}
