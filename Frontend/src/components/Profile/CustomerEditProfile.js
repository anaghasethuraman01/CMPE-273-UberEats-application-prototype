// import React, { Component } from 'react';

import React, {Component} from 'react';
// import { Redirect } from 'react-router';
// import cookie from 'react-cookies';
import axios from 'axios';
import { Button } from 'reactstrap';
import backendServer from "../../webConfig";

class CustomerEditProfile extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
            userid:localStorage.getItem("userid"),
            username:localStorage.getItem("username"),
            email: localStorage.getItem("email"),
            password: null,
            about: localStorage.getItem("about"),
            phone:localStorage.getItem("phone"),
            nickname:localStorage.getItem("nickname"),
            dob:localStorage.getItem("dob"),
            state:localStorage.getItem("state"),
            city:localStorage.getItem("city"),
            country:localStorage.getItem("country"),
            profilepic:localStorage.getItem("profilepic"),
            loading: false,
            output: null
        }
        // this.state.email = localStorage.getItem("email");
        // this.state.username = localStorage.getItem("username");
        this.handleChange = this.handleChange.bind(this);
      }
      sendRestAPI = (data) => {
        axios.post(`${backendServer}/editcustomer`, data)
            .then(res => {
                console.log("edit details");
              console.log(res.data);
                if(res.data.message){
                    this.setState({message:res.data.message})

                }else{

                    localStorage.setItem("username",res.data.username);
                    localStorage.setItem("about",res.data.about);
                    localStorage.setItem("dob",res.data.dob);
                    localStorage.setItem("state",res.data.state);
                    localStorage.setItem("city",res.data.city);
                    localStorage.setItem("country",res.data.country);
                    localStorage.setItem("nickname",res.data.nickname);
                    localStorage.setItem("email",res.data.email);
                    localStorage.setItem("phone",res.data.phone);
                   console.log(res.data.dob)
                     window.location.href='/CustomerProfile';
                }
                
            }).catch(
                (error) => {
                  console.log(error);
                }
            );
    }
      handleSubmit = (e) => {
        e.preventDefault();
        const customerData = {
            userid:localStorage.getItem("userid"),
            username: this.state.username,
            email:this.state.email ,
            password: this.state.password,
            about: this.state.about,
            phone:this.state.phone,
            nickname:this.state.nickname,
            dob:this.state.dob,
            state:this.state.state,
            city:this.state.city,
            country:this.state.country,
        }
       // console.log(customerData);
       this.sendRestAPI(customerData);        
      }
      // goback = (e) =>{
      //   e.preventDefault();
      //   const {history} = this.props;
      //   history.push('/customerprofile'); 
      // }
      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        }
        goback = (e) =>{
          
          e.preventDefault();
          const {history} = this.props;
          history.push('/customerprofile'); 
        }
        saveFile = (e) => {
          e.preventDefault();
          this.setState({file:e.target.files[0]});
          this.setState({fileName:e.target.files[0].name});
          
        };
        uploadFile = (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append("file", this.state.file,this.state.fileName);
          formData.append("userid", this.state.userid);
          
         // console.log(customerData);
         this.sendImageAPI(formData);        
        }
        sendImageAPI = (data) => {
          axios.post( `${backendServer}/custimageupload`, data)
              .then(res => {
              console.log(res.data);
                 this.setState({profilepic:res.data});
                localStorage.setItem("profilepic",res.data);
                console.log(this.state.profilepic);
              })
            }
     
    render(){

    return (
        <div class="container">
            <form >
            <h1>Customer Profile</h1>
            Profile pic:
            <input className="filefolder" type="file" onChange={this.saveFile} />
          <button onClick={this.uploadFile}>Upload</button>  
          <Button onClick = {this.goback}>Go Back</Button>
            <div className='form-control'>

            Customer Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} ></input><br/>
            Nick Name: <input type="text" name="nickname" value={this.state.nickname} onChange={this.handleChange} ></input><br/>
            About : <textarea type="text" name="about" defaultValue={this.state.about} onChange={this.handleChange}/>
          
            <br/>
            Email:<input type="text" name="email" value= {this.state.email} onChange={this.handleChange} />
            <br/>
           
            Phone: <input type="text" name="phone" defaultValue={this.state.phone} onChange={this.handleChange} ></input><br/>
            DoB: <input type="date" name="dob" defaultValue={this.state.dob} onChange={this.handleChange} ></input><br/>
            State: <input type="text" name="state" defaultValue={this.state.state} onChange={this.handleChange} ></input><br/>
            City: <input type="text" name="city" defaultValue={this.state.city} onChange={this.handleChange} ></input><br/>
            Country: <input type="text" name="country" defaultValue={this.state.country} onChange={this.handleChange} ></input><br/>

            <br/>
            <Button onClick = {this.handleSubmit}>Update Profile</Button>

            <Button onClick = {this.goback}>Back</Button>
            </div>
            </form>
        </div>
    )
    }
   
}
 
export default CustomerEditProfile;