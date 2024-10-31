export { projects }

const projects = [
    {
        id: crypto.randomUUID(),
        title: 'Project 1', 
        description: 'Description of project 1',
        categories: ["programmering", "design", "prosjektledelse"],
        publishedAt: new Date("2024-01-01"),
        status: "finished",
        isPublic: true
    },
    { 
        id: crypto.randomUUID(),
        title: 'Project 2', 
        description: 'Description of project 2', 
        categories: ["programmering", "design", "prosjektledelse"],
        publishedAt: new Date("2024-01-02"),
        status: "finished",
        isPublic: true
    },
    {
        id: crypto.randomUUID(),
        title: 'Project 3', 
        description: 'Description of project 3',
        categories: ["programmering", "design", "prosjektledelse"],
        publishedAt: new Date("2024-01-03"),
        status: "ongoing",
        isPublic: false
    },
    {
        id: crypto.randomUUID(),
        title: 'Project 4', 
        description: 'Description of project 4',
        categories: ["programmering", "design", "prosjektledelse"],
        publishedAt: new Date("2024-01-04"),
        status: "not-started",
        isPublic: false
    },
    {
        id: crypto.randomUUID(),
        title: 'Project 5', 
        description: 'Description of project 5',
        categories: ["programmering", "design", "prosjektledelse"],
        publishedAt: new Date("2024-01-05"),
        status: "finished",
        isPublic: true
    }
]
