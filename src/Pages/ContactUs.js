import React, { useRef } from "react";
import { Button } from "react-bootstrap";

const ContactUs = (props) => {
  const nameRef = useRef("");
  const mailRef = useRef("");
  const phoneRef = useRef("");
  const issueRef = useRef("");

  const contactFormSubmit = (event) => {
    event.preventDefault();
    const userIssue = {
      name: nameRef.current.value,
      mail: mailRef.current.value,
      phone: phoneRef.current.value,
      issue: issueRef.current.value,
    };
    props.contactFormHandler(userIssue);

    nameRef.current.value = "";
    mailRef.current.value = "";
    phoneRef.current.value = "";
    issueRef.current.value = "";
  };

  return (
    <>
      <form>
        <div>
          <label>Name</label>
          <input type="text" ref={nameRef} />
          <label>Email</label>
          <input type="text" ref={mailRef} />
          <label>Phone Number</label>
          <input type="text" ref={phoneRef} />
          <label>Issue?</label>
          <input type="text" ref={issueRef} />
          <Button onClick={contactFormSubmit}>Send</Button>
        </div>
      </form>
    </>
  );
};

export default ContactUs;
