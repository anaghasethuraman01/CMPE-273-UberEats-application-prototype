import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Login extends Component {
    
       render() {
        return (
            <div class="container">
            <form >
                <h1>Welcome Back</h1>
                <div className='form-control'>
                Email: <input type="email" name="email" placeholder="example@gmail.com"  required></input><br />
                Password: <input type="password" name="password" placeholder="At least 6 characters" minlength="6" maxlength="16"  required></input><br />
                <div><button>Login</button></div>
                <div>New to Uber? <Link to="/register">Create an account</Link></div>
                </div>
            </form>
        </div>
        )

       } 
}

export default Login;