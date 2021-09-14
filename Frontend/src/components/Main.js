import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import  Navbar  from './Navbar/Navbar';
import '../App.css';
class Main extends Component {
    render() {
        return (
            <Router>
                
                <div >
                    <Route path="/" component={Navbar} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                </div>    
            </Router>
            
        )
    }
}
   

export default Main;
