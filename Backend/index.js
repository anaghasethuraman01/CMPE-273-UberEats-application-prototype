const app = require('./app');
const express = require("express");


app.use(express.static('uploads'));


const restlogin = require("./routes/restlogin");
const custlogin = require("./routes/custlogin");
const register = require("./routes/register");
const editrestaurant = require("./routes/editrestaurant");
const restsearch = require("./routes/restsearch");
const restdishsearch = require("./routes/restdishsearch");
const getrestaurant = require("./routes/getrestaurant");
const restaurantdish = require("./routes/restaurantdish");
const editcustomer = require("./routes/editcustomer");
const custimageupload = require("./routes/custimageupload");
const dishimageupload = require("./routes/dishimageupload");



app.use("/restlogin", restlogin);
app.use("/custlogin", custlogin);
app.use("/register", register);
app.use("/editrestaurant", editrestaurant);
app.use("/restsearch", restsearch);
app.use("/restdishsearch", restdishsearch);
app.use("/getrestaurant", getrestaurant);
app.use("/restaurantdish", restaurantdish);
app.use("/editcustomer", editcustomer);
app.use("/custimageupload", custimageupload);
app.use("/dishimageupload", dishimageupload);



// var mysql = require("mysql");
// const connection = require('./connection.js');

// var bodyParser = require("body-parser");
// const express = require("express");

// app.use(express.static('uploads'));
// const multer = require('multer');

// var storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         console.log(req.body);
//         callBack(null,'./uploads')     // './public/images/' directory name where save the file
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, new Date().toISOString()+file.originalname);
//     }
// })
// var upload = multer({
//     storage: storage
// });


// app.post("/custimageupload", upload.single('file'), (req, res) => {
// 	const img = req.file.filename;
// 	const userid = req.body.userid;
// 	console.log(img);
//     if (!req.file) {
//         console.log("No file upload");
//     } else {
//         const img = req.file.filename;
// 		let sql = "UPDATE userdetails SET profilepic = "+mysql.escape(img) +
//                "  WHERE USERID = "+mysql.escape(userid);
// 			   connection.query(sql, (error, result) => {
// 				if(error){
// 					console.log(error.message);
// 				}else{
// 					//localStorage.setItem("profile",mysql.escape(img))
// 					//console.log(req.file.filename);
// 					res.send(req.file.filename);

// 				}
//             });

//     }
// });











const port = process.env.PORT || 5000;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;