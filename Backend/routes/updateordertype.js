//loading all the restaurants for the customer
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post('/', function(req,res){
    
    const orderid = req.body.orderid;  
    const ordertype = req.body.ordertype;
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log(ordertype);  
    let sql1 = "UPDATE orders SET orderstatus = " + mysql.escape(ordertype)
    + " WHERE orderid = " +mysql.escape(orderid);
    let query = connection.query(sql1, (error, result) => {
    if (error) {
                res.send({ error: error });
        }
		console.log("Order status updated");
	});
   
    
});
module.exports = router;