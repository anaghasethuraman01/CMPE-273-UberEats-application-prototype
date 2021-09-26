import React, {Component} from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import RestaurantInfo from './RestaurantInfo';
import backendServer from "../../webConfig";
class RestDashboard extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          zipcode:null,
          restaurantname:null,
          query : null,
          dish:null,
          status:"notdone",
          restaurants :[],
          restaurants1 :[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        axios.get(`${backendServer}/getrestaurant`)
                .then((response) => {
                  this.setState({status: "notdone"})
                  //console.log(response.data);
                //update the state with the response data
                this.setState({
                  restaurants : this.state.restaurants.concat(response.data) 
                });
            });
    }
    searchRestaurantAPI = (data) => {
      this.setState({status: "done"})
      axios.defaults.withCredentials = true;
      axios.post(`${backendServer}/restsearch`, data)
          .then(res => {   
              console.log("in rest search")
               console.log(res.data)
               if(res.data.message){
                  this.setState({ message: res.data.message })
              }else{
                
                this.setState({
                  restaurants1 : res.data
                });
                  
              }
              
              console.log("Status Code : ", res.status);
              if (res.status === 200) {
                  this.setState({ authFlag: true })
              } else {
                  this.setState({ authFlag: false })
              }
          });
  }


  searchDishAPI = (data) => {
    this.setState({status: "done"})
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/restdishsearch`, data)
        .then(res => {   
            console.log("in rest search")
             console.log(res.data)
             if(res.data.message){
                this.setState({ message: res.data.message })
            }else{
              
              this.setState({
                restaurants1 : res.data
              });
                
            }
            
            console.log("Status Code : ", res.status);
            if (res.status === 200) {
                this.setState({ authFlag: true })
            } else {
                this.setState({ authFlag: false })
            }
        });
}
      handleSubmit = (e) => {
        e.preventDefault();
        const credential = {
          query: this.state.query
      }
     
      this.searchRestaurantAPI(credential);
  
      }

      handleDishSubmit = (e) => {
        e.preventDefault();
        const credential = {
          dish: this.state.dish
      }
     console.log(credential)
      this.searchDishAPI(credential);
  
      }
      goback = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/customerhome'); 
      }
    
      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        }
    render(){
      var beforeSearch = null;
      var afterSearch = null;

      if (this.state.status === "done"){
        afterSearch =
        <div className='card-list'>
        {this.state.restaurants1.filter(restaurant => restaurant.username).map(restaurant=>
        
         <RestaurantInfo restaurant = {restaurant} key={ restaurant.restaurantid }/>
        )
        }

      </div>
    }
      else{
        beforeSearch =
            
        <div className='card-list'>
        {this.state.restaurants.filter(restaurant => restaurant.username).map(restaurant=>
        
         <RestaurantInfo restaurant = {restaurant} key={ restaurant.restaurantid }/>
        )
        }
      </div>
      }
    
   
   

    return (
       
        <div class="container">
             <h1>List of All Restaurants</h1>
            <form onSubmit={this.handleSubmit}>
            <label>Search using city : </label>
            <input type = "text" name="query"
            value= {this.state.query} onChange={this.handleChange} required></input>
            <Button type="submit">Search</Button>
            </form>
            <form onSubmit={this.handleDishSubmit}>
            <label>Search using dish : </label>
            <input type = "text" name="dish"
            value= {this.state.dish} onChange={this.handleChange} required></input>
            <Button type="submit">Search</Button>
            </form>
            <form>
           
            <Button onClick = {this.goback}>Go To Home Page</Button>
            </form>

            {beforeSearch}
            {afterSearch}
            
        </div>
    )
    }
   
}
 
export default RestDashboard;