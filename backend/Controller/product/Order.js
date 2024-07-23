const order = require("../../Models/order");
const ProductModel = require("../../Models/product");
const User = require("../../Models/user");

const Order = (req, res) => {

    const ProductId = req.params.ProductId;

    const description = req.body.description;

    const size = req.body.size;

    const fabrictype = req.body.fabrictype;

    let location = req.body.address;


    // Check user is login or not
    if (!req.user) {
        return res.status(404).send({ "message": "Please Login to Order" });
    }

    // currently taking address from the user each time;
    if (!req.location) {
        if (!location) {
            return res.status(401).send({ "message": "Please add Location" });

        }
    } else {
        location = req.location;
    }


    if (!ProductId) {
        return res.status(403).send({ "message": "Product not Found" })
    }



    ProductModel.findOne({ _id: ProductId }, (err, product) => {

        if (err) return res.status(400).send({ "message": "Internal Error during fetching Product" });

        if (!product) {
            return res.status(403).send({ "message": "Product not Found" });
        }

        const orderedOn = new Date().toLocaleString();

        // return res.status(200).send(product);
        const newOrder = new order({
            productId: product._id,
            OrderPrice: product.price,
            userID: req.user,
            description: description,
            location: location,
            orderedOn: orderedOn,
            orderStatus: 1,
            Customization: {
                fabrictype: fabrictype,
                size: size,
                title: product.title,
                subtitle: product.subtitle
            }
        });

        newOrder.save();

        User.findOneAndUpdate({ _id: req.user }, {
            $push: {
                orders: newOrder._id
            },
            location: location
        },
            { new: true }).exec();


        return res.status(200).send({
            "message": "Your Order Successful",
            "OrderId": newOrder._id
        });


    })

}




module.exports = Order;