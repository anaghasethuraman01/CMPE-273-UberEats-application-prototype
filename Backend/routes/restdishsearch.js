//searching restaurants based on dishname
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post('/', function(req,res){
    console.log("Inside Dish Search");   
	const dish = req.body.dish;
    console.log(dish);
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
	 let sql1 = "SELECT restaurantid FROM restaurantdishes WHERE dishname = "
     +mysql.escape(dish) ;
     let query = connection.query(sql1, (error, result) => {
        console.log(result.body);
    if (error) {
                res.send({ error: error });
        }
    var rest =[];
 	for(var i = 0 ;i<result.length;i++){
         var item = JSON.stringify(result[i].restaurantid);
        if(!rest.includes(item)){  
            rest.push(item);  
         }  
     }
     console.log(rest);	
     var newrest=[]
     var restfinal =[{"restdetailid":"","restaurantid":"","username":"","email":"","phone":"","zipcode":"","description":"","timing":"","deliverytype":"","foodtype":"","city":"","days":""}];

     let sql2 = "SELECT * FROM restaurant WHERE restaurantid IN ("
         + mysql.escape(rest) + " ) " ;
         console.log(sql2);
         let query = connection.query(sql2, (error, result1) => {
             console.log(result1);
             if (error) {
                    res.send({ error: error });
                }else{
                    res.end(JSON.stringify(result1));
                }
         });
    //  for( var j = 0;j<rest.length;j++){
    //     let sql2 = "SELECT * FROM restaurant WHERE restaurantid = "
    //     +mysql.escape(rest[j]) ;
        
    //     let query = connection.query(sql2, (error, result1) => {
    //         res.end(JSON.stringify(result1));
    //       //newrest[j].restaurantid=(result1.restaurantid);  
    //         if (error) {
    //                     res.send({ error: error });
    //             }
    //         });
           
    //  }
//console.log(newrest);
    
	// 	res.end(JSON.stringify(result));
	//console.log(JSON.stringify(result[0].restaurantid));	
	// 	//res.end(JSON.stringify(result));
	 });  
});
module.exports = router;
