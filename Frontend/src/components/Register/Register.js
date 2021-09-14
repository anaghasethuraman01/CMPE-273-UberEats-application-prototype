import React, { Component , useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Register extends Component {

    // constructor(props) {
    //     super(props);
    //     const [usernameReg, setUsernameReg] = useState('');
    //     const [emailidReg, setEmailidReg] = useState('');
    //     const [passwordReg, setPasswordReg] = useState('');
    // }
    onChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
        console.log(this.state);
      };
    
    handleSubmit = (e)=>{

        e.preventDefault();

        console.log(this.state);

        axios.defaults.withCredentials = true;
        
        const data = {
            username: this.state.username,
            emailid: this.state.emailid,
            password: this.state.password,
          };
          console.log("data"+data);
        axios.post('http://localhost:5000/registertable',
        data).then((response)=>{
            console.log(response);
        }).catch(
            (error) => {
              console.log(error);
            }
          );
    };
   
       render() {

        return (
            <div class="container">
            <form onSubmit={this.handleSubmit}>
                <h1>Let's get started</h1>
                <div className='form-control'>
                Name: <input type="text"
                        name="username"
                        placeholder="Your name" minlength="3" maxlength="30" 
                        required
                        onChange={this.onChange}>
                        </input><br />
                Email: <input type="email" name="emailid" 
                        placeholder="example@gmail.com"  
                        onChange={this.onChange}>
                       
                        </input><br />
                Password: <input type="password" name="password"
                          placeholder="At least 6 characters" 
                          minlength="6" maxlength="16" id="password"  
                          >
                          </input><br />
                
                <div>
                <button  >Register</button> &nbsp;
                <button >Create a business account</button>
                </div><br />
                <div>Already have an account? <Link to="/login">Login</Link></div><br />
                </div>
            </form>
        </div>
        )

       } 
}

export default Register;