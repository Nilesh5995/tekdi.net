import React from "react"
import './contact.scss'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
const axios = require(`axios`);
var PhoneNumber = require( 'awesome-phonenumber' );
export class contactUs extends React.Component {
  constructor(props) {
    super(props)
    this.pageUrl =  typeof window !== 'undefined' ? window.location.href : '';
    this.closeAlert = true;
    this.closeAlertMessage = this.closeAlertMessage.bind(this);
  }

  state = {
    name          : "",
    email         : "",
    phone         : "",
    message       : "",
    data          : "",
    errors        : {},
    submitMessage :"",
    closeAlert    : true
  }

  response = async () => {
    await axios.post(
      process.env.GATSBY_AWS_API_GETEWAY,
      JSON.stringify (this.state.data),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then((response) => {
      this.setState({ submitMessage: response });
      this.setState({name:"", email: "",phone:"",message:"",data:"",errors:"",  closeAlert : false });
      }, (error) => {
      });
  }

  handleSubmit =  async (event) => {
    event.preventDefault();
    if(this.handleValidation())
    {
      this.state.data = { "name" : this.state.name ,
                          "email" : this.state.email ,
                          "phone" : this.state.phone,
                          "message" : this.state.message,
                          "pageUrl" : this.pageUrl,
                        }
       this.response();
    }
  }

  handleValidation(){
    let fields = this.state;
    let errors = {};
    let formIsValid = true;
    //Name
    if (this.state.name === "") {
       formIsValid = false;
       errors["name"] = "Enter an Name";
    }

    if (this.state.name !== "") {
       if (!this.state.name.match(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/)){
          formIsValid = false;
          errors["name"] = "Please enter only letters";
       }
    }
    //Email
    if (this.state.email === "") {
       formIsValid = false;
       errors["email"] = "Enter an Email";
    }

    if (this.state.email !== "") {
       let lastAtPos = fields["email"].lastIndexOf('@');
       let lastDotPos = fields["email"].lastIndexOf('.');

       if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["email"] = "Email is not valid";
        }
    }

    if (this.state.message === "") {
      formIsValid = false;
      errors["message"] = "Enter an Message";

    }

    if (this.state.phone === "") {
      formIsValid = false;
      errors["phone"] = "Enter an Phone";
    }

    if (this.state.phone !== "") {
      var regionCode = PhoneNumber('+'+this.state.phone).getRegionCode( );
      var pn = new PhoneNumber( this.state.phone, regionCode );
      if(!pn.isValid( )) {
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

  closeAlertMessage() {
    this.setState({ closeAlert: true });
  }
  // Send a POST request
  render() {
    return (
        <form  onSubmit={this.handleSubmit}>
          <div className="row">
            {this.state.submitMessage !== "" && this.state.closeAlert === false ?
                <div className= {this.state.submitMessage.data.success === true ? "alert alert-success  col form-group" : "alert alert-danger col form-group"} role = "alert">
                  {this.state.submitMessage.data.message}
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.closeAlertMessage}>
                      <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              :null }
          </div>
          <div className="row">
            <div className="col form-group">
              <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleInputChange}  className="form-control" placeholder="Name"  />
              <span className="error">{this.state.errors["name"]}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-7 col-md-12 col-sm-6 col-xs-12 form-group">
                 {/* <input type="text" name="phone" id="phone" value={this.state.phone} onChange={this.handleInputChange} className="form-control" placeholder="Phone"  /> */}
                 <PhoneInput
                  country={'in'}
                  name="phone"
                  id="phone"
                  value={this.state.phone}
                  onChange={phone => this.setState({ phone })}
                  placeholder="Phone"
                  enableSearch = {true}
                  inputStyle={ { "paddingLeft" :"48px",
                  "color":"#65737f"
                  }}
                  inputClass="phone-input"
                  inputProps={{
                    name: 'phone',
                    autoFocus: true
                  }}
                  dropdownStyle= {{"color":"#65737f"  }}
                />
                 <span className="error">{this.state.errors["phone"]}</span>
              </div>
              <div className="col-lg-5 col-md-12 col-sm-6 col-xs-12 form-group">
                 <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleInputChange} className="form-control" placeholder="Email"  />
                 <span className="error">{this.state.errors["email"]}</span>
              </div>
          </div>
          <div className="row">
            <div className="col form-group">
             <textarea className="form-control" name="message" id="message" value={this.state.message} onChange={this.handleInputChange} rows="3" placeholder="Message" ></textarea>
             <span className="error">{this.state.errors["message"]}</span>
            </div>
          </div>
          <button type="submit" className="btn-submit">Submit Now</button>
        </form>
    );
  }
}

export default contactUs