const { isValidObjectId } = require("mongoose");
const ProductModel = require("../../Models/product");

const Product = (req, res) => {

    const ProductId = req.params.ProductId;

    if (!ProductId) {
        return res.status(400).send({ "message": "Product not Found" })
    }


    if (!isValidObjectId(ProductId)) {
        return res.status(400).send({ "message": "Product Not Found" })
    }

    ProductModel.findOne({ _id: ProductId }, (err, product) => {

        if (err) return res.status(501).send({ "message": "Internal Error during fetching Product" });

        if (!product) {
            return res.status(404).send({ "message": "Product not Found" });
        }

        return res.status(200).send(product);

    })



}


module.exports = Product;












