import React, { useRef } from 'react';
import './ContactForm.css';

const ContactForm = () => {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);
  
  
  
    const handleSubmit = (e) => {
      e.preventDefault(); 
      //bunu yapmazsan page resetleniyor.
  
  
      console.log('Name:', nameRef.current.value);
      console.log('Email:', emailRef.current.value);
      console.log('Message:', messageRef.current.value);

      nameRef.current.value = '';
      emailRef.current.value = '';
      messageRef.current.value = '';
    };
  
    return (
      <div className="contact-page">
        <h1>Contact Us</h1>
  
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              ref={nameRef} //Ref'i ekle
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef} 
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              ref={messageRef}
              required
            />
          </div>
  
          <button type="submit">Send Message</button>
        </form>
      </div>
    );
  };
  
  export default ContactForm;