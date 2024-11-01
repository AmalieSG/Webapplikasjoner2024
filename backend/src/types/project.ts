export enum Status {
    Finished = "finished",
    Ongoing = "ongoing",
    NotStarted = "not-started"
  }
  
export type Project = {
    id: string;
    title: string;
    description?: string;
    categories?: string[];
    publishedAt: string;
    status: Status;
    isPublic: boolean;
}

export type DbProject = {
    id: string;
    title: string;
    description?: string;
    categories?: string;
    publishedAt: string;
    status: string;
    isPublic: boolean;
}