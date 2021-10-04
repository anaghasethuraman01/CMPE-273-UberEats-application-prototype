//register page for customer and restuarant
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post("/", (req, res) => {
    console.log("Cart");
    
	customerid = req.body.customerid;
    restaurantid = req.body.restaurantid;
    dishid = req.body.dishid;
    dishname = req.body.dishname;
    dishprice =req.body.dishprice;
    let cartvalues = {
        customerid: customerid,
        restaurantid:restaurantid,
        dishid:dishid,
        dishname:dishname,
        dishprice:dishprice
    };
    console.log(cartvalues);
	 let sql = "SELECT * FROM placeorder WHERE restaurantid != " +mysql.escape(restaurantid);
	 connection.query(sql,(error, result) => {
         if(result.length > 0 ){
             console.log("Cant place order");
         }else{
             sql1 = "INSERT INTO placeorder  SET ?";
             connection.query(sql1,cartvalues,(error, result) => {
                 console.log("Values added to Cart");
             });
         }
     });
	// 	if (error) {
	// 		console.log("already added as favourites");
	// 	} 
    //     else {
            
    //         console.log("Favourites added");
	// 	}
	// });	
	
});
module.exports = router;