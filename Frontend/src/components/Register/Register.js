import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Button ,Input} from 'reactstrap';
import backendServer from "../../webConfig";
import validator from 'validator';
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
            message: '',
            registerStatus:null
            
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
        axios.post(`${backendServer}/register`, data)
            .then(res => {
                if(res.data.message){
                    this.setState({message:res.data.message})
                    this.setState({registerStatus:"failed"})

                }else{
                    this.setState({ message: res.data.username }) 
                    this.setState({ username: res.data.username })
                    this.setState({registerStatus:""})
                }

                console.log(this.state.message)
                if(this.state.registerStatus !== "failed"){
                    const {history} = this.props;
                    history.push('/login'); 
                }else{
                    const {history} = this.props;
                    history.push('/register'); 
                }
                
            }).catch(
                (error) => {
                  console.log(error);
                }
            );
            
            
          
    }

    nullOrEmpty(str) {
        return str === null || str === "" 
    }
    validateCustRegister = () => {
        let isValid = true;
        if(this.nullOrEmpty(this.state.username)  || this.nullOrEmpty(this.state.email) ||  this.nullOrEmpty(this.state.password)){
        alert("Fields cannot be empty");
           isValid = false;
        }
        else{
            if (!validator.isEmail(this.state.email)) {
                alert('Enter valid Email!')
                isValid = false;
            }
            
            if(!this.state.username.match(/^[a-zA-Z ]+$/)){
                alert("Name can contain only alphabets")
                isValid = false;
            }
        } 
        return isValid;
     }
     validateOwnerRegister = () => {
        let isValid = true;
        if(this.nullOrEmpty(this.state.username)  || this.nullOrEmpty(this.state.email) ||  this.nullOrEmpty(this.state.password)
            ||this.nullOrEmpty(this.state.zipcode)) {
        alert("Fields cannot be empty");
           isValid = false;
        }
        else{
            if (!validator.isEmail(this.state.email)) {
                alert('Enter valid Email!')
                isValid = false;
            }
            if(!this.state.username.match(/^[a-zA-Z ]+$/)){
                alert("Name can contain only alphabets")
                isValid = false;
            }
            if(!this.state.zipcode.match(/^[0-9]+$/)){
                alert("Zipcode can only contain numbers")
                isValid = false;
            }

        } 
        return isValid;
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
            if (this.validateCustRegister() === true) {           
                this.sendRestAPI(buyerData);
            }
        } else {
            if (this.validateOwnerRegister() === true) {           
                this.sendRestAPI(ownerData);
            }
            
        }

    }

    //switch between user and owner sign up form
    switchForm = (e) => {
        (!this.state.owner) ? this.setState({ owner: true }) : this.setState({ owner: false });
    }

    render() {
        let redirectHome = null;
        var ownerForm = null;
        var userForm = null;
        var accountType = "Owner";
        // if(this.state.registerStatus != "failed"){
        //     redirectHome = <Redirect to="/Login" />
        // }
        // else{
        //     redirectHome = <Redirect to="/Register" />
        // }
        
        // if(this.state.message == "User email already registered"){
        //     alert("Email already exists");
        // }
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
                {redirectHome}
           
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
       


           
          
        )
    }
}

export default Register;