// import React, { Component } from 'react';

import React, {Component} from 'react';
// import { Redirect } from 'react-router';
// import cookie from 'react-cookies';
import axios from 'axios';
import { Button,Input } from 'reactstrap';


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
          days: localStorage.getItem("days"),
          city: localStorage.getItem("city"),
          dishes:null,
          timing:localStorage.getItem("timing"),
          loading: false,
          output: null,
          selectedFile : null
          
        }
    
        this.handleChange = this.handleChange.bind(this);
      }
      sendRestAPI = (data) => {
        axios.post('http://localhost:5000/editrestaurant', data)
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
                  localStorage.setItem("city",res.data.city);
                  localStorage.setItem("days",res.data.days);
                  const {history} = this.props;
                  history.push('/restaurantprofile'); 
                   //window.location.href='/RestaurantProfile';
                }
                
            }).catch(
                (error) => {
                  console.log(error);
                }
            );
    }
      handleSubmit = (e) => {
        e.preventDefault();

        const restuarantData = {
            restaurantid: localStorage.getItem("restaurantid"),
            restaurantname: this.state.restaurantname,
            email: this.state.email,
            password: this.state.password,
            zipcode: this.state.zipcode,
            phone:this.state.phone,
            description:this.state.description,
            timing:this.state.timing,
            city:this.state.city,
            deliverytype:this.state.deliverytype,
            days:this.state.days
        }
       
        this.sendRestAPI(restuarantData);
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
   
         uploadFile = async (e) => {
          const formData = new FormData();
          formData.append("file", this.state.file,this.state.fileName);
          formData.append("restaurantid", this.state.restaurantid);
          console.log(formData);
          try {
            const res = await axios.post(
              "http://localhost:5000/upload",
              formData
            );
            console.log(res);
          } catch (ex) {
            console.log(ex);
          }
        };
        
     
        // onChangeHandler=event=>{
        //   this.setState({
        //     selectedFile: event.target.files[0],
        //     loaded: 0,
        //   })
          
         
        // }
      //   onClickHandler = (e) => {
      //     e.preventDefault();
      //     const data = new FormData(); 
      //     data.append('file', this.state.selectedFile);
      //     console.log(data)
      //     console.log("****")
      //     console.log(this.state.selectedFile)
      //     axios.post("http://localhost:5000/upload", data) 
      //   .then(res => { // then print response status
      //     console.log(res)
         
      //   })
      // }

    render(){
      //const imgLink = `http://localhost:5000/${profileData.picture}`;
    return (

      <div className="container">
      <div className="login-form">
        <div className="main-div">
          <div className="panel">
            <h2>Restuarant Profile</h2>

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
          Phone: <Input type="text" className="form-control" name="phone" defaultValue={this.state.phone} onChange={this.handleChange} ></Input>
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
            <select className="form-control" name="deliverytype" value={this.state.value} onChange={this.handleChange}>
              <option value="">Select delivery type</option>
              <option value="pickup">Pick Up</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>
          <div className="form-group">
          City: <Input type="text"  className="form-control" name="city" defaultValue={this.state.city} onChange={this.handleChange} ></Input>
          </div>
          <div className="form-group">
          Location Zip Code: <Input type="text" name="zipcode" defaultValue={this.state.zipcode} onChange={this.handleChange} ></Input>
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