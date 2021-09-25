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
      showAll = (e) => {
        e.preventDefault();
        window.location.href='/RestDashboard';
       
        }
      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        }
    render(){
      var beforeSearch = null;
     
        beforeSearch =
            
        <div className='card-list'>
        {this.state.restaurants.filter(restaurant => restaurant.username).map(restaurant=>
        
         <DishInfo restaurant = {restaurant} key={ restaurant.restaurantid }/>
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