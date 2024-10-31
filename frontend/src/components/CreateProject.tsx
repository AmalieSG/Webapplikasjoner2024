import { useState } from 'react';
import { ProjectStatus, ProjectType } from '../Type';

type CreateProjectProps = {
  onAddProject: ( project: Omit<ProjectType, 'id'>) => void;
};

export default function CreateProject(props: CreateProjectProps) {
  const { onAddProject } = props

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [publishedAt, setPublishedAt] = useState<string>('')
  const [status, setStatus] = useState<ProjectStatus | ''>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || categories.length === 0) {
      alert('Fyll inn alle feltene.');
      return;
    }

    const newProject = {
      title,
      description,
      categories,
      publishedAt: publishedAt || new Date().toISOString(),
      status:status || ProjectStatus.NotStarted
    }

    onAddProject(newProject)

    setTitle('')
    setDescription('')
    setCategories([])
    setPublishedAt('')
    setStatus('')
  }

  const handleCategoriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCategories(value.split(', ').map((category) => category.trim()))
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPublishedAt(value)
  }

  return (
    <section className='createProjectForm'>
      <h2>Legg til et nytt prosjekt:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Prosjekttittel:</label>
        <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
        
        <label htmlFor='description'>Beskrivelse:</label>
        <textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} />

        <label htmlFor='categories'>Kategorier (separer med ","):</label>
        <input type='text' id='categories' value={categories.join(', ')} onChange={handleCategoriesChange} />

        <label htmlFor='status'>Status:</label>
        <select id='status' value={status} onChange={(e) => setStatus(e.target.value as ProjectStatus)}>
          <option value=''>Velg status</option>
          <option value={ProjectStatus.Finished}>Ferdig</option>
          <option value={ProjectStatus.Ongoing}>Pågående</option>
          <option value={ProjectStatus.NotStarted}>Ikke startet</option>
        </select>
        <label htmlFor='date'>Dato:</label>
        <input type='date' id='date' value={publishedAt} onChange={handleDateChange} />

        <button type="submit">Legg til</button>
      </form>
      
  </section>
  );
}