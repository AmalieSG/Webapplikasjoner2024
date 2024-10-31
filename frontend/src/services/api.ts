// src/features/projects/services/api.ts
import { ofetch } from 'ofetch';
import { projectsSchema, projectSchema } from '../helpers/validate'; // Importer valideringsskjemaet
import { API_URL } from '../config';
import { ProjectType } from '../Type'; // Importer ProjectType

// Hent prosjekter fra API
export const getProjects = async (): Promise<ProjectType[]> => {
  try {
    const response = await ofetch(`${API_URL}`);
    const parsedProjects = projectsSchema.safeParse(response.data);

    /*if (!parsedProjects.success) {
      console.error('Valideringsfeil:', parsedProjects.error.errors); // Logg valideringsfeil
      return []; 
    }*/
    
    return parsedProjects.data;
    //return projectsSchema.parse(response);
  } catch (error) {
    console.error('Feil ved henting av prosjekter:', error);
    return []; 
  }
};

// Opprett et prosjekt
export const createProject = async (project: Omit<ProjectType, 'id'>): Promise<ProjectType> => {
  try {
    const response = await ofetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(project),
      
    });

    const parsedProjects = projectsSchema.safeParse(response);
    /*if (!parsedProjects.success) {
      console.error('Valideringsfeil:', parsedProjects.error.errors); // Logg valideringsfeil
      throw new Error('Kunne ikke opprette prosjekt');
    }*/

    return parsedProjects.data;
    //return projectSchema.parse(response);
  } catch (error) {
    console.error('Feil ved oppretting av prosjekt:', error);
    throw new Error('Kunne ikke opprette prosjekt');
  }
};

// Slett et prosjekt
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
