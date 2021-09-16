import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import  Navbar  from './Navbar/Navbar';
import '../App.css';
import RestaurantProfile from './Profile/RestaurantProfile';
import CustomerProfile from './Profile/CustomerProfile';
import CustomerHome from './HomePage/CustomerHome';
import RestaurantHome from './HomePage/RestaurantHome';

class Main extends Component {
    render() {
        return (
            <Router>       
                <div >
                    <Route path="/" component={Navbar} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/customerprofile" component={CustomerProfile} />
                    <Route path="/restaurantprofile" component={RestaurantProfile} />
                    <Route path="/customerhome" component={CustomerHome} />
                    <Route path="/restauranthome" component={RestaurantHome} />
                </div>    
            </Router>
            
        )
    }
}
   

export default Main;
