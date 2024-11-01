import { DbProject, Project, Status } from "../types/project";

export const fromDb = (project: DbProject) => {
    return {
        id: project.id,
        title: project.title,
        description: project.description,
        categories: project.categories ? project.categories.split(",") : [],
        publishedAt: project.publishedAt,
        status: project.status,
        isPublic: project.isPublic
    }
}

export const createProject = (project: Partial<Project>): Project => {
    return {
        id: project.id ?? crypto.randomUUID(),
        title: project.title ?? "",
        description: project.description ?? "",
        categories: project.categories ?? [],
        publishedAt: project.publishedAt ?? new Date().toISOString(),
        status: project.status ?? Status.NotStarted,
        isPublic: project.isPublic ?? false
    }
}
export const toDb = (data: Project) => {
    const project = createProject(data)
    const entries = Object.entries(project) as Entries<Project>
    const dbProject = {} as DbProject

    for (const entry of entries) {
        if (!entry) continue
        const [key, value] = entry
        switch (key) {
            case "id":
                dbProject.id = value
                break
            case "title":
                dbProject.title = value
                break
            case "description":
                dbProject.description = value
                break
            case "categories":
                dbProject.categories = value.join(",")
                break
            case "publishedAt":
                dbProject.publishedAt = value
                break
            case "status":
                dbProject.status = value
                break
            case "isPublic":
                dbProject.isPublic = value
                break
            default:
                break
        }
    }
    return dbProject
}