const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');


router.post("/", (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
   
    let sql = 
        "SELECT * FROM users  WHERE EMAIL = " +
        mysql.escape(email) +
        " AND PASSWORD = " +
        mysql.escape(password)+" AND OWNER = 1";
        
        let query = connection.query(sql, (error, result1) => {
           
            if (error) {
                console.log("Error here");
                res.send({ error: error });     
            }
        if (result1.length > 0) {
            let sql1 = "SELECT * FROM restaurant  WHERE EMAIL = " +
                 mysql.escape(email);
                 let query = connection.query(sql1, (error, result) => {
                    if (error) {
                        res.send({ error: error });
                    }
                    console.log(result[0]);
                    if (result.length > 0) {
                        var obj = {
                            status : "found",
                            userid: result1[0].userid,
                            result : result[0],
                        }
                        console.log(obj);
                        res.send(obj);							
                    }else{  
                             var obj = {
                                status : "notfound",
                                userid: result1[0].userid,
                                result : result1[0],
                            }
                           console.log(obj);
                            res.send(obj);
                    }	
                    if(result.length === 0){
                        let post = {
                            restaurantid :result1[0].userid,
                            username: result1[0].username,
                            email: result1[0].email,
                            zipcode: result1[0].zipcode,
                            
                        };
                        let sql = "INSERT INTO restaurant SET ?";
                        connection.query(sql, post, (error, result) => {
                            if (error) {
                                console.log(error.message);
                                //res.send({message:"Invalid credentials"})
                            } else {
                                console.log("USER ADDED");

                            }
                        });
                    }
                });		
                         
        } else {
            res.send({ message: "Invalid credentials" });
        }
    });
});
module.exports = router;