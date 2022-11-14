import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./contactus.style.css";
import { useState } from "react";
const ContactUs = () => {
  const [emailSendMessage, setEmailSendMessage] = useState("");
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_54e8mtn",
        "template_t3clcq6",
        form.current,
        "767wuq3MKo9vm3GPF"
      )
      .then((result) => {
        console.log(result);
        setEmailSendMessage("Email send");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="contact-container">
      <form className="contact-us" ref={form} onSubmit={sendEmail}>
        <label className="contact-us-name-label">Name</label>
        <input className="contact-us-name-field" type="text" name="user_name" />
        <label>Email</label>
        <input
          className="contact-us-email-field"
          type="email"
          name="user_email"
        />
        <label>Message</label>
        <textarea className="contact-us-message-field" name="message" />
        <input className="contact-us-send-btn" type="submit" value="Send" />
        <h3 className="contact-message">{emailSendMessage}</h3>
      </form>
    </div>
  );
};

export default ContactUs;
