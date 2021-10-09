//edit restaurant profile
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post("/", (req, res) => {
    console.log(req.body);
   const restaurantid = req.body.restaurantid
   const restaurantname = req.body.restaurantname;
   const email = req.body.email;
   const zipcode = req.body.zipcode;
   const phone =  req.body.phone;
   const description =  req.body.description;
   const timing =  req.body.timing;
   const city =  req.body.city;
   const days =  req.body.days;
   const deliverytype =  req.body.deliverytype;
   const foodtype =  req.body.foodtype;
   const profilepic = req.body.restprofilepic;
   let sql1 = "SELECT * FROM restaurant  WHERE RESTAURANTID = " + mysql.escape(restaurantid);
   connection.query(sql1, (error, result1) => {
       if (error) {
           console.log("Connection Error!");
       }
       if(result1.length > 0){
           let sql3 = "DELETE  FROM restaurant WHERE RESTAURANTID = " + mysql.escape(restaurantid);
           //console.log(sql3)
           connection.query(sql3, (error, result2) => {
               if(error){
                   console.log(error.message);
               }else{
                   console.log("row deleted")
               }
           });
       
   let post = {
           restaurantid:restaurantid,
           username: restaurantname,
           email: email,
           zipcode: zipcode,
           phone : phone,
           description : description,
           timing :timing,
           city:city,
           deliverytype:deliverytype,
           days:days,
           foodtype:foodtype,
           profilepic:profilepic	
       };
       
         console.log(post);
       let sql = "INSERT INTO restaurant SET ?";
       let q = connection.query(sql, post, (error, result3) => {
       if (error) {
           console.log(error.message);
                   //res.send({message:"Invalid credentials"})
       } else {
               console.log("USER ADDED");
               
               let sql = "SELECT * FROM restaurant  WHERE RESTAURANTID = " + mysql.escape(restaurantid);
                   connection.query(sql, (error, result5) => {
                       //console.log(sql);
                       //console.log(result5[0]);
                   if (error) {
                       console.log("Connection Error!");
                   }else{
                   
                       console.log(result5[0]);
                       res.send(result5[0]);
                   }
               });	
           }
       });
       }
           //console.log(restaurantid);
            let sql2 = "UPDATE users SET USERNAME = "+mysql.escape(restaurantname) +
             ", EMAIL = "+mysql.escape(email) + 
             ", ZIPCODE =" +mysql.escape(zipcode) +
              "  WHERE USERID = "+mysql.escape(restaurantid);
           //console.log(sql2);
           connection.query(sql2, (error, result4) => {
               if(error){
                   console.log(error.message);
               }else{
                   
                   console.log("column updated")
               }
           });
       
    });
   
});
module.exports = router;