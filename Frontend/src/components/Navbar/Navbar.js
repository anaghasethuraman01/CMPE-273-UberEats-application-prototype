import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Navbar extends Component{
    render() {
        return (
            <div className="headeritems" >
                
                <Link className="link" to='/register' >Sign Up</Link>
                <Link className="link" to='/login'>Sign In</Link>       
               
            </div>
        )
    }
}
export default Navbar;