// import React, { Component } from 'react';

import React, {Component} from 'react';
// import { Redirect } from 'react-router';
// import cookie from 'react-cookies';
import axios from 'axios';
import { Button } from 'reactstrap';


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
                   window.location.href='/RestaurantProfile';
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

    return (
        <div className="container">
            <form >
            <h1>Restuarant Profile</h1>
            <div className='form-control'>
            Restaurant Name: <input type="text" name="restaurantname" value={this.state.restaurantname} onChange={this.handleChange} ></input><br/>
            Description : <textarea type="text" name="description" defaultValue={this.state.description} onChange={this.handleChange}/>
          
            <br/>
            Email:<input type="text" name="email" value= {this.state.email} onChange={this.handleChange} />
            <br/>
           
            Phone: <input type="text" name="phone" defaultValue={this.state.phone} onChange={this.handleChange} ></input><br/>
            Timings :  <br/>
            <textarea type="text" name="timing" defaultValue={this.state.timing} onChange={this.handleChange}  />
            <br/>
            Days :  <br/>
            <textarea type="text" name="days" defaultValue={this.state.days} onChange={this.handleChange}  />
            <br/>
            Mode of Delivery :
            <select name="deliverytype" value={this.state.value} onChange={this.handleChange}>
                        <option value="">Select delivery type</option>
                        <option value="pickup">Pick Up</option>
                        <option value="delivery">Delivery</option>
            </select>
            City :  <br/>
            <textarea type="text" name="city" defaultValue={this.state.city} onChange={this.handleChange}  />
            <br/>
            Location Zip Code: <input type="text" name="zipcode" defaultValue={this.state.zipcode} onChange={this.handleChange} ></input><br/>
            <input className="filefolder" type="file" name="file" onChange={this.onChangeHandler}/>
            
           {/* <button onClick={this.onClickHandler} >Add new Dish</button> */}
            <br/>
            <Button onClick = {this.handleSubmit}>Update Profile</Button>
            <Button onClick = {this.goback}>Back</Button>
            
            </div>
            </form>
        </div>
    )
    }
   
}
 
export default RestaurantEditProfile;