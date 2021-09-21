import React, {Component} from 'react';

// import cookie from 'react-cookies';
import { Button } from 'reactstrap';

class RestaurantHome extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          restaurantname: localStorage.getItem("restaurantname"),
          zipcode:localStorage.getItem("zipcode"),
          description:localStorage.getItem("description"),
          email:localStorage.getItem("email"),
          phone: localStorage.getItem("phone"),
          timing:localStorage.getItem("timing"),
          loading: false,
          output: null
        }
      }
      handleSubmit = (e) => {
        e.preventDefault();
        window.location.href='/RestaurantProfile';
      }
      showMenu = (e) =>{
          e.preventDefault();
        window.location.href='/RestaurantProfile';
      }
    render(){

    return (
      
        <div class="container">
            
            <form onSubmit={this.handleSubmit}>
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
            Location Zip Code: {this.state.zipcode}
            <br/>
            <br/>
            <Button>Update Profile</Button>
            <br/>
            <Button onClick = {this.showMenu}>Dishes Menu</Button>
            </div>
            </form>
        </div>
    )
    }
   
}
 
export default RestaurantHome;