const app = require('./app');

const restlogin = require("./routes/restlogin");
const custlogin = require("./routes/custlogin");
const register = require("./routes/register");
const editrestaurant = require("./routes/editrestaurant");
const restsearch = require("./routes/restsearch");
const getrestaurant = require("./routes/getrestaurant");
const restaurantdish = require("./routes/restaurantdish");
const editcustomer = require("./routes/editcustomer");

app.use("/restlogin", restlogin);
app.use("/custlogin", custlogin);
app.use("/register", register);
app.use("/editrestaurant", editrestaurant);
app.use("/restsearch", restsearch);
app.use("/getrestaurant", getrestaurant);
app.use("/restaurantdish", restaurantdish);
app.use("/editcustomer", editcustomer);

const port = process.env.PORT || 5000;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;