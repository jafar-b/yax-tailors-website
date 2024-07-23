const Product = require("../../Models/product");
const AddProduct = (req, res) => {
    const img=req.body.img;
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const description = req.body.description;
    const price = req.body.price;
    const mrp = req.body.mrp;
    const rating = req.body.rating;
    const ratingCount = req.body.ratingCount;

    if (!title) {
        return res.status(400).send(JSON.stringify({ "message": "Title is Required", "status": 400 }));
    }

    if (!img) {
        return res.status(400).send(JSON.stringify({ "message": "imgurl is Required", "status": 400 }));
    }

    if (!subtitle) {

        return res.status(400).send(JSON.stringify({ "message": "SubTitle is Required!", "status": 400 }));

    }

    if (!description) {
        return res.status(400).send(JSON.stringify({ "message": "Description is Required.", "status": 400 }));

    }
    if (!price) {
        return res.status(400).send(JSON.stringify({ "message": "Price is Required.", "status": 400 }));

    }
    if (!mrp) {
        return res.status(400).send(JSON.stringify({ "message": "MRP is Required.", "status": 400 }));

    }
    if (!rating) {
        return res.status(400).send(JSON.stringify({ "message": "Rating is Required.", "status": 400 }));

    }
    if (!ratingCount) {
        return res.status(400).send(JSON.stringify({ "message": "Rating Count is Required.", "status": 400 }));

    }

    // user login check
    if (!req.user) {
        return res.status(404).send({ "message": "Please Login to add new Product." })
    } else {

        const newProduct = new Product({
            img:img,
            title: title,
            subtitle: subtitle,
            description: description,
            price,
            mrp,
            rating,
            ratingCount
        });

        newProduct.save();

        return res.status(200).send({
            "message": "Product Added Successfully!"
        })

    }

}
module.exports = AddProduct;
