import React, {Component} from 'react';

// import cookie from 'react-cookies';
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
          timing:localStorage.getItem("timing"),
          city:localStorage.getItem("city"),
          deliverytype: localStorage.getItem("deliverytype"),
          days:localStorage.getItem("days"),
          loading: false,
          output: null
        }
      }
      handleSubmit = (e) => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/restauranteditprofile'); 
      }
      goback = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/restauranthome'); 
      }
    render(){

    return (
      
        <div class="container">
            
            <form >
            <h1>Welcome to {this.state.restaurantname}</h1>
            <div className='form-control'>
          
            Description : {this.state.description}
            <br/>
            <br/>
            Contact Details:  <br/>
            <br/>
            Email: {this.state.email}
            <br/>
            <br/>
            Phone: {this.state.phone}
            <br/>
            <br/>
            Timings :  {this.state.timing} <br/>
            <br/>
            Days: {this.state.days}
            <br/>
            <br/>
            Delivery Type: {this.state.deliverytype}
            <br/>
            <br/>
            City: {this.state.city}
            <br/>
            <br/>
            Location Zip Code: {this.state.zipcode}
            <br/>
            <br/>
            <Button onClick = {this.handleSubmit} >Update Profile</Button>
            <br/>
            <Button onClick = {this.goback}>Back</Button>
            </div>
            </form>
        </div>
    )
    }
   
}
 
export default RestaurantProfile;