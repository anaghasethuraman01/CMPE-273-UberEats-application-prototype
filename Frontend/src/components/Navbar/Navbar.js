import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import AddToCart from '../Dashboard/AddToCart';

import {
 
  Button,

} from 'react-bootstrap';
//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
   this.state = {
      openModal: false,
    };
  }
// viewCart = (e) => {
//     e.preventDefault();
//     this.setState({ openModal: true });
//   }
//    closeModal = () => {
//      this.setState({ openModal: false });
//     //  const {history} = this.props;
//     //  history.push('/checkout');
//   }
  //handle logout to destroy the cookie
  // handleLogout = () => {
  //   cookie.remove("cookie", { path: "/" });
  // };
  logout = e => {
        e.preventDefault();
        localStorage.setItem("userid","");
        window.localStorage.clear();
        const {history} = this.props;
        history.push('/login'); 
      }
  render() {
    //if Cookie is set render Logout Button
    
    const userNameSessionVal = localStorage.getItem('userid');
    let sessionAvail = null;
    if (userNameSessionVal != null && userNameSessionVal !== undefined && userNameSessionVal !== "") {
      sessionAvail = (
        <div className = "cartitems">
          <AddToCart />
           <Button className="btn-logout" onClick={this.logout}>Logout</Button>
        </div>
      );
    }
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
             
              <div className=" navbar-brand "><h1 className="ubereats"><span style={{ color:"white"}}>Uber</span> <span style={{ color:"green" }}>Eats</span></h1></div>
            {sessionAvail}
            
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