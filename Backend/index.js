var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require("body-parser");

var cookieParser = require("cookie-parser");

const cors = require("cors");


app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

var connection = mysql.createConnection({
    host:'database-1.cqtvbve6qkgo.us-east-2.rds.amazonaws.com',
    user:'anagha',
    password:'Anagha123',
    database:'ubereatsdb',
    port:'3306'
});


connection.connect(function(err){
    if(err) {
        throw err;
    }
    else {
        console.log("connected");
    }
});
app.post('/registertable',(req,res) => {

    // const username = req.body.username
    // const emailid = req.body.emailid
    // const password = req.body.password
    console.log("hello");
    console.log(req.body.username);
    console.log(req.body.emailid);
    // let post ={USERNAME : username ,EMAILID:emailid, PASSWORD:password};
    // let sql = 'INSERT INTO users SET ?';
    // let query = connection.query(sql, post, (error, result)=>{
    //     if(!!error){
    //         console.log(error);
    //     }
    //     else {
    //         console.log(result);
    //         res.send('Row added');
    //     }
    // })   
});
const port  = process.env.PORT || 5000;
app.listen(port);



// app.get('/',function(req,res){
//     connection.query("SELECT * FROM sampleDB",function(error,rows,fields){
//         if(!!error){
//             console.log(error);
//         }
//         else {
//             console.log("SQL query successful");
//         }
//     });
// });
