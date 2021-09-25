import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import  Navbar  from './Navbar/Navbar';
import '../App.css';
import RestaurantProfile from './Profile/RestaurantProfile';
import RestaurantEditProfile from './Profile/RestaurantEditProfile';

import CustomerProfile from './Profile/CustomerProfile';
import CustomerHome from './HomePage/CustomerHome';
import RestaurantHome from './HomePage/RestaurantHome';
import RestaurantMenu from './Menu/RestaurantMenu';
import RestDashboard from './Dashboard/RestDashboard';
import CustomerEditProfile from './Profile/CustomerEditProfile';
import AllDishMenu from './Menu/AllDishMenu';
//import 'bootstrap/dist/css/bootstrap.css';
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
                    <Route path="/restaurantmenu" component={RestaurantMenu} />
                    <Route path="/restauranthome" component={RestaurantHome} />
                    <Route path="/restdashboard" component={RestDashboard} />
                    <Route path="/restauranteditprofile" component={RestaurantEditProfile} />
                    <Route path="/customereditprofile" component={CustomerEditProfile} />
                    <Route path="/alldishmenu" component={AllDishMenu} />
                </div>    
            </Router>
            
        )
    }
}
   

export default Main;
