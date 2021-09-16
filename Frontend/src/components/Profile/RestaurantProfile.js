// import React, { Component } from 'react';

import React, {Component} from 'react';
// import { Redirect } from 'react-router';
// import cookie from 'react-cookies';
import axios from 'axios';
import { Button } from 'reactstrap';


class RestaurantProfile extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          restaurantname: localStorage.getItem("restaurantname"),
          zipcode:localStorage.getItem("zipcode"),
          description:localStorage.getItem("description"),
          email:localStorage.getItem("email"),
          phone: localStorage.getItem("phone"),
          cuisine: null,
          dishes:null,
          timing:localStorage.getItem("timing"),
          loading: false,
          output: null,
          selectedFile : null
        }
      
        
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
            email: this.state.email,
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

       fileSelectedHandler = event => {
        this.setState({ selectedFile: event.target.files[0]})
       
       } 

       fileUploadHandler = (e) => {
        e.preventDefault();
          const fd = new FormData();
          fd.append('image',this.state.selectedFile,this.state.selectedFile.name);  
          
          // axios.post('http://localhost:5000/uploadimage', fd)
          // .then(res => {
              // if(res.data.message){
              //     this.setState({message:res.data.message})

              // }else{
              //     this.setState({ message: res.data.username }) 
              //     this.setState({ username: res.data.username })
              // }
              
          // }).catch(
          //     (error) => {
          //       console.log(error);
          //     }
          // );
       }
    render(){

    return (
        <div class="container">
            <form >
            <h1>Restuarant Profile</h1>
            <div className='form-control'>
            Restaurant Name: <input type="text" name="restaurantname" value={this.state.restaurantname} onChange={this.handleChange} ></input><br/>
            Description : <textarea type="text" name="description" defaultValue={this.state.description} onChange={this.handleChange}/>
          
            <br/>
            Email:<input type="text" name="email" value= {this.state.email} onChange={this.handleChange} disabled/>
            <br/>
           
            Phone: <input type="text" name="phone" defaultValue={this.state.phone} onChange={this.handleChange} ></input><br/>
            Timings :  <br/>
            <textarea type="text" name="timing" defaultValue={this.state.timing} onChange={this.handleChange}  />
            <br/>
            
            Location Zip Code: <input type="text" name="zipcode" defaultValue={this.state.zipcode} onChange={this.handleChange} ></input><br/>
        
            <input class="filefolder" type="file" onChange={this.fileSelectedHandler}/>
            <button onClick = {this.fileUploadHandler} >Add new Dish</button>
            <br/>
            <Button onClick = {this.handleSubmit}>Update Profile</Button>
            </div>
            </form>
        </div>
    )
    }
   
}
 
export default RestaurantProfile;