import React, {Component} from 'react';
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap';
// import cookie from 'react-cookies';
import { Button } from 'reactstrap';
import axios from 'axios';
import backendServer from "../../webConfig";
//import 'bootstrap/dist/css/bootstrap.css';
class RestaurantHome extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          restaurantid : localStorage.getItem("restaurantid"),
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
          restaurantdishes:[],
          statusmsg:null
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
        history.push('/restaurantprofile'); 
      }
      menu = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/alldishmenu'); 
      }
      orders = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/orderspage'); 
      }
      addnewdish = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/addrestaurantmenu'); 
      }
      logout = e => {
        e.preventDefault();
        window.localStorage.clear();
        const {history} = this.props;
        history.push('/login'); 
      }
      componentDidMount(){
        const data = {
          restaurantid : this.state.restaurantid
        }
         axios.post(`${backendServer}/getrestaurantwithid`,data).then((response) => {
          //  console.log(response.data.length)
           if(response.data.length > 0){
             this.setState({
               statusmsg: "dishesfound"
             })
           }
           this.setState({
          restaurantdishes: this.state.restaurantdishes.concat(response.data),
            });   
            // console.log(this.state.statusmsg)
            // console.log(this.state.restaurantdishes)
         })
          
        // 

      }
    render(){
      var disheslist = null;
      if(this.state.statusmsg == "dishesfound"){
        
        disheslist = (
        <div className='card-list'>
        {this.state.restaurantdishes.filter(dish => dish.dishname).map(dish=>
        
          <div >
          <Card >
          <Card.Img style={{ width: '18rem' }} variant="top" src={`${backendServer}/${dish.dishimage}`} />
          <Card.Body>
          <Card.Title>{dish.dishname}</Card.Title>
          <ListGroup className="list-group-flush">
            <ListGroupItem> ${dish.price} </ListGroupItem>
            <ListGroupItem> {dish.category}</ListGroupItem>
          </ListGroup>
          
          </Card.Body>
          </Card>                           
        </div>
        
        )
      }
      </div>
        )
        }

    return (
      
        <div class="container">
            
            <form>
            <h1>Welcome {this.state.restaurantname} !</h1>
            <div className='form-buttons'>
          
            <Button className="btn" onClick={this.profile}>Profile</Button>

            <Button className="btn" onClick={this.menu}>Menu</Button>

            <Button className="btn" onClick={this.addnewdish}>Add New Dish</Button>

            <Button className="btn" onClick={this.orders}>Orders</Button>
            <Button className="btn-logout" onClick={this.logout}>Logout</Button>
            </div>
            {disheslist}
            </form>
        </div>
    )
    }
   
}
 
export default RestaurantHome;