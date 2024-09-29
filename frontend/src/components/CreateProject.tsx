import { useState } from 'react';
import { ProjectType } from './Type';

type CreateProjectProps = {
  onAddProject: ( project: Omit<ProjectType, 'id'>) => void;
};

export default function CreateProject(props: CreateProjectProps) {
  const { onAddProject } = props

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [date, setDate] = useState(new Date())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !categories || !date) {
      alert('Fyll inn alle feltene.');
      return;
    }

    const newProject = {
      title,
      description,
      categories,
      date
    }

    onAddProject(newProject)

    setTitle('')
    setDescription('')
    setCategories([])
    setDate(new Date())
  }

  const handleCategoriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCategories(value.split(', ').map(category => category.trim()))
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDate(new Date(value))
  }

  return (
    <section className='createProjectForm'>
      <h2>Legg til et nytt prosjekt:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Prosjekttittel:</label>
        <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
        
        <label htmlFor='description'>Beskrivelse:</label>
        <textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} />

        <label htmlFor='categories'>Kategorier:</label>
        <input type='text' id='categories' value={categories.join(', ')} onChange={handleCategoriesChange} />

        <label htmlFor='date'>Dato:</label>
        <input type='date' id='date' value={date.toISOString().split('T')[0]} onChange={handleDateChange} />

        <button type="submit">Legg til prosjekt</button>
      </form>
  </section>
  );
}