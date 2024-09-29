import ContactForm from "./ContactForm";

  export default function Contact({ email }) {
    const showAlert = () => {
      alert(`Email: ${email}`);
    };
  
    return (
      <section className="contact">
      <p>Kontakt meg:
        <button onClick={showAlert}>E-post</button>
      </p>
      <ContactForm />
      </section>
    );
  }