import React from 'react'
//import { Link } from 'react-router-dom';
const DishInfo = ({ restaurant }) => {

   
    return (
        <>
        <div className='card-flip'>
            <div className='card-inner'>
                <div className='card-front'>
                    <h1>{restaurant.username}</h1>
                    <h1>{restaurant.description}</h1>
                    <h1>{restaurant.zipcode}</h1>
                   
                </div>
                <div className='card-back'>
                <h1>{restaurant.timing}</h1>
                <h1>{restaurant.phone}</h1>
                <h1>{restaurant.email}</h1>
                    
                </div>
            </div>
            
        </div>
        </>
    )
}

export default DishInfo;
