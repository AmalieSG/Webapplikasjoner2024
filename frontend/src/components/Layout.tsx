import { STUDENT_INFO } from "../config";
import { useProjects } from "../hooks/useProjects";
import Header from "./Header";

type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { projects } = useProjects()

    return (
        <>
        <header>
            <Header student={STUDENT_INFO} projectCount={projects.length} />
        </header>
        <main>
            {children}
        </main>
        <footer>
            <p>Webapplikasjoner 2024</p>
        </footer>
        </>
    )
}