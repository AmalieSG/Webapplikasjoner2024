// src/features/projects/services/api.ts
import { ofetch } from 'ofetch';
import { projectsSchema, projectSchema } from '../helpers/validate'; // Importer valideringsskjemaet
import { API_URL } from '../config';
import { ProjectType } from '../Type';

export const getProjects = async (): Promise<ProjectType[]> => {
  try {
    const response = await ofetch(`${API_URL}`);
    const parsedProjects = projectsSchema.safeParse(response.data);
    const projectWithId: ProjectType[] = (parsedProjects.data || []).map(project => ({
      ...project,
      id: project.id || crypto.randomUUID()
    }))
    
    return projectWithId;
  } catch (error) {
    console.error('Feil ved henting av prosjekter:', error);
    return []; 
  }
};

export const createProject = async (project: Omit<ProjectType, 'id'>): Promise<ProjectType> => {
  try {
    const response = await ofetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(project)  
    });
    
    const parsedProjects = projectSchema.safeParse(response);

    return parsedProjects.data;
  } catch (error) {
    console.error('Feil ved oppretting av prosjekt:', error);
    throw new Error('Kunne ikke opprette prosjekt');
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  try {
    await ofetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Feil ved fjerning av prosjekt:', error);
    throw new Error('Kunne ikke slette prosjekt');
  }
};
