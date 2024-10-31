import { Hono } from "hono";
import { cors } from "hono/cors";
import { title } from "process";

const app = new Hono()

let projects = [
    {
        id: crypto.randomUUID(),
        title: 'Project 1', 
        description: 'Description of project 1',
        date: new Date("2024-01-01"),
        categories: ["programmering", "design", "prosjektledelse"]
    },
    { 
        id: crypto.randomUUID(),
        title: 'Project 2', 
        description: 'Description of project 2', 
        date: new Date("2024-01-02"),
        categories: ["programmering", "design", "prosjektledelse"]
    },
    {
        id: crypto.randomUUID(),
        title: 'Project 3', 
        description: 'Description of project 3',
        date: new Date("2024-01-03"),
        categories: ["programmering", "design", "prosjektledelse"]
    },
    {
        id: crypto.randomUUID(),
        title: 'Project 4', 
        description: 'Description of project 4',
        date: new Date("2024-01-04"),
        categories: ["programmering", "design", "prosjektledelse"]
    },
    {
        id: crypto.randomUUID(),
        title: 'Project 5', 
        description: 'Description of project 5',
        date: new Date("2024-01-05"),
        categories: ["programmering", "design", "prosjektledelse"]
    }
]

app.use("/*", cors())

app.get("/projects", (c) => {
  return c.json({
    data: projects
  })
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