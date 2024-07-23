const express = require("express");

const Login = require("../Controller/login");
const register = require("../Controller/register");
const Sample = require("../Controller/Sample");
const Contact = require("../Controller/contact");

// Auth 
const Auth = require("../Middleware/auth");
const authentication = require("../Controller/authentication");

// Product related imports
const AddProduct = require("../Controller/product/add_product");
const ShowProducts = require("../Controller/product/show_products");
const Product = require("../Controller/product/Product");
const Order = require("../Controller/product/Order");
const Profile = require("../Controller/user/profile");
const getAddress = require("../Controller/user/getAddress");
const editProfile = require("../Controller/user/editProfile");
const OrderDetails = require("../Controller/product/OrderDetails");
const updatePassword = require("../Controller/user/updatePassword");
const deleteProfile = require("../Controller/user/deleteProfile");
const app = express.Router();

// auth and profile
app.post("/register", register);
app.post("/login", Login);
app.get("/profile", Auth, Profile);
app.post("/profile/edit", Auth, editProfile);
app.post("/profile/edit/password", Auth, updatePassword)
app.post("/profile/delete", Auth, deleteProfile);

// Contact
app.post("/contact", Contact)

// product
app.post("/product/add", Auth, AddProduct);
app.get("/products", ShowProducts);
app.get("/product/:ProductId", Product);

// order
app.post("/product/order/:ProductId", Auth, Order);
app.get("/product/order/:orderId", Auth, OrderDetails)
app.post("/user/address", Auth, getAddress);

app.get("/secret", Auth, Sample);

// auth 
app.post("/auth", Auth, authentication);




module.exports = app;