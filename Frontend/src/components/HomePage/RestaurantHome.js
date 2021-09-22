import React, {Component} from 'react';

// import cookie from 'react-cookies';
import { Button } from 'reactstrap';

//import 'bootstrap/dist/css/bootstrap.css';
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
          city:localStorage.getItem("city"),
          deliverytype: localStorage.getItem("deliverytype"),
          days:localStorage.getItem("days"),
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
      profile = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/restaurantprofile'); 
      }
      menu = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/restaurantmenu'); 
      }
      orders = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/restaurantprofile'); 
      }
      addnewdish = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/restaurantmenu'); 
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
            <h1>Welcome {this.state.restaurantname} !</h1>
            <div className='form-buttons'>
          
            <Button className="btn" onClick={this.profile}>Profile</Button>

            <Button className="btn" onClick={this.menu}>Menu</Button>

            <Button className="btn" onClick={this.addnewdish}>Add New Dish</Button>

            <Button className="btn" onClick={this.orders}>Orders</Button>
            <Button className="btn" onClick={this.logout}>Logout</Button>
            </div>
            </form>
        </div>
    )
    }
   
}
 
export default RestaurantHome;