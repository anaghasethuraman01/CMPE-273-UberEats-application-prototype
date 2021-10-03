//searching restaurant based on city name
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post('/', function(req,res){
    //console.log("Inside Restaurant Search");   
	const city = req.body.city;
    const foodtype = req.body.foodtype;
    const deliverytype = req.body.deliverytype; 
     console.log(req.body);
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
	let sql = "SELECT * FROM restaurant WHERE "; 
    if(city != null & city != "" ){
        sql = sql + "CITY = "+mysql.escape(city) + " AND " ;
    } 
    if(foodtype != null && foodtype != "" && foodtype != "All"){
        sql = sql + "FOODTYPE = "+mysql.escape(foodtype) + " AND " ;
    } 
    if(deliverytype != null && deliverytype != "" && deliverytype != "All" ){
        sql = sql + "DELIVERYTYPE = "+mysql.escape(deliverytype) + " AND " ;
    } 
    if(sql.endsWith(" AND ")){ 
       sql = sql.substring(0,sql.length-5);
    }
    if(sql.endsWith(" WHERE ")){ 
       sql = sql.substring(0,sql.length-6);
    }
    console.log(sql)
    
    let query = connection.query(sql, (error, result) => {
	
    if (error) {
                res.send({ error: error });
        }
		//console.log(result);
		res.end(JSON.stringify(result));
		
	});  
});
module.exports = router;
