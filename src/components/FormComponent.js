import React, { Component } from "react";
import {
  Button,
  Label,
  FormGroup,
  Input,
  Form,
  FormFeedback
} from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";

export default class FormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      telnum: "",
      email: "",
      capture: 0,
      touched: {
        firstname: false,
        lastname: false,
        telnum: false,
        email: false
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(evt) {
    evt.preventDefault();

    // let check = 0;
    if (
      this.state.firstname === "" ||
      this.state.telnum === "" ||
      this.state.email === "" 
    ) {
      if (this.state.firstname === "") {
        this.setState({
          touched: {
            firstname: true
          }
        });
      }
      if (this.state.telnum === "") {
        this.setState({
          touched: {
            telnum: true
          }
        });
      }
      if (this.state.email === "") {
        this.setState({
          touched: {
            email: true
          }
        });
      }
      // if (this.state.capture === 0) {
      //   // this.setState({
      //   //   capture: 
      //   // });
      //   alert("check capture box")
      // }
      // check = 1;
    }
     else {
      const templateId = "template_96k6jPgv";
      let feedback = {
        Name: this.state.firstname,
        Email: this.state.email,
        Phone: this.state.telnum
      };
      let response = this.sendFeedback(templateId, {
        message_html: feedback,
        from_name: this.state.firstname,
        reply_to: this.state.email
      });
      console.log("response...........", response)
        if(0) {
          alert("Capture not found")
        } else {
          this.setState({
            firstname: "",
            email: "",
            telnum: "",
            capture: 0
          });
          this.setState({
            touched: {
              firstname: false,
              telnum: false,
              email: false
            }
          });
          window.grecaptcha.reset();
        }
      
    }
    return "Please fill fields"
  }

  sendFeedback(templateId, variables) {
    window.emailjs
      .send("gmail", templateId, variables)
      .then(res => {
        alert("informations successfully sent!");
        return res;
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
  }

  validate(firstname, telnum, email) {
    const errors = {
      firstname: "",
      lastname: "",
      telnum: "",
      email: ""
    };

    if (this.state.touched.firstname && firstname.length < 3)
      errors.firstname = "First Name should be >= 3 characters";
    else if (this.state.touched.firstname && firstname.length > 25)
      errors.firstname = "First Name should be <= 10 characters";

    const reg = /^\d+$/;
    if (this.state.touched.telnum && !reg.test(telnum))
      errors.telnum = "Tel. Number should contain only numbers";

    if (
      this.state.touched.email &&
      email.split("").filter(x => x === "@").length !== 1
    )
      errors.email = "Email should contain a @";

    return errors;
  }

  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  chptureChange(event) {
    event.preventDefault();
    this.setState({ capture: 1 });
  }

  render() {
    const errors = this.validate(
      this.state.firstname,
      this.state.telnum,
      this.state.email
    );

    return (
      <div className="row row-content  justify-content-center">
        <div className="col-12 col-md-9 ">
          <h3>Contact Us</h3>
        </div>
        <div className="col-12 col-md-9 ">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="firstname"
                name="firstname"
                value={this.state.firstname}
                placeholder="Name"
                onChange={this.handleInputChange}
                valid={errors.firstname === ""}
                invalid={errors.firstname !== ""}
                onBlur={this.handleBlur("firstname")}
              />
              <FormFeedback>{errors.firstname}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                valid={errors.email === ""}
                invalid={errors.email !== ""}
                onBlur={this.handleBlur("email")}
                onChange={this.handleInputChange}
              />
              <FormFeedback>{errors.email}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Phone</Label>
              <Input
                placeholder="Phone Number"
                type="tel"
                id="telnum"
                name="telnum"
                value={this.state.telnum}
                valid={errors.telnum === ""}
                invalid={errors.telnum !== ""}
                onBlur={this.handleBlur("telnum")}
                onChange={this.handleInputChange}
              />
              <FormFeedback>{errors.telnum}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <ReCAPTCHA
                sitekey="6LcUHOQUAAAAAMLTi_kn_8Gy7q5tt_IzS42FogMv"
                onChange={this.chptureChange}
              />
              <FormFeedback>Capture needed</FormFeedback>
            </FormGroup>
            <Button type="submit" value="submit" color="primary">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
