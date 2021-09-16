import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookies';
import { Button } from 'reactstrap';

class Login extends Component {
 
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
            authFlag: false,
            message:null,
            phone:null,
            username:null,
            owner:null,
            usertype:null,
            restaurantname:null,
            zipcode:null,
            description:null,
            timing:null
        
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

    sendRestaurantAPI = (data) => {
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/restlogin', data)
            .then(res => {   
                 if(res.data.message){
                    this.setState({ message: res.data.message })
                }else{
                   
                    this.setState({phone:res.data['phone']});
                    this.setState({email:res.data['email']});
                    this.setState({restaurantname:res.data['restaurantname']});
                    this.setState({ zipcode: res.data['zipcode']})
                    this.setState({ timing: res.data['timing']})
                    this.setState({ description: res.data['description']})
                }
                
                console.log("Status Code : ", res.status);
                if (res.status === 200) {
                    this.setState({ authFlag: true })
                } else {
                    this.setState({ authFlag: false })
                }
            });
    }
    sendCustomerAPI = (data) => {
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/login', data)
            .then(res => {   

                 if(res.data.message){
                    this.setState({ message: res.data.message })
                }else{
                    console.log("in cust")
                    this.setState({ username: res.data['USERNAME']})
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
        const credential = {
            email: this.state.email,
            password: this.state.password,
            usertype:this.state.usertype
        }
        console.log(credential.usertype)
        if(credential.usertype === 'customer'){
            this.sendCustomerAPI(credential);
        }else if(credential.usertype === 'restaurant'){
            this.sendRestaurantAPI(credential);
        }else{
            alert("Provide valid user type");
        }
        
    }

    render() {
        let redirectVar = null;
        let redirectHome = null;
        if (cookie.load('cookie')) {
            
            redirectHome = <Redirect to="/" />

        }
       if(this.state.usertype === 'customer' ){

          redirectVar = <Redirect to="/CustomerHome" />;
         
       }else if(this.state.usertype === 'restaurant'){
        localStorage.setItem("email",this.state.email);
        localStorage.setItem("restaurantname",this.state.restaurantname);
        localStorage.setItem("phone",this.state.phone);
        localStorage.setItem("zipcode",this.state.zipcode);
        localStorage.setItem("description",this.state.description);
        localStorage.setItem("timing",this.state.timing);
       redirectVar = <Redirect to="/RestaurantHome" />;
       if(this.state.phone == null || this.state.restaurantname == null || 
        this.state.email == null || this.state.description == null||
        this.state.zipcode == null||this.state.timing == null){
        redirectVar = <Redirect to="/Login" />;
       }
       }
    
    
    
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
                    <select name="usertype" value={this.state.value} onChange={this.handleChange}>
                        <option value="">User type</option>
                        <option value="customer">Customer</option>
                        <option value="restaurant">Restaurant</option>
                    </select>
                    <br/>
                    <div><Button>Login</Button></div>
                    <div>New to Uber Eats? <Link to="/register">Create an account</Link></div>
                    <div>{this.state.message}</div>
                    </div>
                        
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;