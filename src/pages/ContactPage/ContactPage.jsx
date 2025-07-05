import React, { useEffect } from "react";
import ContactForm from "../../components/ContactForm/ContactForm.jsx";

function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="contact-page-containers">
      <ContactForm />
    </div>
  );
}

export default ContactPage;
