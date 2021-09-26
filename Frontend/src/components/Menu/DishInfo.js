import React from 'react'
//import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import backendServer from "../../webConfig";
const DishInfo = ({ dish }) => {

    const imgLink =`${backendServer}/${dish.dishimage}`;
    return (
        <>
        <div className='card-flip'>
            <div className='card-inner'>
                <div className='card-front'>
                    <h1>{dish.dishname}</h1>
                    <img src={imgLink} alt="helo" style={{ maxHeight: '180px', maxWidth: '180px' }} />
                   
                   
                </div>
                <div className='card-back'>
                <h1>${dish.price}</h1>
                <h1>{dish.description}</h1>
                <h1>{dish.category}</h1>
                <h4> <Button>Add more images</Button></h4>

                </div>
            </div>
            
        </div>
        </>
    )
}

export default DishInfo;
