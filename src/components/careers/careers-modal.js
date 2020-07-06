
import React from 'react'
import Modal from 'react-modal';
//import { loadReCaptcha } from 'react-recaptcha-v3';
//import { ReCaptcha } from 'react-recaptcha-v3';
const axios = require(`axios`);

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  },
  overlay: {zIndex: 15}
};

class CareersModal extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      name: "",
      email: "",
      phone: "",
      data: "",
      position : this.props.position,
      resume:"",
      errors: {},
      submitMessage:"",
      awsFileKey: "",
      buttonDisabled:false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.fileInput = React.createRef();
  }
  // componentDidMount() {
  //   loadReCaptcha(process.env.GATSBY_GOOGLE_RECAPTCHA_KEY);
  // }

  // verifyCallback = (recaptchaToken) => {
  //   this.setState({ recaptchaToken: recaptchaToken });
  // }
  handleOpenModal () {
    //console.log(position)
    this.setState({ showModal: true, submitMessage:""  });

  }

  handleCloseModal () {
    this.setState({ showModal: false, submitMessage:"" });
  }

  response = async ()  => {
    this.state.data = {
      "position": this.state.position,
      "name" : this.state.name ,
      "email" : this.state.email ,
      "phone" : this.state.phone ,
      "resume" : this.fileInput.current.files[0],
      "awsFileKey": this.state.awsFileKey,

   }
    await axios.post(
      process.env.GATSBY_AWS_API_GETEWAY_CAREERS,
      JSON.stringify (this.state.data),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
    }).then((response) => {
          this.setState({ submitMessage: response });
          this.setState({name:"", email: "",phone:"",message:"",data:"",errors:"", awsFileKey:"", position:"", buttonDisabled: false});
         setTimeout(function(){
          this.setState({showModal:false});
          }.bind(this),3000);  // wait 5 seconds, then reset to false
    }, (error) => {
     // console.log(error);
    });
  }

  handleSubmit =  event => {
    this.setState({ buttonDisabled: true });
    event.preventDefault();
    if(this.handleValidation())
     {
              let  selectedFile = this.fileInput.current.files[0];
              let _self = this;
               if (selectedFile) {
                let fileToLoad = selectedFile[0];
                let fileReader = new FileReader();
                // Onload of file read the file content
                fileReader.onload = function(fileLoadedEvent)
                 {
                    var file = fileLoadedEvent.target.result;
                    let base64String = file.split(',');
                    _self.saveFile(base64String[1]);
                };
                fileReader.readAsDataURL(selectedFile);
           }
    }
  }

  async saveFile(fileUrl) {
    let url = "https://eunghtsbs6.execute-api.ap-south-1.amazonaws.com/default/get-upload-url";

    const payloadDate = {
      FileName: "application.pdf",
      methodType: "POST"
    }

    const headers = {
      'Content-Type': 'application/json'
    }

    await axios.post(url, payloadDate, {
      headers: headers
    }).then(
      (result) => {
        console.log(JSON.stringify(result.data));
        this.postFile(fileUrl, result);
      },
      (error) => {

      });
  }


  async  postFile(fileUrl, awsData) {
    let url = awsData.data.url;
    const blob = this.b64toBlob(fileUrl, 'application/pdf', 512);
    this.setState({ awsFileKey: awsData.data.fields['key'] });
    let payloadDate = new FormData();
    payloadDate.append('key', awsData.data.fields['key'])
    payloadDate.append('AWSAccessKeyId', awsData.data.fields['AWSAccessKeyId'])
    payloadDate.append('x-amz-security-token', awsData.data.fields['x-amz-security-token'])
    payloadDate.append('policy', awsData.data.fields['policy'])
    payloadDate.append('signature', awsData.data.fields['signature'])
    payloadDate.append('file', await blob, awsData.data.fields['key'])
    const headers = {
      'Content-Type': 'multipart/form-data'
    }

    await axios.post(url, payloadDate, {
      headers: headers
    }).then(
      (result) => {
        this.response();
      },
      (error) => {
        console.log(error);
      });
  }


  async  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    var byteCharacters = window.atob(b64Data);//atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });

    return blob;
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
  }

  if(this.fileInput.current.files[0] === undefined)
  {
      formIsValid = false;
     errors["file"] = "Please upload the resume.";
  }
  if(this.fileInput.current.files[0] !== undefined)
  {
     if(this.fileInput.current.files[0].type !== 'application/pdf')
     {
         formIsValid = false;
         errors["file"] = "Please upload resume as a pdf file.";
     }
  }

   this.setState({errors: errors});
   if(formIsValid === false)
   {
    this.setState({ buttonDisabled: false });
   }
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

   render () {
    return (
      <div>
         {/* <ReCaptcha
            sitekey = {process.env.GATSBY_GOOGLE_RECAPTCHA_KEY}
            action='careers'
            verifyCallback={this.verifyCallback}
        /> */}
        <button className="btn-apply mb-4 p-0 font-weight-bold" onClick={this.handleOpenModal}>
          Apply Now
        </button>
        <Modal
           isOpen={this.state.showModal}
           contentLabel="onRequestClose Example"
           onRequestClose={this.handleCloseModal}
           style={customStyles}
        >
          <button className="btn-close" onClick={this.handleCloseModal}>
            <i class="fa fa-times" aria-hidden="true"></i>
          </button>
          <div>
            <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
              <h3 className="section-title text-black text-center mb-5">
                Please fill the form for
                <p>{this.state.position}</p>
              </h3>
              {this.state.submitMessage !== "" ?
              <div className= {this.state.submitMessage.data.success === true ? "alert alert-success" : "alert alert-danger"} role = "alert">
                {this.state.submitMessage.data.message}
              </div>
              :null }
              {/* <div className="row"> */}
                <div className="col-md-12 col-xs-12 form-group">
                  <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleInputChange}  className="form-control" placeholder="Name"  />
                  <span className="error">{this.state.errors["name"]}</span>
                </div>
                <div className="col-md-12 col-xs-12 form-group">
                    <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleInputChange} className="form-control" placeholder="Email"  />
                    <span className="error">{this.state.errors["email"]}</span>
                </div>
                <div className="col-md-12 col-xs-12 form-group">
                    <input type="text" name="phone" id="phone" value={this.state.phone} onChange={this.handleInputChange} className="form-control" placeholder="Phone"  />
                    <span className="error">{this.state.errors["phone"]}</span>
                </div>
                <div className="col-md-12 col-xs-12 form-group">
                  <input type="file" ref={this.fileInput} />
                </div>
                <div className="col-md-12 col-xs-12 form-group"><span className="error">{this.state.errors["file"]}</span></div>
                {/* </div> */}
              <div className="text-center my-3">
                <button type="submit" disabled={this.state.buttonDisabled} className="btn-submit p-0">Submit Now</button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
   }
}
export default CareersModal;