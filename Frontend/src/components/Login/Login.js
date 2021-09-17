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
            timing:null,
            restaurantid:null,
            status:null
        
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
                // console.log(res.data);
                var data1 = res.data['result'];
                
                this.setState({username:data1['username']});
                
                this.setState({phone:data1['phone']});
                this.setState({ zipcode: data1['zipcode']})
                this.setState({ timing: data1['timing']})
                this.setState({ description:data1['description']})
                this.setState({restaurantid:res.data['userid']});
                this.setState({status:res.data['status']});
                
                console.log(this.state.restaurantid)
                console.log(this.state.status)
                if(res.data.message){
                    this.setState({ message: res.data.message });


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
       
        if(this.state.usertype === 'restaurant' && this.state.status==="notfound"){
            localStorage.setItem("restaurantid",this.state.restaurantid);
            
            localStorage.setItem("email",this.state.email);
            localStorage.setItem("restaurantname",this.state.username);
            localStorage.setItem("phone","Add");
            localStorage.setItem("zipcode",this.state.zipcode);
            localStorage.setItem("description","Add");
            localStorage.setItem("timing","Add");
            redirectHome = <Redirect to="/RestaurantProfile" />
        }
        if (cookie.load('cookie')) { 
            redirectHome = <Redirect to="/" />

        }
       if(this.state.usertype === 'customer' ){

          redirectVar = <Redirect to="/CustomerHome" />;
         
       }
       if(this.state.usertype === 'restaurant' && this.state.status==="found"){
       
        localStorage.setItem("restaurantid",this.state.restaurantid);
        localStorage.setItem("email",this.state.email);
        localStorage.setItem("restaurantname",this.state.username);
        localStorage.setItem("phone",this.state.phone);
        localStorage.setItem("zipcode",this.state.zipcode);
        localStorage.setItem("description",this.state.description);
        localStorage.setItem("timing",this.state.timing);
        redirectVar = <Redirect to="/RestaurantHome" />;
        
       }





        return (
            <div>{redirectHome}
                {redirectVar}
                <div class="container">
                <form >

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
                    <div><Button onClick={this.handleSubmit}>Login</Button></div>
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