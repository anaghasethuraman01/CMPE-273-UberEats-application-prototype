import React, {Component} from 'react';
import axios from 'axios';
// import cookie from 'react-cookies';
import { Button, Input } from 'reactstrap';
import backendServer from "../../webConfig";

class AddRestaurantMenu extends Component {
    
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
      // showMenu = (e) =>{
      //   e.preventDefault();
      //   window.location.href='/AddRestaurantMenu';
      // }

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

      <div className="container">
      <div className="login-form">
        <div className="main-div">
          <div className="panel">
          <h1>Dish Details</h1>

          </div>

          <div className="form-group">
          Dish Name: <Input className="form-control" type="text" name="dishname" defaultValue={this.state.dishname} onChange={this.handleChange} required/>
          
          </div>
          <div className="form-group">

          Ingrediants: <Input className="form-control" type="text" name="ingrediants" defaultValue={this.state.ingrediants} onChange={this.handleChange} required/>
           
          </div>
          <div className="form-group">
          
          Price: <Input className="form-control" type="text" name="price" defaultValue={this.state.price} onChange={this.handleChange} required/>
       
          </div>
          <div className="form-group">
          Description: <Input className="form-control" type="text" name="description" defaultValue={this.state.description} onChange={this.handleChange} required/>
          </div>
          <div className="form-group">
          Category: 
             <select className="form-control" name="category" value={this.state.value} onChange={this.handleChange}>
                         <option value="">Category</option>
                       <option value="Appetizer">Appetizer</option>
                      <option value="salads">Salads</option>
                        <option value="Main Course">Main Course</option>
                  <option value="Desserts">Desserts</option>
                        <option value="Beverages">Beverages</option>
            </select>
          </div>
          <div className="form-group">
          <Button onClick={this.handleSubmit}>Add new Dish</Button>
          </div>
          <div className="form-group">
          <Input className="filefolder" type="file" onChange={this.saveFile} required/>
            <Button onClick={this.uploadFile}>Upload Dish Image</Button>
          </div>
          <Button onClick = {this.goback}>Back</Button>
        </div>
      </div>
    </div>

    )
    }
   
}
 
export default AddRestaurantMenu;