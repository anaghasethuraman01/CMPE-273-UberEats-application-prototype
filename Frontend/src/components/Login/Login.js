import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookies';
// import { Button } from 'reactstrap';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
            authFlag: false,
            message:null,
            username:null,
            owner:null
        
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    sendRestAPI = (data) => {
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/login', data)
            .then(res => {
                console.log(res.data);
                if(res.data.message){
                    //this.setState({message:res.data.message})
                    //this.state.message = res.data.message;
                    this.setState({ message: res.data.message })
                }else{
                    this.setState({ username: res.data['USERNAME']})
                    this.setState({owner:res.data['OWNER']})
                    this.setState({email:res.data['EMAIL']})
                }
                
                console.log("Status Code : ", res.status);
                if (res.status === 200) {
                    this.setState({ authFlag: true })
                } else {
                    this.setState({ authFlag: false })
                }
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        const credential = {
            email: this.state.email,
            password: this.state.password
        }
        this.sendRestAPI(credential);
    }

    render() {
        let redirectVar = null;
        let redirectHome = null;
        if (cookie.load('cookie')) {
            redirectHome = <Redirect to="/" />
        }
       if(this.state.owner === 0 && this.state.username){
          redirectVar = <Redirect to="/UserProfile" />;
         
       }else if(this.state.owner === 1 && this.state.username){
        //console.log(this.state.email);
        localStorage.setItem("email",this.state.email);
       redirectVar = <Redirect to="/OwnerProfile" />;
       }
       if(this.state.username == null){
        redirectVar = <Redirect to="/Login" />;
       }
        // if(this.state.username){
        //     redirectVar = <Redirect to="/Profile" />;
        // }else{
        //     redirectVar = <Redirect to="/Login" />;
        // }
        return (
            <div>{redirectHome}
                {redirectVar}
                <div class="container">
                <form onSubmit={this.handleSubmit}>

                    <h1>Welcome Back</h1>
                    <div className='form-control'>
                    Email: <input id="email" type="email" name="email" placeholder="example@gmail.com" 
                    value={this.state.email} onChange={this.handleChange}required></input><br />
                    Password: <input type="password" name="password" placeholder="At least 6 characters" minlength="6" maxlength="16"  
                    value={this.state.password} onChange={this.handleChange} required></input><br />
                    <div><button>Login</button></div>
                    <div>New to Uber? <Link to="/register">Create an account</Link></div>
                    <div>{this.state.message}</div>
                    </div>
                        
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;