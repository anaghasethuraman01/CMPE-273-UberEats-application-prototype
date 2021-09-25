const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post('/', function(req,res){
    console.log("Inside Search");   
	const city = req.body.query;
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
	let sql1 = "SELECT * FROM restaurant WHERE city = "+mysql.escape(city) ;
    let query = connection.query(sql1, (error, result) => {
	
    if (error) {
                res.send({ error: error });
        }
		console.log(result);
		res.end(JSON.stringify(result));
		console.log(JSON.stringify(result));	
		res.end(JSON.stringify(result));
	});  
});
module.exports = router;
