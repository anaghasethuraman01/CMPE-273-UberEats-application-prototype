var express = require("express");
var mysql = require("mysql");
const connection = require('./connection');


var bodyParser = require("body-parser");
//var cookieParser = require("cookie-parser");
var app = express();
var multer = require('multer')
const cors = require("cors");

// const register = require('./routes/register');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
app.use(bodyParser.json());
//app.use(cookieParser());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	cb(null, 'public')
  },
  filename: function (req, file, cb) {
	cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')


	app.post("/custlogin", (req, res) => {
		const email = req.body.email;
		const password = req.body.password;
      
		let sql = 
			"SELECT * FROM users  WHERE EMAIL = " +
			mysql.escape(email) +
			" AND PASSWORD = " +
			mysql.escape(password);
		
			let query = connection.query(sql, (error, result1) => {
                
                if (error) {
                    console.log("Error here");
                    res.send({ error: error });     
                }
			if (result1.length > 0) {
				let sql1 = "SELECT * FROM userdetails  WHERE EMAIL = " +
 					mysql.escape(email);
                     let query = connection.query(sql1, (error, result) => {
						
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

	app.post("/restlogin", (req, res) => {
		const email = req.body.email;
		const password = req.body.password;
       
		let sql = 
			"SELECT * FROM users  WHERE EMAIL = " +
			mysql.escape(email) +
			" AND PASSWORD = " +
			mysql.escape(password);
		console.log(sql)
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
                                console.log(result1[0]+"Hiiiii");
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

app.post('/upload',function(req, res) {
		console.log(req.body)
		upload(req, res, function (err) {
			 
			   if (err instanceof multer.MulterError) {
				   return res.status(500).json(err)
				   console.log(err.message)
			   } else if (err) {
				   console.log(err.message)
				   return res.status(500).json(err)
			   }
		  return res.status(200).send(req.file)
	
		})
	
	});
app.post("/register", (req, res) => {
	console.log(req.body);
	const username = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	//const restaurantname = req.body.restaurantname;
	const zipcode = req.body.zipcode;
	const owner = req.body.owner;
	console.log(req.body);
	let sql = "SELECT * FROM users  WHERE EMAIL = " + mysql.escape(email);
	let query = connection.query(sql, (error, result) => {
		if (error) {
			console.log("Connection Error!");
		}
		if (result.length == 0) {
			let post = {
				username: username,
				email: email,
				password: password,
				zipcode: zipcode,
				owner: owner,
			};
			let sql = "INSERT INTO users SET ?";
			connection.query(sql, post, (error, result) => {
				if (error) {
					console.log("Error");
					//res.send({message:"Invalid credentials"})
				} else {
					console.log("USER ADDED");
					res.send("Row added");
				}
			});
		} else {
			res.send({ message: "User email already registered" });
		}
	});
});

// app.post("/getcustomerdetails", (req, res) => {
// 	const email = req.body.email;
// 	const id = req.body.id;
// 	let sql =
// 		"SELECT * FROM userdetails  WHERE USERID = " +
// 		mysql.escape(id);
// 		console.log(sql);
// 	let query = connection.query(sql, (error, result) => {
// 		if (error) {
// 			res.send({ err: err });
// 		}
// 		if (result.length > 0) {
//             console.log(result[0]);
//             res.send(result[0])
// 			//res.send({ username: result[0].USERNAME });
    
// 		} else {
// 			res.send({ message: "Invalid credentials" });
// 		}
// 	});
// });
// app.post("/getrestaurantdetails", (req, res) => {
// 	const email = req.body.email;
// 	const id = req.body.id;
// 	let sql =
// 		"SELECT * FROM restaurant  WHERE RESTAURANTID = " +
// 		mysql.escape(id);
// 		console.log(sql);
// 	let query = connection.query(sql, (error, result) => {
// 		if (error) {
// 			res.send({ err: err });
// 		}
// 		if (result.length > 0) {
//             console.log(result[0]);
//             res.send(result[0])
// 			//res.send({ username: result[0].USERNAME });
    
// 		} else {
// 			res.send({ message: "Invalid credentials" });
// 		}
// 	});
// });
app.post("/editrestuarant", (req, res) => {
   
    const restaurantid = req.body.restaurantid
	const restaurantname = req.body.restaurantname;
	const email = req.body.email;
	const zipcode = req.body.zipcode;
	const phone =  req.body.phone;
	const description =  req.body.description;
	const timing =  req.body.timing;
	let sql1 = "SELECT * FROM restaurant  WHERE RESTAURANTID = " + mysql.escape(restaurantid);
	connection.query(sql1, (error, result1) => {
		if (error) {
			console.log("Connection Error!");
		}
        if(result1.length > 0){
            let sql3 = "DELETE  FROM restaurant WHERE RESTAURANTID = " + mysql.escape(restaurantid);
            console.log(sql3)
			connection.query(sql3, (error, result2) => {
				if(error){
					console.log(error.message);
				}else{
					console.log("row deleted")
				}
			});
        }
    let post = {
            restaurantid:restaurantid,
        	username: restaurantname,
        	email: email,
        	zipcode: zipcode,
        	phone : phone,
        	description : description,
        	timing :timing	
        };
        let sql = "INSERT INTO restaurant SET ?";
		let q = connection.query(sql, post, (error, result3) => {
		if (error) {
			console.log(error.message);
					//res.send({message:"Invalid credentials"})
		} else {
				console.log("USER ADDED");
				res.send("Row added");
			}
		});
            console.log(restaurantid);
         	let sql2 = "UPDATE users SET USERNAME = "+mysql.escape(restaurantname) +
              ", EMAIL = "+mysql.escape(email) + 
              ", ZIPCODE =" +mysql.escape(zipcode) +
               "  WHERE USERID = "+mysql.escape(restaurantid);
			console.log(sql2);
			connection.query(sql2, (error, result4) => {
				if(error){
					console.log(error.message);
				}else{
					
					console.log("column updated")
				}
            });
		
    });
	
});


app.post("/restaurantdish", (req, res) => {
	console.log(req.body);

	const dishname = req.body.dishname;
	const ingrediants = req.body.ingrediants;
	const price = req.body.price;
	const description = req.body.description;
	const category = req.body.category;
	const restaurantid = req.body.restaurantid;

	let post = {
        dishname: dishname,
        ingrediants: ingrediants,
        price: price,
        description: description,
        category: category,
        restaurantid:restaurantid
		};
			let sql = "INSERT INTO restaurantdishes SET ?";
			connection.query(sql, post, (error, result) => {
				if (error) {
					console.log("Error");
					//res.send({message:"Invalid credentials"})
				} else {
					console.log("USER ADDED");
					res.send("Row added");
				}
			});
		
	
});
app.post("/editcustomer", (req, res) => {
	console.log("hi anu");
   console.log(req.body);
  	const userid = req.body.userid
	const username = req.body.username;
	const email = req.body.email;
	const phone = req.body.phone;
	const about =  req.body.about;
	const dob =  req.body.dob;
	const state =  req.body.state;
	const city =  req.body.city;
	const country =  req.body.country;
	const nickname =  req.body.nickname;
	let sql1 = "SELECT * FROM userdetails  WHERE USERID = " + mysql.escape(userid);
	connection.query(sql1, (error, result1) => {
		
		if (error) {
			console.log("Connection Error!");
		}
        if(result1.length > 0){
            let sql3 = "DELETE  FROM userdetails WHERE USERID = " + mysql.escape(userid);
            console.log(sql3)
			connection.query(sql3, (error, result2) => {
				if(error){
					console.log(error.message);
				}else{
					console.log("row deleted")
				}
			});
        }
		let post = {
			userid:userid,
				username: username,
				email: email,
				phone : phone,
				about:about,
				dob:dob,
				state :state,
				city:city,
				country:country,
				nickname:nickname
			};
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
						console.log(result5[0]);
					if (error) {
						console.log("Connection Error!");
					}else{

						res.send(result5[0]);
					}
				});	
			}
		});
            
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


const port = process.env.PORT || 5000;
app.listen(port);
