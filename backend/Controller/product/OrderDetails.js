const { isValidObjectId } = require("mongoose");
const order = require("../../Models/order");

const OrderDetails = (req, res) => {

    if (!req.user) {
        return res.status(400).send({ "message": "Please Login to see Your Orders" });
    }

    let orderId = req.params.orderId;

    if (!orderId || orderId === "undefined" || !isValidObjectId(orderId)) {
        return res.status(400).send({ "message": "Please Enter Valid Order ID" });
    }

    order.findOne({ _id: orderId }, (err, order) => {

        if (err) {
            return res.status(501).send({ message: "Something went wrong" })
        }

        if (!order) {
            return res.status(404).send({ message: "Order Details not Found" })
        }

        return res.status(200).send(order);
    })
}

module.exports = OrderDetails;