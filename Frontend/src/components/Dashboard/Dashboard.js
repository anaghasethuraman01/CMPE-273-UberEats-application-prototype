import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Login from '../Login/Login';
class Dashboard extends Component{
    render() {
        return (
            <div className="headeritems" >
                <Login/>

                {/* <Link className="link" to='/register' >Sign Up</Link>
                <Link className="link" to='/login'>Sign In</Link>         */}
               
            </div>
        )
    }
}
export default Dashboard;