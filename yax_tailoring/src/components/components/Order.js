// Order Component
import React, { useEffect, useState } from 'react'
import Product from "./Product"
import Cookies from 'universal-cookie';
import "../style/Order.css"
import OrderCustomizationShow from './OrderCustomizationShow';

const cookies = new Cookies()
export const Order = ({ orderId }) => {

    const token_id = cookies.get("token_id");
    const [orderDetails, setOrderDetails] = useState({});
    const [product, setProduct] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState("");


    // Fetch Order Details when page is loaded
    useEffect(() => {
        getOrderDetails(orderId)
    }, []);


    // fetch perticular order details

    const getOrderDetails = async (orderId) => {
        setLoading(true);

        let headersList = {
            "Accept": "*/*",
            token_id: token_id
        }

        let response = await fetch(`http://localhost:5000/product/order/${orderId}`, {
            method: "GET",
            headers: headersList
        });

        let data = await response.json();
        console.log(data);

        if (response.ok) {

            setOrderDetails(data);

            // fetch Product
            await fetchProduct(data.productId)

        } else {
            setError(data.message)
        }
        setLoading(false)


    }



    // Fetch product details
    const fetchProduct = async (productID) => {

        // loading start
        setLoading(true);

        let headersList = {
            "Accept": "*/*"
        }

        let response = await fetch(`http://localhost:5000/product/${productID}`, {
            method: "GET",
            headers: headersList
        });

        let data = await response.json();

        if (response.ok) {
            setProduct(data);
        } else {
            setError(data.message);
        }

        // loading false 
        setLoading(false);

    }


    return (
        <div className='order-container m-1'>

            {/* Loading */}
            {
                isLoading === true ?
                    <div className="d-flex justify-content-center mb-2 mt-0">
                        <div className="spinner-border text-danger" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>

                    :

                    /* Error */
                    isError !== "" ?
                        <div>
                            <div className="alert alert-danger">
                                {isError}
                            </div>
                        </div>

                        :

                        Object.keys(orderDetails).length === 0 ?
                            <div>
                                <div className="alert alert-danger">
                                    Product Not Found..
                                </div>
                            </div>

                            :

                            <div className="p-2 d-flex flex-sm-row justify-content-center  flex-column flex-wrap align-items-center">

                                {/* Side Product Details */}

                                <Product product={product} />

                                {/* Order Details */}
                                <div className="order m-3">
                                    <div className="order-info m-3">

                                        {/* Title Customizetion */}
                                        <strong className='order-info-title mt-1 mb-1'>
                                            Order Details:
                                        </strong>

                                        {/* Fibric Type */}
                                        <OrderCustomizationShow title={"Fibric"} value={orderDetails.Customization.fabrictype} />

                                        {/* Cloth Size */}
                                        <OrderCustomizationShow title={"Size"} value={orderDetails.Customization.size} />

                                        {/*Order Description*/}
                                        <OrderCustomizationShow title={"Description"} value={orderDetails.description === "" ? "..." : orderDetails.description} />

                                        {/* Shipping Location */}
                                        <OrderCustomizationShow title={"Shpping Location"} value={orderDetails.location} />

                                        {/* Order Status */}
                                        <OrderCustomizationShow title={"Order Status"} value={

                                            orderDetails.orderStatus === undefined ?
                                                "..." : orderDetails.orderStatus === "" ?
                                                    "..." : orderDetails.orderStatus === 1 ?
                                                        "Order Placed." : orderDetails.orderStatus === 2 ?
                                                            "Order Delivered." : orderDetails.orderStatus === 0 ? "Order Canceled." : null} />


                                        {/* Order Price*/}
                                        <OrderCustomizationShow title={"Order Price"} value={orderDetails.OrderPrice} currency={true} />


                                        {/* Ordered On: */}
                                        <OrderCustomizationShow title={"Ordered On"} value={orderDetails.orderedOn} />

                                        {/* Order ID */}
                                        <OrderCustomizationShow title={"Order ID"} value={orderDetails._id} />


                                        {/* For admin show all the details */}

                                    </div>

                                </div>

                            </div>


            }
        </div>
    )
}
