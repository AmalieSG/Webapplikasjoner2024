import { z } from 'zod';
import { ProjectStatus } from '../Type';

export { projectSchema, projectsSchema }

const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Tittel må være minst 1 karakter"),
  description: z.string().optional(),
  categories: z.array(z.string()).optional(),
  publishedAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Ugyldig dato"
  }),
  status: z.nativeEnum(ProjectStatus)
});

const projectsSchema = z.array(projectSchema);

export type ProjectType = z.infer<typeof projectSchema>;
