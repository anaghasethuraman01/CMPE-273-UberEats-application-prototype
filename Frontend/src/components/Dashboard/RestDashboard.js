

import React, {Component} from 'react';
import { Button } from 'reactstrap';


class RestDashboard extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          username: localStorage.getItem("username"),
          email:localStorage.getItem("email"),
          phone: localStorage.getItem("phone"),
          dob:localStorage.getItem("dob"),
          state:localStorage.getItem("state"),
          city:localStorage.getItem("city"),
          country:localStorage.getItem("country"),
          nickname:localStorage.getItem("nickname"),
          about:localStorage.getItem("about"),
          favourites:null,
          loading: false,
          output: null
        }
      }
      handleSubmit = (e) => {
        e.preventDefault();
        window.location.href='/CustomerProfile';
      }
      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        }
    render(){

    return (
        <div class="container">
            <form onSubmit={this.handleSubmit}>
            <h1>Welcome {this.state.username}</h1>
            <div className='form-control'>
            <br/>
            About: {this.state.about}
            <br/>
            <br/>
            NickName: {this.state.nickname}
            <br/>
            <br/>
            Email: {this.state.email}
            <br/>
            <br/>
            Phone: {this.state.phone}
            <br/>
            <br/>
            DoB: {this.state.dob}
            <br/>
            <br/>
            City: {this.state.city}
            <br/>
            <br/>
            State: {this.state.state}
            <br/>
            <br/>
            Country: {this.state.country}
            <br/>
            <br/>
            <Button>Update Profile</Button>
            
            </div>
            </form>
        </div>
    )
    }
   
}
 
export default RestDashboard;