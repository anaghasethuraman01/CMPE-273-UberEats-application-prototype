import { Button } from "reactstrap";
import axios from "axios";
import React, { Component } from "react";
import { Card, ListGroup, ListGroupItem, Form } from "react-bootstrap";
//import { Link } from 'react-router-dom';
import {BiCartAlt} from 'react-icons/bi';
import {MdFavoriteBorder} from 'react-icons/md';
import {IoIosRestaurant} from 'react-icons/io';

import backendServer from "../../webConfig";
import ReactTooltip from 'react-tooltip';
class Favourites extends Component {
	constructor(props) {
		super(props);

		this.state = {
            customerid : localStorage.getItem("userid"),
			zipcode: null,
			restid: null,
			city: null,
			dish: null,
			foodtype: null,
			status: "notdone",
			deliverytype: null,
			restaurants: [],
			restaurants1: [],
            favrestaurants: [],
            favourites:null,
			//favourites : []
		};
		// this.handleChange = this.handleChange.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
        const customerid = this.state.customerid;
     
	    if(customerid){
            const val = {
                customerid:customerid
            }
     
            axios.post(`${backendServer}/getfavouriterestaurant`,val).then((response) => {
                console.log(response.data.length);
                if(response.data.length > 0){
                    this.setState({ favourites: "found" });
                }
                //update the state with the response data
                this.setState({
                favrestaurants: this.state.favrestaurants.concat(response.data),
                });
            });

        }
	}


	navigatetorestaurant = (val) => {
		console.log(val);
		//  window.location.href='/SingleRestDashboard';
		localStorage.setItem("restid", val);
		const { history } = this.props;
		console.log(history);
		history.push("/singlerestdashboard");
	};


	goback = (e) => {
		e.preventDefault();
		const { history } = this.props;
		history.push("/customerhome");
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	addToFavourites = (restid) =>{
		const customerid = localStorage.getItem("userid");	
		const favourites = {
			customerid : customerid,
			restid:restid	
			};
		this.addToFavouritesTable(favourites);	
	}
	addToFavouritesTable = (data) => {
		axios.defaults.withCredentials = true;
		axios.post(`${backendServer}/addtofavourites`, data).then((res) => {
			console.log("Status Code : ", res.status);
			if (res.status === 200) {
				this.setState({ authFlag: true });
			} else {
				this.setState({ authFlag: false });
			}
		});
	}
	render() {
		
		var favouriterest = null;
        if(this.state.favourites == "found"){
                favouriterest = ( 
                <div>
                <h1>Your Favourites</h1>
                <div className="card-list">
                
                    {this.state.favrestaurants.map((restaurant) => (
                    <div>
                        <Card style={{ width: "18rem" }}>
                        <Card.Img
                            style={{ width: "18rem" }}
                            variant="top"
                            src={`${backendServer}/${restaurant.profilepic}`}
                        />
                        <Card.Body>
                            <Card.Title>{restaurant.username}</Card.Title>
                            <ListGroup className="list-group-flush">
                            <ListGroupItem> {restaurant.phone} </ListGroupItem>
                            <ListGroupItem> {restaurant.email}</ListGroupItem>
                            <div className ="form-buttons">
                            <Button  
                                onClick={() => {
                                this.navigatetorestaurant(restaurant.restaurantid);
                                }}
                            >
                                Explore
                            </Button>
                            <Button className="cardbtn"><BiCartAlt/></Button>
                            </div>
                            </ListGroup>
                        
                        </Card.Body>
                        </Card>
                    </div>
                    ))}
                </div>
                </div>
                );
            }
     
	
		return (
			<div class="container">
				
		
				<div>
					
					<form>
						<Button onClick={this.goback}>Go To Home Page</Button>
					</form>
                    {favouriterest}
				</div>
			
			</div>
		);
	}
}

export default Favourites;
