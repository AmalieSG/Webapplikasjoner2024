type ExperienceProps = {
    children: React.ReactNode;
  };
  
  export default function Experience({ children }: ExperienceProps) {
    return <li className="experience">{children}</li>;
  }