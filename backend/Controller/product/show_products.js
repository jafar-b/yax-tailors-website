const Product = require("../../Models/product");

const ShowProducts = (req, res) => {

    Product.find({}, (err, product) => {
        if (err) return res.status(401).send({ "message": "Something went wrong" });

        if (!product) {
            return res.status(401).send({
                "message": "No products Found"
            })
        }

        return res.status(200).send(product);
    })

}

module.exports = ShowProducts;