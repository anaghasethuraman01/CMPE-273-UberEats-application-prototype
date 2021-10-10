//loading all the restaurants for the customer
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post('/', function(req,res){
    //console.log("Inside Near you"); 
    const userid = req.body.userid;   
    // res.writeHead(200,{
    //     'Content-Type' : 'application/json'
    // });
	let sql1 = "SELECT * FROM userdetails WHERE userid = "+mysql.escape(userid) ;
    let query = connection.query(sql1, (error, result) => {
	
    if (error) {
                res.send({ error: error });
        }
     if(result.length == 0){
         res.send({ message: "No Profile Exists" })
     }   else{
        res.end(JSON.stringify(result));
     }
		//console.log(JSON.stringify(result));	
		
	});
   
    
});
module.exports = router;