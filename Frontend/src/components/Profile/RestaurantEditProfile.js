// import React, { Component } from 'react';

import React, {Component} from 'react';
// import { Redirect } from 'react-router';
// import cookie from 'react-cookies';
import axios from 'axios';
import { Button,Input } from 'reactstrap';
import backendServer from "../../webConfig";
import validator from 'validator';
class RestaurantEditProfile extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          restaurantid: localStorage.getItem("restaurantid"),
          restaurantname: localStorage.getItem("restaurantname"),
          zipcode:localStorage.getItem("zipcode"),
          description:localStorage.getItem("description"),
          email:localStorage.getItem("email"),
          phone: localStorage.getItem("phone"),
          deliverytype: localStorage.getItem("deliverytype"),
          foodtype:localStorage.getItem("foodtype"),
          days: localStorage.getItem("days"),
          city: localStorage.getItem("city"),
          dishes:null,
          timing:localStorage.getItem("timing"),
          loading: false,
          output: null,
          selectedFile : null,
          restprofilepic:null,
          
        }
    
        this.handleChange = this.handleChange.bind(this);
      }
      sendRestAPI = (data) => {
        axios.post(`${backendServer}/editrestaurant`, data)
            .then(res => {
              // console.log("here");
              // console.log(res.data);
                if(res.data.message){
                    this.setState({message:res.data.message})

                }else{
                  localStorage.setItem("restaurantname",res.data.username);
                  localStorage.setItem("zipcode",res.data.zipcode);
                  localStorage.setItem("email",res.data.email);
                  localStorage.setItem("phone",res.data.phone);
                  localStorage.setItem("timing",res.data.timing);
                  localStorage.setItem("description",res.data.description);
                  localStorage.setItem("deliverytype",res.data.deliverytype);
                  localStorage.setItem("foodtype",res.data.foodtype);
                  localStorage.setItem("city",res.data.city);
                  localStorage.setItem("days",res.data.days);
                  const {history} = this.props;
                  history.push('/restaurantprofile'); 
                }
                
            }).catch(
                (error) => {
                  console.log(error);
                }
            );
    }
    nullOrEmpty(str) {
      return str === null || str === "" || str === "Add"
    }
    validateProfile = () => {
         
      let isValid = true;
      if(this.state.email === null ||
           this.nullOrEmpty(this.state.restaurantname) ||
           this.nullOrEmpty(this.state.zipcode) ||  this.nullOrEmpty(this.state.phone)
           ||  this.nullOrEmpty(this.state.description) ||  this.nullOrEmpty(this.state.timing) 
           ||  this.nullOrEmpty(this.state.deliverytype) 
           ||  this.nullOrEmpty(this.state.city) ||  this.nullOrEmpty(this.state.days)){

         alert("Fields cannot be empty");
         isValid = false;
       }
       else
              {
                if (!validator.isEmail(this.state.email)) {
                alert('Enter valid Email!')
                isValid = false;
                }
                if(this.state.phone.match(/\d/g).length !==10){
                  alert('Phone number should only be 10 numbers!')
                  isValid = false;
                }
                if(this.state.zipcode.match(/\d/g).length !== 5){
                  alert('ZipCode should be 5 digits!')
                  isValid = false;
                }
            } 
        
        return isValid;
     }
      handleSubmit = (e) => {
        e.preventDefault();
        if (this.validateProfile() === true){

          const restuarantData = {
            restaurantid: localStorage.getItem("restaurantid"),
            restaurantname: this.state.restaurantname,
            email: this.state.email,
            zipcode: this.state.zipcode,
            phone:this.state.phone,
            description:this.state.description,
            timing:this.state.timing,
            city:this.state.city,
            deliverytype:this.state.deliverytype,
            foodtype:this.state.foodtype,
            days:this.state.days,
            restprofilepic:localStorage.getItem("restprofilepic"),
        }     
        this.sendRestAPI(restuarantData);
        }
        
      }
      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        }
        goback = (e) =>{
          e.preventDefault();
          const {history} = this.props;
          history.push('/restaurantprofile'); 
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
            formData.append("restaurantid", this.state.restaurantid);
          }
          else{
            alert("No Image inserted");
          }
          this.sendImageAPI(formData);        
        }
     sendImageAPI = (data) => {
          axios.post( `${backendServer}/restimageupload`, data)
              .then(res => {
              console.log(res.data);
                this.setState({profilepic:res.data});
                localStorage.setItem("restprofilepic",res.data);
                console.log(this.state.profilepic);
              })
            }
    render(){
    
    return (

      <div className="container">
      <div className="login-form">
        <div className="main-div">
          <div className="panel">
            <h2>Restuarant Profile</h2>

          </div>
 <div className="form-group">

              Profile pic:
              <input className="filefolder" type="file" onChange={this.saveFile} />
              <button onClick={this.uploadFile}>Upload</button>  
              <Button onClick = {this.goback}>Go Back</Button>
        
              </div>
          <div className="form-group">
          Restaurant Name: <Input className="form-control" type="text" name="restaurantname" value={this.state.restaurantname} onChange={this.handleChange} ></Input>
          
          </div>
          <div className="form-group">
          Description : <textarea className="form-control" type="text" name="description" defaultValue={this.state.description} onChange={this.handleChange}/>
         
          </div>
         
          <div className="form-group">
          Email:<Input type="text" className="form-control" name="email" value= {this.state.email} onChange={this.handleChange} />
          </div>
          <div className="form-group">
          Phone: <Input type="number" className="form-control"  maxlength="10"  name="phone" defaultValue={this.state.phone} onChange={this.handleChange} ></Input>
          </div>
          <div className="form-group">

          Timings : 
             <textarea className="form-control" type="text" name="timing" defaultValue={this.state.timing} onChange={this.handleChange}  />
          </div>
          <div className="form-group">
          Days :  
             <textarea className="form-control" type="text" name="days" defaultValue={this.state.days} onChange={this.handleChange}  />
          </div>
          <div className="form-group">
              Mode of Delivery :
            <select className="form-control" name="deliverytype" value={this.state.deliverytype} onChange={this.handleChange}>
              <option value="">Select delivery type</option> 
              {/* <option value="Pick Up and Delivery">Pick Up and Delivery</option> */}
              <option value="Pick Up">Pick Up</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>
           <div className="form-group">
              Food Type :
            <select className="form-control" name="foodtype" name="foodtype"  value={this.state.foodtype} onChange={this.handleChange} >
              <option value="">Select food type</option> 
              <option value="Veg" >Veg</option>
              <option value="Non-veg"  >Non-veg</option>
              <option value="Vegan" >Vegan</option>
            </select>
          </div>
          <div className="form-group">
          City: <Input type="text"  className="form-control" name="city" defaultValue={this.state.city} onChange={this.handleChange} ></Input>
          </div>
          <div className="form-group">
          Location Zip Code: <Input type="number" name="zipcode" defaultValue={this.state.zipcode} onChange={this.handleChange} ></Input>
          </div>
         
          <Button onClick = {this.handleSubmit}>Update Profile</Button>

          <Button onClick = {this.goback}>Back</Button>
        </div>
      </div>
    </div>
    )
    }
   
}
 
export default RestaurantEditProfile;