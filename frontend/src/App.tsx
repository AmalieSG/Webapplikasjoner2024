import { useEffect, useState } from 'react';
import Header from './components/Header';
import Experiences from './components/Experiences';
import { ProjectType } from './components/Type';
import CreateProject from './components/CreateProject';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { ofetch } from 'ofetch';

const student = {
  name: "Halgeir Geirson",
  degree: "Bachelor IT",
  points: 180,
  email: "student@hiof.no",
  experiences: [
    { name: "Figma UI for customer X" },
    { name: "Website for customer Y" }
  ],
}

function App() {
  const [projects, setProjects] = useState<ProjectType[]>([])
    
  const fetchData = () => {
    ofetch('http://localhost:3000/projects')
    .then((projects: { data: ProjectType[] }) => {
        setProjects(projects.data)
      }
    )
    .catch((error) => {
      console.error(error)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onAddProject = (project: Omit<ProjectType, "id">) => {
    ofetch('http://localhost:3000/projects', {
      method: 'POST',
      body: JSON.stringify(project),})
    .then((newProject: ProjectType) => {
      setProjects((prev) => [...prev, newProject])
    })
    .catch((error) => {
      console.error('Feilet å legge til prosjektet: ', error)
    })
  }

  const onRemoveProject = (id: string) => {
    ofetch(`http://localhost:3000/projects/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setProjects((prev) => prev.filter((project) => project.id !== id))
    })
    .catch((error) => {
      console.error('Feil ved fjerning av prosjektet: ',error)  
    })
  }

  return (
    <>
    <header>
      <Header student={student} projectCount={projects.length} />
    </header>
    <main>
      <Experiences experiences={student.experiences} />      
      <CreateProject onAddProject={onAddProject} />      
      <Projects projects={projects} onRemoveProject={onRemoveProject} />
      <Contact email={student.email} />
    </main>
    </>
  );
}

export default App;