import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "../App.css";

const SectionSeven = () => {
  const [statusMessage, setStatusMessage] = useState("");

  // Handle name input - only allow alphabets and spaces
  const handleNameInput = (e) => {
    const value = e.target.value;
    // Replace any non-alphabetic characters (except spaces) with empty string
    const filteredValue = value.replace(/[^A-Za-z\s]/g, '');
    e.target.value = filteredValue;
  };

  // Handle phone input - only allow numbers
  const handlePhoneInput = (e) => {
    const value = e.target.value;
    // Replace any non-numeric characters with empty string
    const filteredValue = value.replace(/[^0-9]/g, '');
    e.target.value = filteredValue;
  };

  const sendEmail = (e) => {
    e.preventDefault();
  
    const form = e.target;
  
    // Manually extract values from form
    const formData = {
      name: form.name.value,
      email: form.email.value,
      company: form.company.value,
      phone: form.phone.value,
      requirements: form.requirements.value,
      
      // Manually added values
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      website: window.location.href,
    };
  
    emailjs
      .send("service_7qncbej", "template_gmxbd9s", formData, "B4FCDLx6lhggSt244")
      .then(
        (result) => {
          setStatusMessage("Thank you! Form has been submitted successfully.!");
          form.reset();
        },
        (error) => {
          setStatusMessage("Error submitting the form. Please try again.");
          console.error(error.text);
        }
      );
  };

  return (
    <div className="section-seven-form">
      <div className="form-header">
        <div className="title">
          <h1>
            Have a Project?
            <br />Let's talk!
          </h1>
        </div>
      </div>

      <div className="left-section">
        <img
          src="https://techinfinity.io/storage/2024/11/Our-team-of-experienced-developers-works.jpg"
          alt="team"
        />
      </div>

      <div className="right-section">
        <form id="contactForm" onSubmit={sendEmail}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                placeholder="Your Name"
                onInput={handleNameInput}
                pattern="[A-Za-z\s]+"
                title="Please enter only alphabets and spaces"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" name="email" required placeholder="abc.xyz@example.com" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input type="text" id="company" name="company" placeholder="ABC Company" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telephone number</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                placeholder="1234567890"
                onInput={handlePhoneInput}
                pattern="[0-9]+"
                title="Please enter only numbers"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="requirements">Requirements</label>
            <textarea
              id="requirements"
              name="requirements"
              required
              placeholder="Hello Techinfinity, can you help me with..."
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
          {statusMessage && <p className="status-message">{statusMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default SectionSeven;