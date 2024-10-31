import { useState } from 'react';
import { ProjectType } from '../Type';

type CreateProjectProps = {
  onAddProject: ( project: Omit<ProjectType, 'id'>) => void;
};

export default function CreateProject(props: CreateProjectProps) {
  const { onAddProject } = props

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [date, setDate] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || categories.length === 0 || !date) {
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
    setDate('')
  }

  const handleCategoriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCategories(value.split(', ').map((category) => category.trim()))
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDate(value)
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

        <label htmlFor='date'>Dato:</label>
        <input type='date' id='date' value={date} onChange={handleDateChange} />

        <button type="submit">Legg til</button>
      </form>
      
  </section>
  );
}