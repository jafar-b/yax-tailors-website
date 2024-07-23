const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    img: {
        type: String,
        required: [true, "imgurl required"],
    },
    title: {
        type: String,
        required: [true, "title required"],
    },
    subtitle: {
        type: String,
        required: [true, "subtitle required"],
    },
    description: {
        type: String,
        required: [true, "description required"],
    },
    price: {
        type: String,
        required: [true, "Price required"],
    },
    mrp: {
        type: String,
        required: [true, "Mrp required"],
    },
    rating: {
        type: String,
        required: [true, "Rating required"],
    },
    ratingCount: {
        type: String,
        required: [true, "Rating Count required"],
    }
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;