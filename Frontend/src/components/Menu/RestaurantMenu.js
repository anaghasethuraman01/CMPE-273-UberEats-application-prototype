import React, {Component} from 'react';
import axios from 'axios';
// import cookie from 'react-cookies';
import { Button } from 'reactstrap';
import backendServer from "../../webConfig";

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
        localStorage.setItem("dishname",data.dishname);
          axios.post(`${backendServer}/restaurantdish`, data)
              .then(res => {
                  if(res.data.message){
                      this.setState({message:res.data.message})
  
                  }else{
                   
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
    
        this.sendDishAPI(dishData);
      }
      goback = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/restauranthome'); 
      }
      showMenu = (e) =>{
        e.preventDefault();
        window.location.href='/RestaurantMenu';
      }

      saveFile = (e) => {
        e.preventDefault();
        this.setState({file:e.target.files[0]});
        this.setState({fileName:e.target.files[0].name});
        
      };
      uploadFile = (e) => {
        e.preventDefault();
        console.log(localStorage.getItem("restaurantid"));
        const formData = new FormData();
        formData.append("file", this.state.file,this.state.fileName);
        formData.append("restaurantid", localStorage.getItem("restaurantid"));
        formData.append("dishname",localStorage.getItem("dishname"))
       // console.log(customerData);
       this.sendImageAPI(formData);        
      }

      sendImageAPI = (data) => {
        axios.post( `${backendServer}/dishimageupload`, data)
            .then(res => {
            console.log(res.data);
              //  this.setState({profilepic:res.data});
              // localStorage.setItem("profilepic",res.data);
             // console.log(this.state.profilepic);
            })
          }
    render(){

    return (
      
        <div class="container">
            
            <form >
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
            <Button onClick={this.handleSubmit}>Add new Dish</Button>
            <br/>
            <br/>
            <input className="filefolder" type="file" onChange={this.saveFile} required/>
            <Button onClick={this.uploadFile}>Upload Dish Image</Button>  <br/> 
            
          

            <Button onClick = {this.goback}>Back</Button>
            </div>
            </form>
           
    
        </div>
    )
    }
   
}
 
export default RestaurantMenu;