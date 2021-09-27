import React, {Component} from 'react';

// import cookie from 'react-cookies';
import { Button } from 'reactstrap';

//import 'bootstrap/dist/css/bootstrap.css';
class CustomerHome extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
            username: localStorage.getItem("username"),
            email:localStorage.getItem("email"),
            phone: localStorage.getItem("phone"),
            dob:localStorage.getItem("dob"),
            state:localStorage.getItem("state"),
            city:localStorage.getItem("city"),
            country:localStorage.getItem("country"),
            nickname:localStorage.getItem("nickname"),
            about:localStorage.getItem("about"),
            favourites:null,
            loading: false,
            output: null
          }
      }
      // handleSubmit = (e) => {
      //   e.preventDefault();
      //   window.location.href='/RestaurantProfile';
      // }
      // showMenu = (e) =>{
      //     e.preventDefault();
      //   window.location.href='/RestaurantProfile';
      // }
      profile = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/customerprofile'); 
      }
      findfood = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/restdashboard'); 
      }
      orders = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/restaurantprofile'); 
      }
      
      logout = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/login'); 
      }
    render(){

    return (
      
        <div class="container">
            
            <form>
            <h1>Welcome {this.state.username} !</h1>
            <div className='form-buttons'>
          
            <Button className="btn" onClick={this.profile}>Profile</Button>

            <Button className="btn" onClick={this.findfood}>Find Food</Button>

          
            <Button className="btn" onClick={this.orders}>Orders</Button>

            <Button className="btn" onClick={this.logout}>Logout</Button>
            </div>
            </form>
        </div>
    )
    }
   
}
 
export default CustomerHome;