

import React, {Component} from 'react';

import { Button } from 'reactstrap';
import backendServer from "../../webConfig";
 //import axios from 'axios';
class CustomerProfile extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          userid: localStorage.getItem("userid"),
          username: localStorage.getItem("username"),
          email:localStorage.getItem("email"),
          phone: localStorage.getItem("phone"),
          dob:localStorage.getItem("dob"),
          address:localStorage.getItem("address"),
          state:localStorage.getItem("state"),
          city:localStorage.getItem("city"),
          country:localStorage.getItem("country"),
          nickname:localStorage.getItem("nickname"),
          about:localStorage.getItem("about"),
          profilepic:localStorage.getItem("profilepic"),
          favourites:null,
          loading: false,
          output: null
        }
        this.handleChange = this.handleChange.bind(this);
      }

     
      handleSubmit = (e) => {
        e.preventDefault();
        const {history} = this.props;
        history.push('/customereditprofile'); 
      }
      findFood = (e) => {
        e.preventDefault();
        window.location.href='/RestDashboard';
      }
      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        }
        goback = (e) =>{
            e.preventDefault();
            const {history} = this.props;
            history.push('/customerhome'); 
          }
        
          saveFile = (e) => {
            e.preventDefault();
            this.setState({file:e.target.files[0]});
            this.setState({fileName:e.target.files[0].name});
            
          };
        
         
       
          
    render(){
      const imgLink = `${backendServer}/${localStorage.getItem("profilepic")}`;
      console.log("***"); 
      console.log(localStorage.getItem("profilepic"));
    return (


      <div className="container">
      <div className="login-form">
        <div className="main-div">
          <div className="panel">
          <h1>Welcome {this.state.username}</h1>
          </div>
          <div className="form-group">

          <img src={imgLink} alt="No image added. Add Image." style={{ maxHeight: '180px', maxWidth: '180px' }} />
          
          </div>
          <div className="form-group">
          <h4>About : {this.state.about}</h4>
          </div>
          <div className="form-group">
          <h4>Call Me : {this.state.nickname}</h4>
          </div>
          <div className="form-group">
          <h4>Email: {this.state.email}</h4>
          </div>
          <div className="form-group">
            <h4> Phone: {this.state.phone}</h4>
          
          </div>
          <div className="form-group">
            <h4>  DoB: {this.state.dob}</h4>
          
          </div>
          <div className="form-group">
            <h4> Apt and Street No: {this.state.address}</h4>
          
          </div>
          <div className="form-group">
            <h4> City: {this.state.city}</h4>
          
          </div>
          <div className="form-group">
            <h4> State: {this.state.state}</h4>
          
          </div>
          <div className="form-group">
            <h4> Country: {this.state.country}</h4>
          
          </div>
         
          <Button onClick = {this.handleSubmit} >Update Profile</Button>

          <Button onClick = {this.goback}>Back</Button>
        </div>
      </div>
    </div>
       
    )
    }
   
}
 
export default CustomerProfile;