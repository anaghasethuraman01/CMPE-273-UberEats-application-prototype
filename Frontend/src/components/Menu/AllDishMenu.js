import React, {Component} from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import DishInfo from './DishInfo';
import backendServer from "../../webConfig";
class AllDishMenu extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          zipcode:null,
          restaurantid:localStorage.getItem("restaurantid"),
          query : null,
          dish:null,
          status:"notdone",
          dishes :[],
          restaurants1 :[]
        }
       
       
      }
 
      componentDidMount(){
        const restaurantid = {
          restaurantid: this.state.restaurantid
      };
        axios.post(`${backendServer}/getmenurestaurant`,restaurantid)
                .then((response) => {
                  console.log(response.data)
                  this.setState({status: "notdone"})
                  //console.log(response.data);
                //update the state with the response data
                this.setState({
                  dishes : this.state.dishes.concat(response.data) 
                });
            });
    }
 
      goback = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/restauranthome'); 
      }
     
     
    render(){
      var beforeSearch = null;
     
        beforeSearch =
            
        <div className='card-list'>
        {this.state.dishes.filter(dish => dish.dishname).map(dish=>
        
         <DishInfo dish = {dish} key={ dish.dishid }/>
        )
        }
      </div>
      
 
    return (
       
        <div class="container">
             <h1>Dishes</h1>
            <form >
           
            <Button onClick = {this.goback}>Go To Home Page</Button>
            </form>

            {beforeSearch}
       
            
        </div>
    )
    }
   
}
 
export default AllDishMenu;