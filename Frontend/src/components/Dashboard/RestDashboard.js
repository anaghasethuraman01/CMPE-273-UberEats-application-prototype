import { Button } from "reactstrap";
import axios from "axios";
import React, { Component } from "react";
import { Card, ListGroup, ListGroupItem, Form } from "react-bootstrap";
//import { Link } from 'react-router-dom';

import backendServer from "../../webConfig";
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
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		axios.get(`${backendServer}/getrestaurant`).then((response) => {
			this.setState({ status: "notdone" });
			//console.log(response.data);
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
			console.log("in rest search");
			console.log(res.data);
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
			console.log("in rest search");
			console.log(res.data);
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
		this.setState({ status: "done" });
		axios.defaults.withCredentials = true;
		axios.post(`${backendServer}/restsearchonsubmit`, data).then((res) => {
			console.log("in rest search");
			console.log(res.data);
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
		console.log("i am here");
		const dish = this.state.dish;
		const city = this.state.city;
		console.log(this.state.foodtype);
		console.log(this.state.deliverytype);
		if (city != null || dish != null) {
			const values = {
				dish: dish,
				city: city,
			};
			//this.searchRestaurantOnSubmit(values);
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
	render() {
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
										<Button
											onClick={() => {
												this.navigatetorestaurant(restaurant.restaurantid);
											}}
										>
											Explore{" "}
										</Button>
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
										<Button
											onClick={() => {
												this.navigatetorestaurant(restaurant.restaurantid);
											}}
										>
											Explore{" "}
										</Button>
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
				<form onSubmit={this.handleSubmit}>
					<label>Search using city : </label>
					<input
						type="text"
						name="city"
						value={this.state.city}
						onChange={this.handleChange}
						required
					></input>
					<Button type="submit">Search</Button>
				</form>
				<br />
				<form onSubmit={this.handleDishSubmit}>
					<label>Search using dish : </label>
					<input
						type="text"
						name="dish"
						value={this.state.dish}
						onChange={this.handleChange}
						required
					></input>
					<Button onClick={this.handleDishSubmit} type="submit">
						Search
					</Button>
				</form>
			
          <div>
			    <input
						type="radio"
						value="Veg"
						name="foodtype"
						onChange={this.handleChange}
					/>
					Veg
					<input 
						type="radio"
						value="Non-veg"
						name="foodtype"
						onChange={this.handleChange}
					/>
					Non-Veg
					<input
						type="radio"
						value="Vegan"
						name="foodtype"
						onChange={this.handleChange}
					/>
					Vegan
				</div>
				<div>
					<input
						type="radio"
						value="pickup"
						name="deliverytype"
						onChange={this.handleChange}
					/>
					Pickup
					<input
						type="radio"
						value="delivery"
						name="deliverytype"
						onChange={this.handleChange}
					/>
					Delivery
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
