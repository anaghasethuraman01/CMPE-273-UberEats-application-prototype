import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {BsHouse} from 'react-icons/bs';

class Navbar extends Component{
    render() {
        return (
            <div className="headeritems" >
               
             <Link className="linkd" to='/dashboard' > <h1><BsHouse/></h1></Link> 
               {/* <Link id="register" className="link" to='/register' >Sign Up</Link>
                <Link className="link" to='/login'>Sign In</Link>       */}
               
            </div>
        )
    }
}
export default Navbar;