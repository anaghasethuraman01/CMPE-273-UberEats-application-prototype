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
    quantity = req.body.quantity;
    let cartvalues = {
        customerid: customerid,
        restaurantid:restaurantid,
        dishid:dishid,
        dishname:dishname,
        dishprice:dishprice,
        quantity:quantity
    };
    console.log(cartvalues);
	 let sql = "SELECT * FROM placeorder WHERE restaurantid != " +mysql.escape(restaurantid) + "AND customerid = "+mysql.escape(customerid) ;
     console.log(sql);
	 connection.query(sql,(error, result) => {
         if(result.length > 0 ){
             //console.log("Cant place order");
             res.send("Delete previous order")
         }else{

             sql1 = "SELECT * FROM placeorder WHERE dishid = "+mysql.escape(dishid);
             connection.query(sql1,(error, result1) => {
                 if(result1.length == 0){
                     sql2 = "INSERT INTO placeorder  SET ?";
                    connection.query(sql2,cartvalues,(error, result) => {
                        console.log("Values added to Cart");
                    });
                 }
                 else if(result1.length > 0){
                    //  console.log("sfbnbfdns z")
                    // //result1 = JSON.stringify(result1);
                    // console.log(result1)
                    quantity = result1[0].quantity + 1;
                    let sql3 = "UPDATE placeorder SET quantity = " +mysql.escape(quantity)+ " WHERE dishid = "
                    + mysql.escape(dishid) + " AND customerid = "+ mysql.escape(customerid);
                   
                      connection.query(sql3, (error, result3) => {
                    if(error){
                        console.log(error.message);
                    }else{
                        console.log("Quantity updated")
                    }
                      });
                     
                 }
            //          let sql3 = "UPDATE placeorder SET quantity = "+ mysql.escape(img)  +
            //    "  WHERE RESTAURANTID = "+mysql.escape(restaurantid) + " AND DISHNAME =  "
            //      }
             })



            
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