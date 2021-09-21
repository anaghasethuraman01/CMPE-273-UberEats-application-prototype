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
import RestaurantMenu from './Menu/RestaurantMenu';
import Dashboard from './Dashboard/Dashboard';
import RestDashboard from './Dashboard/RestDashboard';

class Main extends Component {
    render() {
        return (
            <Router>       
                <div >
                    <Route path="/" component={Navbar} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/customerprofile" component={CustomerProfile} />
                    <Route path="/restaurantprofile" component={RestaurantProfile} />
                    <Route path="/customerhome" component={CustomerHome} />
                    <Route path="/restaurantmenu" component={RestaurantMenu} />
                    <Route path="/restauranthome" component={RestaurantHome} />
                    <Route path="/restdashboard" component={RestDashboard} />
                    
                </div>    
            </Router>
            
        )
    }
}
   

export default Main;
