// utils/Type.ts
export enum ProjectStatus {
  Finished = "finished",
  Ongoing = "ongoing",
  NotStarted = "not-started"
}

export type ProjectType = {
    id: string;
    title: string;
    description?: string;
    categories?: string[];
    publishedAt: string;
    status: ProjectStatus;
    isPublic: boolean;
}
