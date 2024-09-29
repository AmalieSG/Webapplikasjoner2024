import Experience from "./Experience";

type ExperienceType = {
  name: string;
};

type ExperiencesProps = {
  experiences: ExperienceType[];
};

export default function Experiences({ experiences }: ExperiencesProps) {
  if (experiences.length === 0) {
    return <p>Ingen erfaring tilgjengelig :(</p>;
  }

  return (
    <section className="experience-section">
      <h2>Erfaring:</h2>
      <ul>
      {experiences.map((experience, index) => (
        <Experience key={index}>{experience.name}</Experience>
      ))}
      </ul>
    </section>
  );
}