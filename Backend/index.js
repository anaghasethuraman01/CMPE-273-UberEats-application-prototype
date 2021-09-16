var express = require("express");
var mysql = require("mysql");
// var connection = require('./configFiles/createConnection');
var bodyParser = require("body-parser");

var cookieParser = require("cookie-parser");

const cors = require("cors");
//const login = require('./routes/login');
// const register = require('./routes/register');
var app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

var connection = mysql.createConnection({
	host: "database-1.cqtvbve6qkgo.us-east-2.rds.amazonaws.com",
	user: "anagha",
	password: "Anagha123",
	database: "ubereatsdb",
	port: "3306",
});

connection.connect(function (err) {
	if (err) {
		throw err;
	} else {
		console.log("connected");
	}
});

app.post("/login", (req, res) => {
		const email = req.body.email;
		const password = req.body.password;
		let sql =
			"SELECT * FROM users  WHERE EMAIL = " +
			mysql.escape(email) +
			"AND PASSWORD = " +
			mysql.escape(password);
		let query = connection.query(sql, (error, result) => {
			if (error) {
	            console.log("Error here");
				res.send({ err: err });     
			}
			if (result.length > 0) {
	            res.send(result[0])
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
			"AND PASSWORD = " +
			mysql.escape(password);
			let query = connection.query(sql, (error, result) => {
			if (error) {
	            console.log("Error here");
				res.send({ err: err });     
			}
			if (result.length > 0) {
				let sql1 = "SELECT * FROM restaurant  WHERE EMAIL = " +
 					mysql.escape(email);
					
					 let query = connection.query(sql1, (error, result) => {
							if (error) {
								res.send({ error: error });
							}
							if (result.length > 0) {
								console.log(result[0]);
							
								res.send(result[0])
									
							}
						});					 

			} else {
				res.send({ message: "Invalid credentials" });
			}
		});
	});


// app.post("/login", (req, res) => {
//    console.log(req.body);
// 	const email = req.body.email;
// 	const password = req.body.password;
// 	let sql =
// 		"SELECT * FROM users  WHERE EMAIL = " +
// 		mysql.escape(email) +
// 		"AND PASSWORD = " +
// 		mysql.escape(password);
// 	console.log(sql);
// 	let query = connection.query(sql, (error, result) => {
// 		if (error) {
//             console.log("Error here");
// 			//res.send({ err: err });     
// 		}
// 		if (result.length > 0) {
// 			if(result[0].OWNER == 1);{

// 			let sql1 = "SELECT * FROM restaurant  WHERE EMAIL = " +
// 					mysql.escape(email);

// 			let query = connection.query(sql1, (error, result) => {
// 				if (error) {
// 					//res.send({ err: err });
// 				}
// 				if (result.length > 0) {
// 					console.log(result[0]);
// 					res.send(result[0])
// 					//res.send({ username: result[0].USERNAME });
			
// 				} else {
// 					res.send({ message: "Invalid credentials" });
// 				}
// 			});
// 			}
//            // res.send(result[0].OWNER)
// 		} else {
// 			res.send({ message: "Invalid credentials" });
// 		}
// 	});
// });

app.post("/register", (req, res) => {
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
				USERNAME: username,
				EMAIL: email,
				PASSWORD: password,
				ZIPCODE: zipcode,
				OWNER: owner,
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



app.post("/getrestaurantdetails", (req, res) => {
	const email = req.body.email;
	let sql =
		"SELECT * FROM restaurant  WHERE EMAIL = " +
		mysql.escape(email);
	let query = connection.query(sql, (error, result) => {
		if (error) {
			res.send({ err: err });
		}
		if (result.length > 0) {
            console.log(result[0]);
            res.send(result[0])
			//res.send({ username: result[0].USERNAME });
    
		} else {
			res.send({ message: "Invalid credentials" });
		}
	});
});
app.post("/editrestuarant", (req, res) => {
	console.log("here now");
	const restaurantname = req.body.restaurantname;
	const email = req.body.email;
	const zipcode = req.body.zipcode;
	const phone =  req.body.phone;
	const description =  req.body.description;
	const timing =  req.body.timing;
	let sql1 = "SELECT * FROM restaurant  WHERE EMAIL = " + mysql.escape(email);
	connection.query(sql1, (error, result) => {
		 console.log(result.length);
		if (error) {
			console.log("Connection Error!");
		}
		if (result.length > 0) {
			let sql2 = "UPDATE users SET USERNAME = "+mysql.escape(restaurantname)+" WHERE EMAIL = "+mysql.escape(email);
			console.log(sql2);
			connection.query(sql2, (error, result) => {
				if(error){
					console.log(error.message);
				}else{
					console.log("column updated")
				}
			});
			let sql3 = "DELETE  FROM restaurant WHERE EMAIL = "+mysql.escape(email);
			
			connection.query(sql3, (error, result) => {
				if(error){
					console.log("row cannot be deleted");
				}else{
					console.log("row deleted")
				}
			});
		}
	

	let post = {
		RESTAURANTNAME: restaurantname,
		EMAIL: email,
		ZIPCODE: zipcode,
		PHONE : phone,
		DESCRIPTION : description,
		TIMING :timing	
	};
	
		let sql = "INSERT INTO restaurant SET ?";
		let q = connection.query(sql, post, (error, result) => {
		if (error) {
			console.log(error.message);
					//res.send({message:"Invalid credentials"})
		} else {
				console.log("USER ADDED");
				res.send("Row added");
			}
		});
	
	});
});

const port = process.env.PORT || 5000;
app.listen(port);
