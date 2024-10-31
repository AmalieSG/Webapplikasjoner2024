import { format } from "date-fns";
import { ProjectType } from "../Type";


type ProjectProps = {
  project: ProjectType;
  onRemoveProject: (id: string) => void;
  showRemove: boolean;
  onMouseOver: () => void;
  onMouseLeave: () => void;
}
  
export default function Project(props: ProjectProps) {
  const { project, onRemoveProject, showRemove, onMouseOver, onMouseLeave } = props;

  return (
    <>
    <li className="project-card" key={project.id} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <p>{project.categories?.join(", ")}</p>
      <p>Opprettet: {project.date ? format(new Date(project.date), "dd.MM.yyyy") : 'Ukjent dato'}</p>
        
      {showRemove ? (
        <button type="button" onClick={() => onRemoveProject(project.id)}>
          X
          </button>
      ) : null}
    </li>
    </>
  )
}
  