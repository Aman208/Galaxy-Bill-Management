
const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();


const {BACKEND_HOST , MONGO_CONNECTION} = process.env;
const CustomerRoute = require("./routes/CustomerRoute.js");
const PricingRoute = require("./routes/PricingRoute.js");
const ProductRoute = require("./routes/ProductRoute.js")
const BillRoute = require("./routes/BillRoute.js")
const PaymentRoute = require("./routes/PaymentRoute.js")


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/myAppAman', { useNewUrlParser: true });


app.listen(BACKEND_HOST, () => {
    console.log("App listening on port " + BACKEND_HOST);
})
app.use(CustomerRoute)
app.use(PricingRoute)
app.use(BillRoute)
app.use(ProductRoute)
app.use(PaymentRoute)


app.get("/", (req, res) => {
    res.send("hello world");
});