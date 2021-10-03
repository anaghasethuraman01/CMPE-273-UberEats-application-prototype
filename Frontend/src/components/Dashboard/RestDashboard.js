import { Button } from "reactstrap";
import axios from "axios";
import React, { Component } from "react";
import { Card, ListGroup, ListGroupItem, Form} from "react-bootstrap";
//import { Link } from 'react-router-dom';
import {BiCartAlt} from 'react-icons/bi';
import {MdFavoriteBorder} from 'react-icons/md';
import {IoIosRestaurant} from 'react-icons/io';

import backendServer from "../../webConfig";
import ReactTooltip from 'react-tooltip';
class RestDashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			zipcode: null,
			restid: null,
			city: null,
			dish: null,
			foodtype: null,
			status: "notdone",
			deliverytype: null,
			restaurants: [],
			restaurants1: [],
			//favourites : []
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		axios.get(`${backendServer}/getrestaurant`).then((response) => {
			this.setState({ status: "notdone" });
			
			console.log(response.data);
			//update the state with the response data
			this.setState({
				restaurants: this.state.restaurants.concat(response.data),
			});
		});
	}
	searchRestaurantAPI = (data) => {
		this.setState({ status: "done" });
		axios.defaults.withCredentials = true;
		axios.post(`${backendServer}/restsearch`, data).then((res) => {
			if (res.data.message) {
				this.setState({ message: res.data.message });
			} else {
				this.setState({
					restaurants1: res.data,
				});
			}

			console.log("Status Code : ", res.status);
			if (res.status === 200) {
				this.setState({ authFlag: true });
			} else {
				this.setState({ authFlag: false });
			}
		});
	};

	searchDishAPI = (data) => {
		this.setState({ status: "done" });
		axios.defaults.withCredentials = true;
		axios.post(`${backendServer}/restdishsearch`, data).then((res) => {
			// console.log("in rest search");
			// console.log(res.data);
			if (res.data.message) {
				this.setState({ message: res.data.message });
			} else {
				this.setState({
					restaurants1: res.data,
				});
			}

			console.log("Status Code : ", res.status);
			if (res.status === 200) {
				this.setState({ authFlag: true });
			} else {
				this.setState({ authFlag: false });
			}
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state.city);
		const credential = {
			city: this.state.city,
		};

		this.searchRestaurantAPI(credential);
	};
	navigatetorestaurant = (val) => {
		console.log(val);
		//  window.location.href='/SingleRestDashboard';
		localStorage.setItem("restid", val);
		const { history } = this.props;
		console.log(history);
		history.push("/singlerestdashboard");
	};
	handleDishSubmit = (e) => {
		e.preventDefault();
		const credential = {
			dish: this.state.dish,
		};
		console.log(credential);
		this.searchDishAPI(credential);
	};
	searchRestaurantOnSubmit = (data) => {
		console.log("here")
		this.setState({ status: "done" });
		axios.defaults.withCredentials = true;
		axios.post(`${backendServer}/restsearchonsubmit`, data).then((res) => {
			console.log("in rest search");
			//console.log(res.data);
			if (res.data.message) {
				this.setState({ message: res.data.message });
			} else {
				this.setState({
					restaurants1: res.data,
				});
			}

			console.log("Status Code : ", res.status);
			if (res.status === 200) {
				this.setState({ authFlag: true });
			} else {
				this.setState({ authFlag: false });
			}
		});
	};

	fullSearchSubmit = (e) => {
		e.preventDefault();
		const city = this.state.city;
		const foodtype = this.state.foodtype;
		const deliverytype =this.state.deliverytype;
		console.log(foodtype)
		if (city != null || foodtype != null || deliverytype != null) {
			const values = {
				city: city,
				foodtype:foodtype,
				deliverytype:deliverytype
			};
			this.searchRestaurantOnSubmit(values);
		}
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
	};
	render() {
		
		console.log(this.state.favourites)
		var beforeSearch = null;
		var afterSearch = null;

		if (this.state.status === "done") {
			afterSearch = (
				<div className="card-list">
					{this.state.restaurants1.map((restaurant) => (
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
										<ReactTooltip />
										<Button data-tip="Explore"
											onClick={() => {
												this.navigatetorestaurant(restaurant.restaurantid);
											}}
										>
										<IoIosRestaurant/>
										</Button>
										
                      					<Button className="cardbtn" data-tip="Add To Favourites"
										  onClick={() => {
												this.addToFavourites(restaurant.restaurantid);
											}}
											>
											<MdFavoriteBorder/></Button>
									</ListGroup>
								</Card.Body>
							</Card> 
						</div>
					))}
				</div>
			);
		} else {
			
			beforeSearch = (
				<div className="card-list">
					{this.state.restaurants.map((restaurant) => (
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
										
										<Button data-tip="Explore"
											onClick={() => {
												this.navigatetorestaurant(restaurant.restaurantid);
											}}
										>
											<IoIosRestaurant/>
										</Button>
										<ReactTooltip />
										
                      					<Button className="cardbtn" data-tip="Add To Favourites"
										  onClick={() => {
												this.addToFavourites(restaurant.restaurantid);
											}}
											>
											<MdFavoriteBorder/></Button>
									</ListGroup>
								</Card.Body>
							</Card>
						</div>
					))}
				</div>
			);
		}
		return (
			<div class="container">
				<h1>List of All Restaurants</h1>
				<form >
					City:
					<input className="form-group"
						type="text"
						name="city"
						value={this.state.city}
						onChange={this.handleChange}
						required
					></input>
					
				</form>
			
				<form onSubmit={this.handleDishSubmit}>
					Dish Name:
					<input className="form-group"
						type="text"
						name="dish"
						value={this.state.dish}
						onChange={this.handleChange}
						required
					></input>
					{/* <Button onClick={this.handleDishSubmit} type="submit">
						Search
					</Button> */}
				</form>
			<div>

              Food Type :
            	<select className="form-group" name="foodtype" name="foodtype"  value={this.state.foodtype} onChange={this.handleChange} >
              	<option value="">All</option> 
              	<option value="Veg" >Veg</option>
              	<option value="Non-veg"  >Non-veg</option>
              	<option value="Vegan" >Vegan</option>
            	</select>
         	 </div>
		<div>
             Mode of Delivery :
            <select className="form-group" name="deliverytype" value={this.state.deliverytype} onChange={this.handleChange}>
              <option value="">All</option> 
              <option value="Pick Up">Pick Up</option>
              <option value="Delivery">Delivery</option>
            </select>
         	 </div>
				<div>
					<form>
						<Button onClick={this.fullSearchSubmit} type="submit">
							Search
						</Button>
					</form>
					<br />
					<form>
						<Button onClick={this.goback}>Go To Home Page</Button>
					</form>
				</div>
				{beforeSearch}
				{afterSearch}
			</div>
		);
	}
}

export default RestDashboard;
