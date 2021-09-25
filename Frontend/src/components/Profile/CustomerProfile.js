

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
        <div class="container">
            <form>
            <h1>Welcome {this.state.username}</h1>
            <div className='form-control'>
            <img src={imgLink} alt="helo" style={{ maxHeight: '180px', maxWidth: '180px' }} />
             
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
            <Button onClick = {this.handleSubmit}>Update Profile</Button>
            <br/>


            <br/>
            <Button onClick = {this.goback}>Back</Button>
            </div>
            </form>
            
        </div>
    )
    }
   
}
 
export default CustomerProfile;