//register page for customer and restuarant
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post("/", (req, res) => {
	const customerid = req.body.customerid;
    const restid = req.body.restid;
    let favourite = {
        customerid: customerid,
        restaurantid:restid
    };

	let sql = "INSERT INTO customerfavourite SET ?";
	connection.query(sql, favourite, (error, result) => {
		if (error) {
			console.log("already added as favourites");
		} 
        else {
			// console.log("Favourites ADDED");
			// res.send("Row added");
            // let sql1 = "UPDATE userdetails SET favourite = 1"+
            //    "  WHERE USERID = "+mysql.escape(customerid);
            // connection.query(sql1, favourite, (error, result1) => {
            //     if (error) {
            //         console.log("error");
            //     } else{
            //          console.log("updated");
            //     }
            //    });
            console.log("Favourites added");
		}
	});	
	
});
module.exports = router;