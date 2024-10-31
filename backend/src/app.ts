import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { title } from "process";
import { getUser } from "./utils/auth";

const app = new Hono()

let projects = [
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

app.use("/*", cors({
    origin: "http://localhost:5173",
    credentials: true
    })
)

app.get("/projects", (c) => {
    const user = getUser(c.req.raw)

    if (!user) throw new HTTPException(401)
    
    const isPublic = true
    const publicProjects = projects.filter((project) => {
        project.isPublic === isPublic
    })
    
    if (user.role === "admin") {
        return c.json({
            data: projects
        })
    } else {
        return c.json({
            data: publicProjects
        })
    }
})

app.post("/projects", async (c) => {
    const body = await c.req.json()
    console.log('Mottatt prosjekt:', body)
    const newProject = {
        id: crypto.randomUUID(),
        ...body,
    }
    projects.push(newProject)
    return c.json(newProject)
})

app.delete("/projects/:id", (c) => {
    const { id } = c.req.param(); 
    projects = projects.filter((project) => project.id !== id);
  
    return c.json({ message: "Prosjektet ble fjernet" })
})

export default app;