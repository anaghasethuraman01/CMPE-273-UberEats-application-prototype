import React, {Component} from 'react';
import {Card, ListGroup, ListGroupItem,Modal} from 'react-bootstrap';
// import cookie from 'react-cookies';
import { Button ,Input} from 'reactstrap';
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
          statusmsg:null,
          show:false,
          selectedDish:[]
        }
      }
      handleModalClose(){
        this.setState({show:!this.state.show}) 
      }
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
          
         })

      }
      editdish = (dishObj) => {
        localStorage.setItem("SelectedDish",JSON.stringify(dishObj));
        const {history} = this.props;
        history.push('/editdishpage'); 
      }
    render(){

      var disheslist = null;
      if(this.state.statusmsg == "dishesfound"){
        
        disheslist = (
        <div className='card-list'>
        {this.state.restaurantdishes.map(dish=>
        
          <div >
          <Card style={{ width: "18rem" }}>
          <Card.Img style={{ width: "18rem",height:"13rem" }} variant="top" src={`${backendServer}/${dish.dishimage}`} />
          <Card.Body>
          <Card.Title>{dish.dishname}</Card.Title>
          <ListGroup className="list-group-flush">
            <ListGroupItem> ${dish.price} </ListGroupItem>
            <ListGroupItem> {dish.category}</ListGroupItem>
          </ListGroup> 
          <Button
          onClick={() => {
            this.editdish(dish);
            }}>Edit Dish
            </Button>
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

            {/* <Button className="btn" onClick={this.menu}>Menu</Button> */}

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