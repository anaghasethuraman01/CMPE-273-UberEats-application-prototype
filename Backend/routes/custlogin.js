//customer login
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');
const bcrypt = require("bcryptjs");
router.post("/", (request, res) => {
    // const email = req.body.email;
    const password = request.body.password;
    const req=request.query
    const email =request.body.email;

    const query="SELECT * from users where owner = 0 AND email=?";
    const params=[request.body.email]
    connection.query(query,params,(err,result1) => {
    if(err) throw err;
    //const encryptedpassword = bcrypt.hashSync(request.body.password, 10);
    var output={}
    if(result1.length!=0)
    {
        var password_hash=result1[0]["password"];
        //console.log(encryptedpassword);
        //console.log(password_hash);
        const verified = bcrypt.compareSync(request.body.password, password_hash);
        //console.log(verified)
        if(verified)
        {
            output["status"]=1;
            let sql1 = "SELECT * FROM userdetails  WHERE EMAIL = " +
                 mysql.escape(email);
                 connection.query(sql1, (error, result) => {
                    
                    if (error) {
                        res.send({ error: error });
                    }
                  
                    if (result.length > 0) {
                        var obj = {
                            status : "found",
                            userid: result1[0].userid,
                            result : result[0],
                        }
                    
                        res.send(obj);							
                    }else{  
                             var obj = {
                                status : "notfound",
                                userid: result1[0].userid,
                                result : result1[0],
                            }
                           
                            res.send(obj);
                    } 
                
                    if(result.length === 0){
                        let post = {
                            userid :result1[0].userid,
                            username: result1[0].username,
                            email: result1[0].email,
                        };
                        
                        let sql = "INSERT INTO userdetails SET ?";
                        connection.query(sql, post, (error, result3) => {
                            //console.log("after insert");
                            //console.log(result3[0]);
                            if (error) {
                                console.log(error.message);
                                //res.send({message:"Invalid credentials"})
                            } else {
                                console.log("USER ADDED");

                            }
                        });
                    }
                });		
                         
        

        }else{
            output["status"]=0;
            output["message"]="Invalid password";
            res.send({ message: "Invalid credentials" });
        }

    }else{
       res.send({ message: "Invalid credentials" });
    }
    //response.json(output)

});
})
    
            

       
      
     
     
module.exports = router;