import React from "react"
import './contact.scss'
const axios = require(`axios`);
const queryString = require('query-string');

export class contactUs extends React.Component {
  form = "";
  state = {
    name: "",
    email: "",
    phone: "",
    message: "",
    data: "",
    errors: {}
  }

  response = async () => { 
    await axios.post(
      'http://ttpllt-php72.local/gatsby_joomla/index.php?option=com_api&app=contactform&resource=contactform',
     queryString.stringify (this.state.data),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' },   
    })
  }
  
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state)
    if(this.handleValidation())
    {
      this.state.data = { "name" : this.state.name , "email" : this.state.email , "phone" : this.state.phone , "message" : this.state.message }
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
       errors["name"] = "Enter an Name";
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
       errors["email"] = "Enter an Email";
    }

    if (this.state.email !== ""){
       let lastAtPos = fields["email"].lastIndexOf('@');
       let lastDotPos = fields["email"].lastIndexOf('.');

       if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["email"] = "Email is not valid";
        }
    } 

    if (this.state.message === ""){
      formIsValid = false;
      errors["message"] = "Enter an Message";
    } 

    if (this.state.phone === ""){
    formIsValid = false;
    errors["phone"] = "Enter an Phone";
    }

    if (this.state.phone!== ""){
      if(!this.state.phone.match(/^[0]?[789]\d{9}$/)){
        formIsValid = false;
        errors["phone"] = "Phone number is not valid";
    }        
}

   this.setState({errors: errors});
   return formIsValid;
}

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    //const message = target.message
    this.setState({
      [name]: value,
    })
  }

  // Send a POST request
  render() {
    return (
        <form  onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col form-group">
              <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleInputChange}  className="form-control" placeholder="Name"  />
              <span className="error">{this.state.errors["name"]}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-6 col-xs-12 form-group">
                 <input type="text" name="phone" id="phone" value={this.state.phone} onChange={this.handleInputChange} className="form-control" placeholder="Phone"  />
                 <span className="error">{this.state.errors["phone"]}</span>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-6 col-xs-12 form-group">
                 <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleInputChange} className="form-control" placeholder="Email"  />
                 <span className="error">{this.state.errors["email"]}</span>
              </div> 
          </div>
          <div className="row">
            <div className="col form-group">
             <textarea className="form-control" name="message" id="message" value={this.state.massage} onChange={this.handleInputChange} rows="3" placeholder="Message" ></textarea>
             <span className="error">{this.state.errors["message"]}</span>
            </div> 
          </div>
          <button type="submit" className="btn-submit">Submit Now</button>
        </form>
    );
  }
}
export default contactUs