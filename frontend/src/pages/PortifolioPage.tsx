import Contact from "../components/Contact";
import CreateProject from "../components/CreateProject";
import Experiences from "../components/Experiences";
import Layout from "../components/Layout";
import Projects from "../components/Projects";
import { STUDENT_INFO } from "../config";
import { useProjects } from "../hooks/useProjects";

export default function PortifolioPage() {
    const { projects, loading, error, addProject, removeProject } = useProjects()

    if (loading) {
        return <p>Laster data...</p>
    } else if (error) {
        return <p>Feil: {error}</p>
    } else {
        return (
            <Layout>
                <Experiences experiences={STUDENT_INFO.experiences} />
                <CreateProject onAddProject={addProject} />
                <Projects projects={projects} onRemoveProject={removeProject} />
                <Contact email={STUDENT_INFO.email} />
            </Layout>
        )
    }
}