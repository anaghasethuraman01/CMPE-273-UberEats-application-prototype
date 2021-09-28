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
const getmenurestaurant = require("./routes/getmenurestaurant");
const restaurantdish = require("./routes/restaurantdish");
const editcustomer = require("./routes/editcustomer");
const custimageupload = require("./routes/custimageupload");
const restimageupload = require("./routes/restimageupload");
const dishimageupload = require("./routes/dishimageupload");
const getrestaurantdishes = require("./routes/getrestaurantdishes");
const getrestaurantdetails = require("./routes/getrestaurantdetails");

app.use("/restlogin", restlogin);
app.use("/custlogin", custlogin);
app.use("/register", register);
app.use("/editrestaurant", editrestaurant);
app.use("/restsearch", restsearch);
app.use("/restdishsearch", restdishsearch);
app.use("/getrestaurant", getrestaurant);
app.use("/getmenurestaurant", getmenurestaurant);
app.use("/restaurantdish", restaurantdish);
app.use("/editcustomer", editcustomer);
app.use("/custimageupload", custimageupload);
app.use("/dishimageupload", dishimageupload);
app.use("/getrestaurantdishes", getrestaurantdishes);
app.use("/getrestaurantdetails", getrestaurantdetails);
app.use("/restimageupload",restimageupload);


const port = process.env.PORT || 5000;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;