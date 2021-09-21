import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {BsHouse} from 'react-icons/bs';

class Navbar extends Component{
    render() {
        return (
            <div className="headeritems" >
               
             <Link className="linkd" to='/dashboard' > <h1><BsHouse/></h1></Link> 
            
            </div>
        )
    }
}
export default Navbar;