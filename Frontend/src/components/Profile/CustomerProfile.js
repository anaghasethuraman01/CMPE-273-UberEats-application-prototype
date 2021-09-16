// import React, { Component } from 'react';

import React, {Component} from 'react';
// import { Redirect } from 'react-router';
// import cookie from 'react-cookies';
import axios from 'axios';
import { Button } from 'reactstrap';


class CustomerProfile extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          restaurantname: null,
          zipcode:null,
          description:null,
          email:null,
          phone: null,
          cuisine: null,
          dishes:null,
          timing:null,
          loading: false,
          output: null
        }
        this.state.email = localStorage.getItem("email");
        this.state.username = localStorage.getItem("username");
        //this.handleChange = this.handleChange.bind(this);
      }
      sendRestAPI = (data) => {
        axios.post('http://localhost:5000/editrestuarant', data)
            .then(res => {
                if(res.data.message){
                    this.setState({message:res.data.message})

                }else{
                    this.setState({ message: res.data.username }) 
                    this.setState({ username: res.data.username })
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
            restaurantname: this.state.restaurantname,
            email: localStorage.getItem("email"),
            password: this.state.password,
            zipcode: this.state.zipcode,
            phone:this.state.phone,
            description:this.state.description,
            timing:this.state.timing
        }
        console.log(restuarantData);
        this.sendRestAPI(restuarantData);
      }
      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        }
    render(){

    return (
        <div class="container">
            <form onSubmit={this.handleSubmit}>
            <h1>Customer Profile</h1>
            <div className='form-control'>
           
            Contact :  {this.state.username}<br/>
            <br/>
            Email: {this.state.email}
            <br/>
            <br/>
            Phone: <input type="text" name="phone" defaultValue={this.state.phone} onChange={this.handleChange} required></input><br/>
          
            <br/>
            Location Zip Code: <input type="text" name="zipcode" defaultValue={this.state.zipcode} onChange={this.handleChange} required></input><br/>
            <Button>Add new Dish</Button>
            <br/>
            <Button>Update Profile</Button>
            </div>
            </form>
        </div>
    )
    }
   
}
 
export default CustomerProfile;