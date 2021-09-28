import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookies';
import { Button ,Input} from 'reactstrap';
import backendServer from "../../webConfig";
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
            status:null,
            city:null,
            deliverytype:null,
            days:null,
            profilepic:null,
            restprofilepic:null,
        
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
        axios.post(`${backendServer}/restlogin`, data)
        
            .then(res => {  
                console.log(res.data['result']);
                if(res.data.message){
                    this.setState({ message: res.data.message });
                } 
                else{  
                    var data1 = res.data['result'];
                    
                    this.setState({username:data1['username']});
                    this.setState({phone:data1['phone']});
                    this.setState({ zipcode: data1['zipcode']})
                    this.setState({ timing: data1['timing']})
                    this.setState({ description:data1['description']})
                    this.setState({ city: data1['city']})
                    this.setState({ days: data1['days']})
                    this.setState({ deliverytype:data1['deliverytype']})
                    this.setState({restaurantid:res.data['userid']});
                    this.setState({ owner:data1['owner']});
                    this.setState({ restprofilepic:data1['profilepic']})
                    
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
        axios.post(`${backendServer}/custlogin`, data)
            .then(res => {   
                console.log("in login")
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
                    this.setState({ profilepic:data1['profilepic']})
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
        // if(this.state.usertype === 'restaurant'){
        //     redirectHome = <Redirect to="/RestaurantHome" />
        // }
        if(this.state.usertype === 'restaurant' && this.state.status==="notfound"){
            localStorage.setItem("restaurantid",this.state.restaurantid);
            localStorage.setItem("email",this.state.email);
            localStorage.setItem("restaurantname",this.state.username);
            localStorage.setItem("phone","Add");
            localStorage.setItem("zipcode",this.state.zipcode);
            localStorage.setItem("description","Add");
            localStorage.setItem("timing","Add");
            localStorage.setItem("city","Add");
            localStorage.setItem("days","Add");
            localStorage.setItem("deliverytype","Add");
            localStorage.setItem("restprofilepic","");
           
            redirectHome = <Redirect to="/RestaurantHome" />
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
        localStorage.setItem("profilepic","");
            redirectHome = <Redirect to="/CustomerHome" />
        }
        
       if( this.state.status==="found" && this.state.usertype === 'customer' ){
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
        localStorage.setItem("profilepic",this.state.profilepic);
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
        localStorage.setItem("city",this.state.city);
        localStorage.setItem("deliverytype",this.state.deliverytype);
        localStorage.setItem("days",this.state.days);
        localStorage.setItem("restprofilepic",this.state.restprofilepic);
        // const {history} = this.props;
        // history.push('/restauranthome');
        redirectVar = <Redirect to="/RestaurantHome" />;
        
       }

        return (
            <div>{redirectHome}
                {redirectVar}

                <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
              <h1>Welcome to Uber Eats.</h1>
                <p>Please enter your email and password.</p>
              </div>

              <div className="form-group">

              Email: <Input className="form-control" id="email" type="email" name="email" placeholder="example@gmail.com" 
                    value={this.state.email} onChange={this.handleChange}required></Input>
               
              </div>
              <div className="form-group">
                  
              Password: <Input type="password" name="password" placeholder="At least 6 characters" minlength="6" maxlength="16"  
                    value={this.state.password} onChange={this.handleChange} required></Input>
              </div>
              <div className="form-group">
              <select className="usertype" name="usertype" value={this.state.value} onChange={this.handleChange}>
                        <option value="">User type</option>
                        <option value="customer">Customer</option>
                        <option value="restaurant">Restaurant</option>
                    </select>
                  </div>
              <div className="form-group">

              <Button onClick={this.handleSubmit} className="btn btn-primary">Login</Button>
              <h4>New to Uber Eats? <Link to="/register">Create an account</Link></h4>
                <div><h2>{this.state.message}</h2></div>
              </div>

            </div>
          </div>
        </div>
            </div>
        )
    }
}

export default Login;