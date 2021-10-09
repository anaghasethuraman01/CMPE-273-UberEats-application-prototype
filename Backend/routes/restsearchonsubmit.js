//searching restaurant based on city name
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

function notNullOrEmpty(str) {
    return str != null & str != ""
}
router.post('/', function(req,res){
    //console.log("Inside Restaurant Search");   
	const city = req.body.city;
    const foodtype = req.body.foodtype;
    const deliverytype = req.body.deliverytype; 
    const dishname = req.body.dish;
     //console.log(req.body);
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    let sqlrestaurant = null;
    if (notNullOrEmpty(city) || notNullOrEmpty(foodtype) || notNullOrEmpty(deliverytype)) {
        sqlrestaurant = "SELECT * FROM restaurant WHERE "; 
        if(notNullOrEmpty(city) ){
            sqlrestaurant = sqlrestaurant + "CITY = "+mysql.escape(city) + " AND " ;
        } 
        if(notNullOrEmpty(foodtype) && foodtype != "All"){
            sqlrestaurant = sqlrestaurant + "FOODTYPE = "+mysql.escape(foodtype) + " AND " ;
        } 
        if(notNullOrEmpty(deliverytype) && deliverytype != "All" ){
            sqlrestaurant = sqlrestaurant + "DELIVERYTYPE = "+mysql.escape(deliverytype) + " AND " ;
        }  
        if(sqlrestaurant.endsWith(" AND ")){ 
            sqlrestaurant = sqlrestaurant.substring(0,sqlrestaurant.length-5);
        }
    }
    let sqldishname = null;
	if (notNullOrEmpty(dishname)) {
        sqldishname = " Select * FROM restaurant WHERE restaurantid IN "+ 
        "( SELECT restaurantid FROM restaurantdishes where dishname = " 
        + mysql.escape(dishname)+" )";
    }
    let sqlquery = null;
    if (sqlrestaurant == null || sqldishname == null) {
        sqlquery = sqlrestaurant==null?sqldishname:sqlrestaurant;
    } else {

        sqlquery = "select * from restaurant r join restaurantdishes d "
        + "on r.restaurantid = d.restaurantid where d.dishname = " 
        + mysql.escape(dishname);
        
        if (notNullOrEmpty(city)) {
            sqlquery = sqlquery + " and r.city = " + mysql.escape(city);
        }

        if (notNullOrEmpty(foodtype)) {
            sqlquery = sqlquery + " and r.foodtype = " + mysql.escape(foodtype)
        }

        if (notNullOrEmpty(deliverytype)) {
            sqlquery = sqlquery + " and r.deliverytype = " + mysql.escape(deliverytype)
        }
    }
    if (sqlquery == null) {
        sqlquery = "SELECT * FROM restaurant"
    }
    // console.log(sqldishname);
    
    // console.log(sqlrestaurant);
  //  console.log(sqlquery);
    
   connection.query(sqlquery, (error, result) => {
	
    if (error) {
        console.log(error.message);
                //res.send({ error: error });
        }
		//console.log(result);
		res.end(JSON.stringify(result));
		
	});  
});
module.exports = router;
