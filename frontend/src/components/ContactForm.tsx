import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submittedData, setSubmittedData] = useState<{ name: string; message: string } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !message) {
      alert('Du må fyll begge feltene');
      return;
    }

    const formData = {
      name,
      message,
    };

    setSubmittedData(formData);
    setName('');
    setMessage('');
  };

  return (
    <>
    <form className='contactForm' onSubmit={handleSubmit}>
      <label>Navn:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>Melding:</label>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="submit">Send</button>
    </form>

    {submittedData && (
      <pre>{JSON.stringify(submittedData, null, 2)}</pre>
    )}
    </>
  );
}