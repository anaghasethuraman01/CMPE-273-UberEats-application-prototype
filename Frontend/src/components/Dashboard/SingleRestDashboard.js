import React, {Component} from 'react';
import { Button } from 'reactstrap';
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import axios from 'axios';
//import { Link } from 'react-router-dom';
// import RestaurantInfo from './RestaurantInfo';
import backendServer from "../../webConfig";
class SingleRestDashboard extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          restaurantid : localStorage.getItem("restid"),
          description:null,
          restaurantname:null,
          query : null,
          dish:null,
          status:"notdone",
          dishes :[],
          restaurants:[]
        }
      
      }

      componentDidMount(){
        const restaurantid = {
          restaurantid: this.state.restaurantid
      };
        axios.post(`${backendServer}/getrestaurantdishes`,restaurantid)
                .then((response) => { 
                  
                //update the state with the response data
                this.setState({
                  dishes : this.state.dishes.concat(response.data) 
                });
               // console.log(this.state.dishes);
            });

            axios.post(`${backendServer}/getrestaurantdetails`,restaurantid)
            .then((response) => { 
            //update the state with the response data
            console.log(response.data);
            this.setState({
              restaurants : this.state.restaurants.concat(response.data) 
            });
            //console.log(this.state.restaurant);
        });    

    }

      goback = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/restdashboard'); 
      }
    
     addtocart = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/addtocart'); 
     }
    render(){
      
      var restaurantdetails = null;
        var searchresults = null;

        searchresults = 
        <div className='card-list'>
        {this.state.dishes.map(dish=>
         <div >
          <Card style={{ width: '18rem' }}>
          <Card.Img style={{ width: '18rem' }} variant="top" src={`${backendServer}/${dish.dishimage}`} />
          <Card.Body>
          <Card.Title>{dish.dishname}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Contains : {dish.ingrediants} </ListGroupItem>
            <ListGroupItem>Price :  $ {dish.price}</ListGroupItem>
              <Button onClick={this.addtocart}>Add to cart </Button>
          </ListGroup>
          </Card>                           
          </div>
       
       )
       }

     </div>
        
        restaurantdetails = 
        <div>
        {this.state.restaurants.map(restaurant=>
        <p>{restaurant.description}</p>

       )
       }
        </div>
   
    return (
       
        <div class="container">
            <h1>Menu</h1>
           
            {restaurantdetails}
            <form>
            <Button onClick = {this.goback}>Go To Restaurants Page</Button>
        
            </form>
            {searchresults}
        </div>
    )
    }
   
}
 
export default SingleRestDashboard;