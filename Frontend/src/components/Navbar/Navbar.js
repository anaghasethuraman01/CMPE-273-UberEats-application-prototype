import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";

//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
   
  }
  //handle logout to destroy the cookie
  // handleLogout = () => {
  //   cookie.remove("cookie", { path: "/" });
  // };
  render() {
    //if Cookie is set render Logout Button
    
    
    let redirectVar = null;
    // if (!cookie.load("cookie")) {
    //   redirectVar = <Redirect to="/login" />;
    // }
    return (
      <div>
        {redirectVar}
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <div className="navbar-brand">Uber Eats</div>
            </div>
            {/* <ul className="nav navbar-nav">
              <li className="active">
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/create">Add a Book</Link>
              </li>
              <li>
                <Link to="/delete">Delete a Book</Link>
              </li>
            </ul> */}
           
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;



// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import {BsHouse} from 'react-icons/bs';
// import Login from '../Login/Login';

// class Navbar extends Component{
//     render() {
//         return (
//             <div className="headeritems" >
               
//               <Link className="linkd" to='/dashboard' > <h1><BsHouse/></h1></Link>  
//             {/* <Login/> */}
//                {/* <Link id="register" className="link" to='/register' >Sign Up</Link>
//                 <Link className="link" to='/login'>Sign In</Link>       */}
               
//             </div>
//         )
//     }
// }
// export default Navbar;