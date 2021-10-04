import React, {Component} from 'react';
import { Button } from 'reactstrap';
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import backendServer from "../../webConfig";
import {BiCartAlt} from 'react-icons/bi';
import AddToCart from './AddToCart';

class SingleRestDashboard extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          restaurantid : localStorage.getItem("restid"),
          restaurantname:null,
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
            //console.log(response.data);
            this.setState({
              restaurants : this.state.restaurants.concat(response.data) 
            });
            this.setState({
              restaurantname : response.data[0].username
            });
            
        });    

    }

      goback = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/restdashboard'); 
      }
    
     addtocart = (restid,dishid,dishname,dishprice) =>{
       const cartvalue = {
         customerid : localStorage.getItem("userid"),
         restaurantid : restid,
         dishid:dishid,
         dishname:dishname,
         dishprice:dishprice   
       }
       this.addToCart(cartvalue);
     }

    addToCart = (data) => {
      axios.defaults.withCredentials = true;
      axios.post(`${backendServer}/addtocarttable`, data).then((res) => {
          console.log("in add to cart");
          //console.log(res.data);
          // if (res.data.message) {
          //   this.setState({ message: res.data.message });
          // } else {
          //   this.setState({
          //     restaurants1: res.data,
          //   });
          // }

          // console.log("Status Code : ", res.status);
          // if (res.status === 200) {
          //   this.setState({ authFlag: true });
          // } else {
          //   this.setState({ authFlag: false });
          // }
      });
	};
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
           	<ReactTooltip />
            <Button className="cardbtn2" data-tip="Add To Cart"
            onClick={() => {
												this.addtocart(this.state.restaurantid,dish.dishid,dish.dishname,dish.price);
											}}>
              <BiCartAlt/></Button>
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
           <AddToCart/>
            <h1>{this.state.restaurantname}</h1>
           
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