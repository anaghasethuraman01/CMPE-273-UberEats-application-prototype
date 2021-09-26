import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button ,Input} from 'reactstrap';
import backendServer from "../../webConfig";
class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            email: null,
            password: null,
            //restaurantname: null,
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
      // console.log("data"+data)
        axios.post(`${backendServer}/register`, data)
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
            window.location.href='/Login';
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const buyerData = {
            name: this.state.username,
            email: this.state.email,
            password: this.state.password,
            //restaurantname: "N/A",
            zipcode: "N/A",
            owner: false
        }

        const ownerData = {
            name: this.state.username,
            email: this.state.email,
            password: this.state.password,
            //restaurantname: this.state.restaurantname,
            zipcode: this.state.zipcode,
            owner: true
        }
        console.log(ownerData);
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
        var userForm = null;
        var accountType = "Owner";
        if (this.state.owner) {
            ownerForm =
            <div className="form-group">
                <div >
                    Restaurant Name: <Input className="form-control" type="text" name="username" maxlength="30" placeholder="Restaurant name" value={this.state.username} onChange={this.handleChange} required></Input>
                    ZipCode: <Input  className="form-control" type="number" name="zipcode" maxlength="5" placeholder="5 digits" value={this.state.zipcode} onChange={this.handleChange} required></Input>
                </div>
                </div>
            accountType = "User";
        } else{
            userForm =
            <div >
            Name:<br/> <Input className="form-control" type="text" name="username" placeholder="Your name" minlength="3" maxlength="30" value={this.state.username} onChange={this.handleChange} required></Input>
        </div>
         accountType = "Owner";
        }

        return (


            <div>
           
            <div className="container">
              <div className="login-form">
                <div className="main-div">
                  <div className="panel">
                  <h1>Let's get started.</h1>
                    <p>Please enter required details to register.</p>
                  </div>
                  {userForm}
                  {ownerForm}
                  <div className="form-group">

                  Email: <Input   className="form-control" type="email" name="email" placeholder="example@gmail.com" value={this.state.email} onChange={this.handleChange} required></Input>
                   
                  </div>
                  <div className="form-group">

                  Password: <Input className="form-control" type="password" name="password" placeholder="At least 6 characters" minlength="6" maxlength="16" id="password" value={this.state.password} onChange={this.handleChange} required></Input>
                    
                  </div>
                  <div className="form-group">
                  <Button className="btn btn-primary" onClick={this.handleSubmit}>Register</Button> &nbsp;
                <Button onClick={this.switchForm}>Sign Up as {accountType}</Button>
                  </div>
                  <h4>Already have an account? <Link to="/login">Login</Link></h4><br />
                    <h2> {this.state.message} </h2>
                 
                  </div>
                </div>
              </div>
            </div>
       





            // <div class="container">
            //     <form onSubmit={this.handleSubmit}>
            //     <h1>Let's get started</h1>
            //     <div className='form-control'>
            //         {userForm}
            //         {ownerForm}
            //         Email: <input type="email" name="email" placeholder="example@gmail.com" value={this.state.email} onChange={this.handleChange} required></input><br />
            //         Password: <input type="password" name="password" placeholder="At least 6 characters" minlength="6" maxlength="16" id="password" value={this.state.password} onChange={this.handleChange} required></input><br />
                   
            //         <div>
            //         <Button>Register</Button> &nbsp;
            //         <Button onClick={this.switchForm}>Sign Up as {accountType}</Button>
            //         </div><br />
            //         <div>Already have an account? <Link to="/login">Login</Link></div><br />
            //         <div> {this.state.message} </div>
            //         </div>
            //     </form>
            // </div>
        )
    }
}

export default Register;