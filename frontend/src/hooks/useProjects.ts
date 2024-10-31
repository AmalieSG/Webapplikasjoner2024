// hooks/useProjects.ts
import { useState, useEffect } from 'react';
import { ProjectType } from '../Type';
import { projectSchema } from '../helpers/validate';
import { createProject, deleteProject, getProjects } from '../services/api';

export const useProjects = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const projectsData = await getProjects();
        console.log(projectsData);
        setProjects(projectsData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message); 
        } else {
          setError('Ukjent feil');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const addProject = async (project: Omit<ProjectType, 'id'>) => {
    try {
      const validatedProject = projectSchema.parse({
        ...project,
        categories: project.categories || [],
      }); 
      const newProject = await createProject(validatedProject);
      setProjects((prev) => [...prev, newProject]);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ukjent feil');
    }
  };

  const removeProject = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ukjent feil');
    }
  };

  return { projects, loading, error, addProject, removeProject };
};
