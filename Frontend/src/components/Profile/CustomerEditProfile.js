// import React, { Component } from 'react';

import React, {Component} from 'react';
// import { Redirect } from 'react-router';
// import cookie from 'react-cookies';
import axios from 'axios';
import { Button,Input } from 'reactstrap';
import backendServer from "../../webConfig";
import { CountryDropdown } from 'react-country-region-selector';
import validator from 'validator';
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
            address:localStorage.getItem("address"),
            profilepic:null,
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
              // console.log("edit details");
              // console.log(res.data);
                if(res.data.message){
                    this.setState({message:res.data.message})

                }else{
                    localStorage.setItem("username",res.data.username);
                    localStorage.setItem("about",res.data.about);
                    localStorage.setItem("dob",res.data.dob);
                    localStorage.setItem("state",res.data.state);
                    localStorage.setItem("address",res.data.address);
                    localStorage.setItem("city",res.data.city);
                    localStorage.setItem("country",res.data.country);
                    localStorage.setItem("nickname",res.data.nickname);
                    localStorage.setItem("email",res.data.email);
                    localStorage.setItem("phone",res.data.phone);
                   console.log(res.data.dob)
                   const {history} = this.props;
                   history.push('/customerprofile'); 
                   //  window.location.href='/CustomerProfile';
                }
                
            }).catch(
                (error) => {
                  console.log(error);
                }
            );
    }
    selectCountry (val) {
      this.setState({ country: val });
    }

     nullOrEmpty(str) {
        return str === null || str === "" || str === "Add"
      }
    validateProfile = () => {
         console.log("*****")
           let isValid = true;
              // console.log(this.state.email);
              // console.log(this.nullOrEmpty(this.state.about));
              // console.log(this.nullOrEmpty(this.state.username));
              // console.log(this.nullOrEmpty(this.state.phone));
              // console.log(this.nullOrEmpty(this.state.dob));


            if(this.state.email === null ||
                this.nullOrEmpty(this.state.about) ||
                this.nullOrEmpty(this.state.username) ||  this.nullOrEmpty(this.state.phone)
                ||  this.nullOrEmpty(this.state.dob) ||  this.nullOrEmpty(this.state.nickname) 
                ||  this.nullOrEmpty(this.state.address) ||  this.nullOrEmpty(this.state.state)
                ||  this.nullOrEmpty(this.state.city) ||  this.nullOrEmpty(this.state.country)){

              alert("Fields cannot be empty");
              isValid = false;
            }
            else
              {
                if (!validator.isEmail(this.state.email)) {
                alert('Enter valid Email!')
                isValid = false;
                }
            } 
        
        return isValid;
     }
      handleSubmit = (e) => {
        e.preventDefault();
        
        if (this.validateProfile() === true){
              const customerData = {
              userid:localStorage.getItem("userid"),
              username: this.state.username,
              email:this.state.email ,
              about: this.state.about,
              phone:this.state.phone,
              nickname:this.state.nickname,
              dob:this.state.dob,
              state:this.state.state,
              city:this.state.city,
              address:this.state.address,
              country:this.state.country,
              profilepic:localStorage.getItem("profilepic")
          }
        this.sendRestAPI(customerData);        
      }
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
          if(this.state.file != undefined && this.state.fileName !==undefined){
            formData.append("file", this.state.file,this.state.fileName);
            formData.append("userid", this.state.userid);
          }
          else{
            alert("No Image inserted");
          }
         
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
     
         <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h2>Customer Profile</h2>

              </div>

              <div className="form-group">

              Profile pic:
              <input className="filefolder" type="file" onChange={this.saveFile} />
              <button onClick={this.uploadFile}>Upload</button>  
              <Button onClick = {this.goback}>Go Back</Button>
        
              </div>
              <div className="form-group">

              Customer Name: <Input className="form-control" type="text" name="username" value={this.state.username} onChange={this.handleChange} ></Input>
               
              </div>
              <div className="form-group">
              Nick Name: <Input type="text" className="form-control" name="nickname" value={this.state.nickname} onChange={this.handleChange} ></Input>
              </div>
              <div className="form-group">
              About : <textarea type="text" className="form-control" name="about" defaultValue={this.state.about} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
              Email:<Input type="text" className="form-control" name="email" value= {this.state.email} onChange={this.handleChange} />
              </div>
              <div className="form-group">
              Phone: <Input type="text" className="form-control" name="phone" defaultValue={this.state.phone} onChange={this.handleChange} ></Input>
              </div>
              <div className="form-group">
              DoB: <input type="date" className="form-date" name="dob" defaultValue={this.state.dob} onChange={this.handleChange} />
              </div>
              <div className="form-group">
              Apt and Street No: <Input type="text" className="form-control" name="address" defaultValue={this.state.address} onChange={this.handleChange} ></Input>
              </div>
              <div className="form-group">
              City: <Input type="text" className="form-control" name="city" defaultValue={this.state.city} onChange={this.handleChange} ></Input>
              </div>
              <div className="form-group">
              State: <Input type="text" className="form-control" name="state" defaultValue={this.state.state} onChange={this.handleChange} ></Input>
              </div>
             
              <div className="form-group">
              Country :
              <CountryDropdown className="form-control"
                    value={this.state.country}
                    onChange={(val) => this.selectCountry(val)} 
                  />

             
              </div>
             
              <Button onClick = {this.handleSubmit}>Update Profile</Button>

              <Button onClick = {this.goback}>Back</Button>
            </div>
          </div>
        </div>
    )
    }
   
}
 
export default CustomerEditProfile;