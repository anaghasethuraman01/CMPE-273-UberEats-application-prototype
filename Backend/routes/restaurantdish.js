const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');


router.post("/", (req, res) => {
	//console.log(req.body);

	const dishname = req.body.dishname;
	const ingrediants = req.body.ingrediants;
	const price = req.body.price;
	const description = req.body.description;
	const category = req.body.category;
	const restaurantid = req.body.restaurantid;

	let post = {
        dishname: dishname,
        ingrediants: ingrediants,
        price: price,
        description: description,
        category: category,
        restaurantid:restaurantid
		};
			let sql = "INSERT INTO restaurantdishes SET ?";
			connection.query(sql, post, (error, result) => {
				if (error) {
					//console.log("Error");
					//res.send({message:"Invalid credentials"})
				} else {
					console.log("USER ADDED");
					//res.send("Row added");
				}
			});
});
module.exports = router;