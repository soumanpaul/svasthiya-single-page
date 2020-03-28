import React, { useState } from 'react'
import { Button, Label, FormGroup, Input, Form } from 'reactstrap';
import ReCAPTCHA from "react-google-recaptcha";

export default function FormComponent() {

  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")
  const [Phone, setPhone] = useState("")
  const [capt, setCapt] = useState(0)

  // const required = (val) => val && val.length;
  // const maxLength = (len) => (val) => !(val) || (val.length <= len);
  // const minLength = (len) => (val) => (val) && (val.length >= len);
  // const isNumber = (val) => !isNaN(Number(val));
  // const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // if()

    const templateId = 'template_96k6jPgv';
    let feedback = {
      Name: Name,
      Email: Email,
      Phone: Phone
    }
    sendFeedback(templateId, { message_html: feedback, from_name: Name, reply_to: Email })

    setName("")
    setEmail("")
    setPhone("")
    window.grecaptcha.reset();
  }

  const sendFeedback = (templateId, variables) => {
    window.emailjs.send(
      'gmail', templateId,
      variables
    ).then(res => {
      alert('Email successfully sent!')
    })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  }
  const onChange = () => {
    setCapt(1)
  }

  return (
    <div className="row row-content  justify-content-center">
      <div className="col-12 col-md-9 ">
        <h3>Contact Us</h3>
      </div>
      <div className="col-12 col-md-9 ">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input type="text" value={Name} placeholder="Name"
              onChange={e => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input type="email" value={Email} placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phone">Phone</Label>
            <Input type="phone" value={Phone} placeholder="Phone Number"
              onChange={e => setPhone(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <ReCAPTCHA
              sitekey="6LcUHOQUAAAAAMLTi_kn_8Gy7q5tt_IzS42FogMv"
            onChange={onChange}
            />
          </FormGroup>
          <Button type="submit" value="submit" color="primary">Submit</Button>
        </Form>
      </div>
    </div>
  )
}
