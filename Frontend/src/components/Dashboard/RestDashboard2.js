import React, {Component} from 'react';
import { Button } from 'reactstrap';
import {Card} from 'react-bootstrap';
import axios from 'axios';
//import { Link } from 'react-router-dom';

import backendServer from "../../webConfig";
class RestDashboard extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          zipcode:null,
          restid:null,
          query : null,
          dish:null,
          status:"notdone",
          restaurants :[],
          restaurants1 :[]
        }
       
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
    goback = (e) => {
      e.preventDefault();
      const {history} = this.props;
      history.push('/customerhome'); 
    }  
    render(){
      var beforeSearch = null;
        beforeSearch =  
        <div className="card-list">
        {this.state.restaurants.map(restaurant=>
          <div >
         <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>{restaurant.username}</Card.Title>
    <Card.Text>
     {restaurant.description}
    </Card.Text>
    {/* <Button variant="primary">Go somewhere</Button> */}
  </Card.Body>
</Card>
                 
                    
              </div>
      
        )}
        </div>
     

    return (
       
        <div class="container">
             <h1>List of All Restaurants</h1>
        
           
            <Button onClick = {this.goback}>Go To Home Page</Button>

            {beforeSearch}
   
        </div>
    )
    }
   
}
 
export default RestDashboard;