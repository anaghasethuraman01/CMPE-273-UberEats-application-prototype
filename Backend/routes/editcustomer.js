//edit customer profile
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post("/", (req, res) => {
    	console.log("****");
     console.log(req.body);
        const userid = req.body.userid
        const username = req.body.username;
        const email = req.body.email;
        const phone = req.body.phone;
        const about =  req.body.about;
        const dob =  req.body.dob;
        const state =  req.body.state;
        const city =  req.body.city;
        const address =  req.body.address;
        const country =  req.body.country;
        const nickname =  req.body.nickname;
        const profilepic = req.body.profilepic;
        let sql1 = "SELECT * FROM userdetails  WHERE USERID = " + mysql.escape(userid);
        connection.query(sql1, (error, result1) => {
            
            if (error) {
                console.log("Connection Error!");
            }
            if(result1.length > 0){
                let sql3 = "DELETE  FROM userdetails WHERE USERID = " + mysql.escape(userid);
                //console.log(sql3)
                connection.query(sql3, (error, result2) => {
                    if(error){
                        console.log(error.message);
                    }else{
                        console.log("row deleted")
                    }
                });
            
            let post = {
                    userid:userid,
                    username: username,
                    email: email,
                    phone : phone,
                    about:about,
                    dob:dob,
                    state :state,
                    city:city,
                    address:address,
                    country:country,
                    nickname:nickname,
                    profilepic:profilepic
                };
            console.log(post)
            let sql = "INSERT INTO userdetails SET ?";
            let q = connection.query(sql, post, (error, result3) => {
            if (error) {
               
                console.log(error.message);
                        //res.send({message:"Invalid credentials"})
            } else {
    
                     console.log("USER ADDED");
                      
                    let sql = "SELECT * FROM userdetails  WHERE USERID = " + mysql.escape(userid);
                        connection.query(sql, (error, result5) => {
                             console.log(sql);
                            // console.log(result5[0]);
                        if (error) {
                            console.log("Connection Error!");
                        }else{
                            console.log(result5);
                            res.send(result5[0]);
                        }
                    });	
                }
            });
            }     
                 let sql2 = "UPDATE users SET USERNAME = "+mysql.escape(username) +
                  ", EMAIL = "+mysql.escape(email) + 
                   "  WHERE USERID = "+mysql.escape(userid);
                        console.log(sql2);
                        connection.query(sql2, (error, result4) => {
                            if(error){
                                console.log(error.message);
                            }else{
                                
                                console.log("column updated");
            
                            }
                        });
            
        });
        
    });
    module.exports = router;