export default function Header({ student, projectCount }) {
    return (
      <>
        <h1>{student.name}</h1>
        <ul className="info">
          <li>Utdanning: {student.degree}</li>
          <li>Studiepoeng: {student.points}</li>
          <li>Antall prosjekter: {projectCount}</li>
        </ul>
      </>
    );
  }