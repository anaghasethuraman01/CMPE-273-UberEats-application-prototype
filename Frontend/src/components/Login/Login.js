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
            userid:null,
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
                if(res.data.message){
                    this.setState({ message: res.data.message });
                } 
                else{
                  
                    
                    var data1 = res.data['result'];
                    console.log(data1);
                    this.setState({username:data1['username']});
                    
                    this.setState({phone:data1['phone']});
                    this.setState({ zipcode: data1['zipcode']})
                    this.setState({ timing: data1['timing']})
                    this.setState({ description:data1['description']})
                    this.setState({restaurantid:res.data['userid']});
                    this.setState({status:res.data['status']});
                    
                    console.log(this.state.restaurantid)
                    console.log(this.state.status)
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
        axios.post('http://localhost:5000/custlogin', data)
            .then(res => {   
                 console.log(res.data)
                 if(res.data.message){
                    this.setState({ message: res.data.message })
                }else{
                    
                    var data1 = res.data['result'];
                    console.log(data1);
                    this.setState({username:data1['username']});
                    this.setState({dob:data1['dob']});
                    this.setState({nickname:data1['nickname']});
                    this.setState({phone:data1['phone']});
                    this.setState({ state: data1['state']})
                    this.setState({ city: data1['city']})
                    this.setState({ country: data1['country']})
                    this.setState({ about:data1['about']})
                    this.setState({ owner:data1['owner']})
                    this.setState({ userid:res.data['userid']});
                    this.setState({status:res.data['status']});
                    
                    console.log(this.state.restaurantid)
                    console.log(this.state.status)
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

        if( this.state.status==="notfound" && this.state.usertype === 'customer'){
            localStorage.setItem("userid",this.state.userid);
        localStorage.setItem("email",this.state.email);
        localStorage.setItem("username",this.state.username);
        localStorage.setItem("phone","Add");
        localStorage.setItem("dob","Add");
        localStorage.setItem("about","Add");
        localStorage.setItem("nickname","Add");
        localStorage.setItem("city","Add");
        localStorage.setItem("state","Add");
        localStorage.setItem("country","Add");
            redirectHome = <Redirect to="/CustomerProfile" />
        }
        
       if( this.state.status==="found" && this.state.usertype === 'customer'){
        localStorage.setItem("userid",this.state.userid);
        localStorage.setItem("email",this.state.email);
        localStorage.setItem("username",this.state.username);
        localStorage.setItem("phone",this.state.phone);
        localStorage.setItem("dob",this.state.dob);
        localStorage.setItem("about",this.state.about);
        localStorage.setItem("nickname",this.state.nickname);
        localStorage.setItem("city",this.state.city);
        localStorage.setItem("state",this.state.state);
        localStorage.setItem("country",this.state.country);
        //  const {history} = this.props;
        // console.log("here");
        // history.push('/customerhome');
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
        const {history} = this.props;
        history.push('/restauranthome');
        //redirectVar = <Redirect to="/RestaurantHome" />;
        
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