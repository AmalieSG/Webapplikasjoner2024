import { ProjectType } from "./Type";

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
      <p>Beskrivelse: {project.description}</p>
      <p>Kategorier: {project.categories.join(", ")}</p>
      <p>{new Date(project.date).toLocaleDateString('no-No', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
      </p>
        
      {showRemove ? (
        <button type="button" onClick={() => onRemoveProject(project.id)}>
          X
          </button>
      ) : null}
    </li>
    </>
  )
}
  