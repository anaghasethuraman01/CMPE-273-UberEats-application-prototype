import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            email: null,
            password: null,
            restaurantname: null,
            zipcode: null,
            owner: false,
            message: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchForm = this.switchForm.bind(this);
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }

    //send registration data to server for processing
    sendRestAPI = (data) => {
        axios.post('http://localhost:5000/registertable', data)
            .then(res => {
                if(res.data.message){
                    this.setState({message:res.data.message})

                }else{
                    this.setState({ message: res.data.username }) 
                    this.setState({ username: res.data.username })
                }
                
            }).catch(
                (error) => {
                  console.log(error);
                }
            );
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const buyerData = {
            name: this.state.username,
            email: this.state.email,
            password: this.state.password,
            restaurantname: "N/A",
            zipcode: "N/A",
            owner: false
        }

        const ownerData = {
            name: this.state.username,
            email: this.state.email,
            password: this.state.password,
            restaurantname: this.state.restaurantname,
            zipcode: this.state.zipcode,
            owner: true
        }

        if (!this.state.owner) {
            this.sendRestAPI(buyerData);
        } else {
            this.sendRestAPI(ownerData);
        }

    }

    //switch between user and owner sign up form
    switchForm = (e) => {
        (!this.state.owner) ? this.setState({ owner: true }) : this.setState({ owner: false });
    }

    render() {
        var ownerForm = null;
        var accountType = "Owner";
        if (this.state.owner) {
            ownerForm =
                <div className='form-control'>
                    Restaurant Name: <input type="text" name="restaurantname" maxlength="30" placeholder="Restaurant name" value={this.state.restaurantname} onChange={this.handleChange} required></input><br />
                    ZipCode: <input type="number" name="zipcode" maxlength="5" placeholder="5 digits" value={this.state.zipcode} onChange={this.handleChange} required></input>
                </div>
            accountType = "User";
        } 

        return (
            <div class="container">
                <form onSubmit={this.handleSubmit}>
                <h1>Let's get started</h1>
                <div className='form-control'>
                    Name: <input type="text" name="username" placeholder="Your name" minlength="3" maxlength="30" value={this.state.username} onChange={this.handleChange} required></input><br />
                    Email: <input type="email" name="email" placeholder="example@gmail.com" value={this.state.email} onChange={this.handleChange} required></input><br />
                    Password: <input type="password" name="password" placeholder="At least 6 characters" minlength="6" maxlength="16" id="password" value={this.state.password} onChange={this.handleChange} required></input><br />
                    {ownerForm}
                    <div>
                    <Button>Register</Button> &nbsp;
                    <Button onClick={this.switchForm}>Sign Up as {accountType}</Button>
                    </div><br />
                    <div>Already have an account? <Link to="/login">Login</Link></div><br />
                    <div> {this.state.message} </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Register;