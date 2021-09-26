import React, {Component} from 'react';

// import cookie from 'react-cookies';
import { Button} from 'reactstrap';

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
          output: null,
          file:null,
          fileName:null
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
      

      <div className="container">
      <div className="login-form">
        <div className="main-div">
          <div className="panel">
          <h1>Welcome to {this.state.restaurantname}</h1>
          </div>
          <div className="form-group">

          <h4>Description : {this.state.description}</h4>
          
          </div>
          
          <div className="form-group">
          <h4>Email: {this.state.email}</h4>
          </div>
          <div className="form-group">
            <h4> Phone: {this.state.phone}</h4>
          
          </div>
          <div className="form-group">
            <h4>  Timings :  {this.state.timing}</h4>
          
          </div>
          <div className="form-group">
            <h4>  Days: {this.state.days}</h4>
          
          </div>
          <div className="form-group">
            <h4> Delivery Type: {this.state.deliverytype}</h4>
          
          </div>
          <div className="form-group">
            <h4> City: {this.state.city}</h4>
          
          </div>
          <div className="form-group">
            <h4> Location Zip Code: {this.state.zipcode}</h4>
          
          </div>
         
          <Button onClick = {this.handleSubmit} >Update Profile</Button>

          <Button onClick = {this.goback}>Back</Button>
        </div>
      </div>
    </div>
    )
    }
   
}
 
export default RestaurantProfile;