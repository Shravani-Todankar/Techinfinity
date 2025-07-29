import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "../App.css";

const SectionSeven = () => {
  const [statusMessage, setStatusMessage] = useState("");

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
              <input type="text" id="name" name="name" required placeholder="Hemant Shah" />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" name="email" required placeholder="Hemant.S@example.com" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input type="text" id="company" name="company" placeholder="Techinfinity Agency" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telephone number</label>
              <input type="tel" id="phone" name="phone" placeholder="+91-90012-34589" />
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



// import React, { useEffect } from "react";
// import "../App.css";
// import emailjs from "@emailjs/browser";
// import { initializeFormHandling } from "../script";

// const SectionSeven = () => {
//   useEffect(() => {
//     // Initialize form handling and parallax
//     initializeFormHandling();
//     // initializePinnedFormParallax();
//     // initializeStackingAnimation();
//   }, []);

  

//   return (
//     <div className="section-seven">
//       <div className="form-header">
//         <div className="title">
//           <h1>
//             Have a Project?
//             <br />Let's talk!
//           </h1>
//         </div>
//       </div>

//       <div className="left-section">
//         <img src="https://techinfinity.io/storage/2024/11/Our-team-of-experienced-developers-works.jpg" alt="team" />
//       </div>

//       <div className="right-section">
//         <form id="contactForm">
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="name">Name</label>
//               <input type="text" id="name" name="name" placeholder="Hemant Shah" />
//             </div>
//             <div className="form-group">
//               <label htmlFor="email">E-mail</label>
//               <input type="email" id="email" name="email" placeholder="Hemant.S@example.com" />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="company">Company</label>
//               <input type="text" id="company" name="company" placeholder="Techinfinity Agency" />
//             </div>
//             <div className="form-group">
//               <label htmlFor="phone">Telephone number</label>
//               <input type="tel" id="phone" name="phone" placeholder="+91-90012-34589" />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="requirements">Requirements</label>
//             <textarea id="requirements" name="requirements" placeholder="Hello Techinfinity, can you help me with..."></textarea>
//           </div>

//           <button type="submit" className="submit-btn">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SectionSeven;