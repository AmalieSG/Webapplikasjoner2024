import { ReactNode, useState } from "react";
import Project from "./Project";
import { ProjectType } from "../Type";

type ProjectsProps = {
    projects: ProjectType[];
    onRemoveProject: (id: string) => void;
    children?: (project: ProjectType, showRemove: boolean, updateShowState: () => void) => ReactNode;
  };
  
  export default function Projects(props: ProjectsProps) {
    const { projects, onRemoveProject } = props;
    const [showRemove, setShowRemove] = useState(false);

    const onMouseOver = () => {
      setShowRemove(true)
    }

    const onMouseLeave = () => {
      setShowRemove(false)
    }

    const getProjectCountByCategory = () => {
      const categoryTotals: { [key: string]: number } = {};
  
      projects.forEach((project) => {
        if (project.categories && Array.isArray(project.categories)) {
        project.categories.forEach((category) => {
          if (categoryTotals[category]) {
            categoryTotals[category]++;
          } else {
            categoryTotals[category] = 1;
          }
        });
      }
      });
  
      return categoryTotals;
    }

    const categoryTotals = getProjectCountByCategory()

    if (projects.length === 0) {
      return <p>Ingen prosjekter tilgjengelig:(</p>;
    }
  
    return (
      <section className="project-section">
        <h2>Oversikt over alle prosjekter</h2>

        <div className="category-summary">
          <h3>Antall prosjekter per kategori:</h3>
          <ul>
            {Object.entries(categoryTotals).map(([category, count]) => (
              <li key={category}>
                {category}: {count}
              </li>
            ))}
          </ul>
        </div>
        <div className="project-list">
          <ul>
            {projects.map((project) => (
              <Project key={project.id} project={project} onRemoveProject={onRemoveProject} showRemove={showRemove} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} /> 
            ))}
          </ul>
        </div>
      </section>
    );
  }
  