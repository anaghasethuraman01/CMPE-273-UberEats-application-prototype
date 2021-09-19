import React, {Component} from 'react';
import axios from 'axios';
// import cookie from 'react-cookies';
import { Button } from 'reactstrap';

class RestaurantMenu extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          restaurantid:null,
          dishname:null,
          ingrediants:null,
          price:null,
          description:null,
          category:null
        }
      }

      sendDishAPI = (data) => {
        // console.log("data"+data)
          axios.post('http://localhost:5000/restaurantdish', data)
              .then(res => {
                  if(res.data.message){
                      this.setState({message:res.data.message})
  
                  }else{
                      this.setState({ message: res.data.username }) 
                      this.setState({ username: res.data.username })
                  }
                  
              }).catch(
                  (error) => {
                    console.log(error);
                  }
                  );
    }
    handleChange = (e) => {
      e.preventDefault();
      this.setState({ [e.target.name]: e.target.value });
      console.log(this.state);
  } 
      handleSubmit = (e) => {
        e.preventDefault();
        const dishData = {
            restaurantid:localStorage.getItem("restaurantid"),
            dishname:this.state.dishname,
            ingrediants:this.state.ingrediants,
            price:this.state.price,
            description:this.state.description,
            category:this.state.category
        }
      console.log(dishData);
        this.sendDishAPI(dishData);
      }
      showMenu = (e) =>{
        e.preventDefault();
        window.location.href='/RestaurantMenu';
      }
    render(){

    return (
      
        <div class="container">
            
            <form onSubmit={this.handleSubmit}>
            <h1>Dish Menu</h1>
            <div className='form-control'>
           
            Dish Name: <input type="text" name="dishname" defaultValue={this.state.dishname} onChange={this.handleChange} required></input><br/>
            Ingrediants: <input type="text" name="ingrediants" defaultValue={this.state.ingrediants} onChange={this.handleChange} required></input><br/>
            Price: <input type="text" name="price" defaultValue={this.state.price} onChange={this.handleChange} required></input><br/>
            Description: <input type="text" name="description" defaultValue={this.state.description} onChange={this.handleChange} required></input><br/>
            Category: 
            <select name="category" value={this.state.value} onChange={this.handleChange}>
                        <option value="">Category</option>
                        <option value="appetizer">Appetizer</option>
                        <option value="salads">Salads</option>
                        <option value="maincourse">Main Course</option>
                        <option value="desserts">Desserts</option>
                        <option value="beverages">Beverages</option>
            </select>
            <br/>
            <Button >Add new Dish</Button>
            <br/>
            <Button >View your Dishes</Button>
            </div>
            </form>
           
    
        </div>
    )
    }
   
}
 
export default RestaurantMenu;