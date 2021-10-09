import React, {Component} from 'react';
import { Button } from 'reactstrap';
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import axios from 'axios';
import {Modal} from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import backendServer from "../../webConfig";
import {BiCartAlt} from 'react-icons/bi';


class SingleRestDashboard extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          show: true,
          restname:localStorage.getItem("restname"),
          restaurantid : localStorage.getItem("restid"),
          restaurantname:null,
          description:null,
          restaurantname:null,
          query : null,
          dish:null,
          status:"notdone",
          dishes :[],
          restaurants:[],
          message:null,
          newrestid:null,
          customerid : null,
          dishid:null,
          dishname:null,
          dishprice:null,
          quantity:1,
          deliverytype:null,
          quantityprice:null,
          
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
               //console.log(this.state.dishes);
            });

            axios.post(`${backendServer}/getrestaurantdetails`,restaurantid)
            .then((response) => { 
            //update the state with the response data
            //console.log(response.data);
            this.setState({
              restaurants : this.state.restaurants.concat(response.data) 
            });
            //  console.log("***");
            //console.log(typeof(this.state.restaurants));
            //   console.log("***");
            this.setState({
              restaurantname : response.data[0].username
            });
            this.setState({
              deliverytype : response.data[0].deliverytype
            });
            localStorage.setItem("DeliveryType",this.state.deliverytype);
            
        });    

    }

  handleCheckout(){
      //console.log(this.props);
      const {history} = this.props;
		  history.push("/checkout");
   }
      goback = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/restdashboard'); 
      }

      gobackFav = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/favourites'); 
      }
    
     addtocart = (restid,dishid,dishname,dishprice) =>{
       const cartvalue = {
         customerid : localStorage.getItem("userid"),
         restaurantid : restid,
         dishid:dishid,
         dishname:dishname,
         dishprice:dishprice,
         quantity:this.state.quantity,
         quantityprice : (dishprice*this.state.quantity) 
       }
       //console.log(cartvalue)
       this.addToCart(cartvalue);
     }
        handleModalClose(){
        this.setState({show:!this.state.show}) 
         }
    addToCart = (data) => {
       
       localStorage.setItem("newrestid",data.restaurantid);
       localStorage.setItem("customerid",data.customerid);
       localStorage.setItem("dishid",data.dishid);
       localStorage.setItem("dishname",data.dishname);
       localStorage.setItem("dishprice",data.dishprice);
       localStorage.setItem("quantity",data.quantity);
      axios.defaults.withCredentials = true;
      axios.post(`${backendServer}/addtocarttable`, data).then((res) => {
          console.log("in add to cart");
          console.log(res.data);
          this.setState({ message: res.data});
          this.setState({show:"true"})
          console.log("Status Code : ", res.status);
          if (res.status === 200) {
            this.setState({ authFlag: true });
          } else {
            this.setState({ authFlag: false });
          }
      });
	};
  handleNewOrder = () => {
    const data = {
       customerid : localStorage.getItem("customerid"),
         restaurantid : localStorage.getItem("newrestid"),
         dishid:localStorage.getItem("dishid"),
         dishname:localStorage.getItem("dishname"),
         dishprice:localStorage.getItem("dishprice"),   
    }
    localStorage.setItem("restname",this.state.restaurantname);
      axios.defaults.withCredentials = true;
      axios.post(`${backendServer}/handleneworder`, data).then((res) => {
          // console.log("in add to cart");
          // console.log(res.data);
          // this.setState({ message: res.data});
          // this.setState({show:"true"})
          // console.log("Status Code : ", res.status);
          if (res.status === 200) {
            this.setState({ authFlag: true });
          } else {
            this.setState({ authFlag: false });
          }
      });
      this.setState({show:!this.state.show}) 
	};
    render(){
      
      var restaurantdetails = null;
        var searchresults = null;
      var messagebox = null;
      if(this.state.message){
      
        messagebox= (
          <div>
  
      <Modal size="md-down"
          aria-labelledby="contained-modal-title-vcenter"
          centered
           show={this.state.show} onHide={()=>this.handleModalClose()} >
             <Modal.Header closeButton>Create New Order</Modal.Header>
             <Modal.Body>
             Your Order contain items from another restaurant.Create a new
             order to add items from {this.state.restaurantname}
             </Modal.Body>
             <Modal.Footer>
               <Button 
               onClick={() => {
												this.handleNewOrder();
											}}>
              New Order</Button>
             </Modal.Footer>
           </Modal>
          </div>
        )
      }
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
          
            <h1>{this.state.restaurantname}</h1>
            
          {messagebox}
            {restaurantdetails}
            <form>
            <Button onClick = {this.goback}>Search Restaurants</Button>
            <Button onClick = {this.gobackFav}>Favourites</Button>
            </form>
            {searchresults}




        </div>
    )
    }
   
}
 
export default SingleRestDashboard;