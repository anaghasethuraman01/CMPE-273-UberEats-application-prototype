//register page for customer and restuarant
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require('../connection.js');

router.post("/", (req, res) => {
    console.log(req.body);
    const customerid = req.body.customerid;
    const restaurantid = req.body.restaurantid;
    const datetime = req.body.datetime;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    const orderDetails = req.body.orderDetails;
    let post = {
        customerid:customerid,
        restaurantid:restaurantid,
        datetime:datetime,
        city:city,
        state:state,
        country:country
    }
     let sql = "INSERT INTO orders SET ?";
     connection.query(sql, post, (error, result) => {
     if (error) {
        console.log(error.message);

      } else {
         
          let sqlDet = 'INSERT INTO orderdetails(orderid,dishid,quantity) VALUES ?';
          let orderid = result.insertId;
          
          let records =[];
          orderDetails.forEach((element, index) => {
            records.push([orderid, element.dishid, element.quantity]);
          });
          console.log("****")
        console.log(records);
            connection.query(sqlDet, [records], (error, resultdetails) => {
                if(error){
                    console.log(error.message)
                }
                else{
                    console.log("Details table updated");
                    sqldeletecart = "DELETE FROM placeorder WHERE customerid = "+ mysql.escape(customerid);
                    connection.query(sqldeletecart,(error, resultdelete)=>{
                        if(error){
                            console.log("unable to delete")
                        }else{
                            console.log("Deleted");
                        }
                    } ) 
                }
            })

       }
    });
    // let sql = "SELECT city,state,country FROM userdetails where userid = "+mysql.escape(customerid);
    // console.log(sql);
    // connection.query(sql,(error, result) => {
    //      console.log(result)
    //      if(result.length == 0 ){
    //          console.log("No address");
    //      }else{
    //         //  const address = result['city'];
    //         //  console.log(address)
    //         res.end(JSON.stringify(result));
    //     }
    // });
 
});
module.exports = router;