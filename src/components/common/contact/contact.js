import React from 'react';
import './contact.scss';
import { loadReCaptcha } from 'react-recaptcha-v3'
import { ReCaptcha } from 'react-recaptcha-v3'
const axios = require(`axios`);
const queryString = require('query-string');

export class ContactUs extends React.Component {
  form = "";
  state = {
    name: "",
    email: "",
    phone: "",
    message: "",
    data: "",
    errors: {}
  }

  // response = async () => { 
  //   await axios.post(
  //     'http://ttpllt-php72.local/gatsby-from/',
  //     queryString.stringify (this.state.data),
  //     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' },   
  //   })
  // }
  
  response = async () => { 
    await axios.post(
      process.env.GATSBY_AWS_API_GETEWAY,
      JSON.stringify (this.state.data),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' },   
    })
  }

  componentDidMount() {
    loadReCaptcha(process.env.GATSBY_GOOGLE_RECAPTCHA_KEY);
  }

  verifyCallback = (recaptchaToken) => {
    this.setState({ recaptchaToken: recaptchaToken });
  }

  CheckRecaptcha = async ()  => { 
      var response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
     `secret=${process.env.GATSBY_GOOGLE_RECAPTCHA_SECREAT}&response=${this.state.recaptchaToken}`,
     {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",   
        },  
    })
    const data = await response;
       this.setState({ recaptchaResponse: data });
   
  }

  handleSubmit = event => {
    event.preventDefault();
    if(this.handleValidation())
    {
      this.state.data = { "name" : this.state.name , "email" : this.state.email , "phone" : this.state.phone , "message" : this.state.message }
      this.CheckRecaptcha();
      this.response();
    }
    
  }

  handleValidation(){
    let fields = this.state;
    let errors = {};
    let formIsValid = true;

    //Name
    if (this.state.name === ""){
       formIsValid = false;
       errors["name"] = "Please enter an Name";
    }

    if (this.state.name !== ""){
       if (!this.state.name.match(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/)){
          formIsValid = false;
          errors["name"] = "Please enter only letters";
       }        
    }

    //Email
    if (this.state.email === ""){
       formIsValid = false;
       errors["email"] = "Please enter an Email";
    }

    if (this.state.email !== ""){
       let lastAtPos = fields["email"].lastIndexOf('@');
       let lastDotPos = fields["email"].lastIndexOf('.');

       if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["email"] = "Email is not valid";
        }
    } 
    if (this.state.phone === ""){
    formIsValid = false;
    errors["phone"] = "Please enter an Phone";
    }

    if (this.state.phone!== ""){
      if(!this.state.phone.match(/^[0]?[789]\d{9}$/)){
        formIsValid = false;
        errors["phone"] = "Phone number is not valid";
    }   
    
    if (this.state.message === ""){
      formIsValid = false;
      errors["message"] = "Enter an Message";
    } 
  }

   this.setState({errors: errors});
   return formIsValid;
}
  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <div className="contact-form">
        <div className="container">
          <div className="row com-cover">
            <div className="col-md-10 offset-md-1">
              <h2 className="com-heading text-center text-white mb-3">
                Let's transform your business today
              </h2>
              <form  onSubmit={this.handleSubmit}> 
              <ReCaptcha
            sitekey = {process.env.GATSBY_GOOGLE_RECAPTCHA_KEY}
            verifyCallback={this.verifyCallback}
        /> 
                <div className="row">
                  <div className="col-md-4 col-xs-12 form-group">
                    <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleInputChange}  className="form-control" placeholder="Name"  />
                    <span className="error">{this.state.errors["name"]}</span>
                  </div>
                  <div className="col-md-4 col-xs-12 form-group">
                      <input type="text" name="phone" id="phone" value={this.state.phone} onChange={this.handleInputChange} className="form-control" placeholder="Phone"  />
                      <span className="error">{this.state.errors["phone"]}</span>
                  </div>
                  <div className="col-md-4 col-xs-12 form-group">
                      <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleInputChange} className="form-control" placeholder="Email"  />
                      <span className="error">{this.state.errors["email"]}</span>
                  </div> 
                  <div className="col-md-12 form-group">
                    <textarea className="form-control" name="message" id="message" value={this.state.massage} onChange={this.handleInputChange} rows="2" placeholder="Message" ></textarea>
                    <span className="error">{this.state.errors["message"]}</span>
                  </div> 
                </div>
                <div className="text-center mt-2">
                  <button type="submit" className="btn-submit p-0">Submit Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ContactUs;