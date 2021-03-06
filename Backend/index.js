const app = require('./app');
const express = require("express");

app.use(express.static('uploads'));

const restlogin = require("./routes/restlogin");
const custlogin = require("./routes/custlogin");
const register = require("./routes/register");
const editrestaurant = require("./routes/editrestaurant");
const restsearch = require("./routes/restsearch");
const getrestaurant = require("./routes/getrestaurant");
const getrestaurantwithcity = require("./routes/getrestaurantwithcity");
const getmenurestaurant = require("./routes/getmenurestaurant");
const restaurantdish = require("./routes/restaurantdish");
const editcustomer = require("./routes/editcustomer");
const custimageupload = require("./routes/custimageupload");
const restimageupload = require("./routes/restimageupload");
const dishimageupload = require("./routes/dishimageupload");
const getrestaurantdishes = require("./routes/getrestaurantdishes");
const getrestaurantdetails = require("./routes/getrestaurantdetails");
const restsearchonsubmit = require("./routes/restsearchonsubmit");
const addtofavourites = require("./routes/addtofavourites");
const getfavouriterestaurant = require("./routes/getfavouriterestaurant");
const addtocarttable = require("./routes/addtocarttable");
const getcartitem = require("./routes/getcartitem");
const handleneworder = require("./routes/handleneworder");
const getorderaddress = require("./routes/getorderaddress");
const placeorder = require("./routes/placeorder");
const getitemsfromorders = require("./routes/getitemsfromorders");
const getrestaurantorders = require("./routes/getrestaurantorders");
const getorderreceipt= require("./routes/getorderreceipt");
const updateordertype = require("./routes/updateordertype");
const handleordersearch = require("./routes/handleordersearch");
const handleordermodesearch = require("./routes/handleordermodesearch");
const getrestaurantwithid = require("./routes/getrestaurantwithid")
const editrestaurantdishes = require("./routes/editrestaurantdishes")
const getcustomerprofile = require("./routes/getcustomerprofile")
const getrestaurantprofile = require("./routes/getrestaurantprofile")

app.use("/restlogin", restlogin);
app.use("/custlogin", custlogin);
app.use("/register", register);
app.use("/editrestaurant", editrestaurant);
app.use("/restsearch", restsearch);
app.use("/getrestaurant", getrestaurant);
app.use("/getrestaurantwithcity", getrestaurantwithcity);
app.use("/getmenurestaurant", getmenurestaurant);
app.use("/restaurantdish", restaurantdish);
app.use("/editcustomer", editcustomer);
app.use("/custimageupload", custimageupload);
app.use("/dishimageupload", dishimageupload);
app.use("/getrestaurantdishes", getrestaurantdishes);
app.use("/getrestaurantdetails", getrestaurantdetails);  
app.use("/restimageupload",restimageupload);
app.use("/restsearchonsubmit",restsearchonsubmit);
app.use("/addtofavourites",addtofavourites);
app.use("/getfavouriterestaurant",getfavouriterestaurant);
app.use("/addtocarttable",addtocarttable);
app.use("/getcartitem",getcartitem);
app.use("/handleneworder",handleneworder);
app.use("/getorderaddress",getorderaddress);
app.use("/placeorder",placeorder);
app.use("/getitemsfromorders",getitemsfromorders);
app.use("/getrestaurantorders",getrestaurantorders);
app.use("/getorderreceipt",getorderreceipt);
app.use("/updateordertype",updateordertype);
app.use("/handleordersearch",handleordersearch);
app.use("/handleordermodesearch",handleordermodesearch);
app.use("/getrestaurantwithid",getrestaurantwithid);
app.use("/editrestaurantdishes",editrestaurantdishes);
app.use("/getcustomerprofile",getcustomerprofile);
app.use("/getrestaurantprofile",getrestaurantprofile);

const port = process.env.PORT || 5000;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});  

module.exports = app;