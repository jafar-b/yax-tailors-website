// Product Page

import { React, useEffect, useState } from "react";
import "../style/Product-page.css";

import Faq from "./Faq";

import { useParams } from "react-router-dom";
import Modal from "../components/Modal";



const Product = () => {

  // This is for opening popup when ordering
  const [modalState, setModalState] = useState(false);

  // This is product id which we can use to fetch from api
  const productID = useParams().productID;

  // Is loading
  const [isLoading, setLoading] = useState(false);

  // Is Error while loading or fetching from api
  const [isError, setError] = useState("");

  // to save Product details response 
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetchProduct();
  }, [])


  // For modal state handle
  const handalModal = () => {
    setModalState(!modalState);
  }


  // Fetch product details
  const fetchProduct = async () => {

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


  // on click event on  order now
  const onOrderNowEvent = () => {

    // check login before pop up
    setModalState(true);


  }





  return (
    <div className="container">

      {/* Loading */}
      {
        isLoading === true ? <div className="d-flex justify-content-center mb-2 mt-0">
          <div className="spinner-border text-danger" role="status">
            <span className="sr-only"></span>
          </div>
        </div> :

          Object.keys(product).length === 0 ?

            /* Product not  found */

            <div className="alert alert-danger mt-2">

              {
                isError
              }

            </div>

            :

            /* product Found */
            <div>
              <div
                className="container mt-2 mb-2"
                style={{ backgdroundColor: "#fff" }}
                tore
                fetch
              >
                <div className="row d-flex justify-content-center align-items-center h-100 ">

                  <div
                    className="card text-black bg-white product-container p-0 m-0"
                    style={{ borderRadius: "15px" }}
                  >
                    <div className="card-body">
                      <div className="row justify-content-center ">
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 ">
                          <div className="img-fluid ">
                            <img
                              src={product.img}
                              className="product-img"
                              alt="product image"
                            />
                          </div>
                        </div>
                        <div className="col-md-10 col-lg-6 col-xl-7 align-items-center order-2 order-lg-2 ">
                          <div className="card-body">

                            {/* Title container */}
                            <div className="product-title-container">

                              <p className="product-title">{product.title}</p>
                              <p className="product-subtitle">{product.subtitle}</p>
                            </div>

                            {/* Rating Container */}
                            <div className="product-rating-container">
                              <div className="product-rating-inner-container">
                                <span className="rating-count">{product.rating}</span>
                                <img src="/Images/rating_star.png" alt="Rated" className="img rating-img" />
                                <span className="vertical-line divider"></span>
                                <span className="rating-count">{product.ratingCount}</span>
                                <span className="rating-count">Ratings</span>
                              </div>
                            </div>

                            <span className="horizontal-divider"></span>


                            {/* Price Container */}
                            <div className="product-price-container">

                              <span className="product-price">
                                &#8377;{product.price}
                              </span>

                              <span className="product-mrp">
                                <del>
                                  MRP &#8377;{product.mrp}
                                </del>
                              </span>

                              <p className="note">includes of all taxes</p>

                            </div>

                            {/* Product Buy Button */}
                            <div className="d-flex align-items-center product-cart-button-actions">
                              <button className="product-card-button px-3 text-center h3" >
                                cart
                                <svg
                                  className="svg-icon"
                                  viewBox="0 0 20 20"
                                  width="45"
                                  height="45">
                                  <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                                  <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                                  <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                                </svg>
                              </button>

                              <button
                                type="button"
                                className="btn btn-primary mx-md-5 buy-now"
                                onClick={onOrderNowEvent}>
                                Buy now

                              </button>


                            </div>


                            {/* Product description */}
                            <div className="product-description">
                              <h6 className="description-title">Description</h6>
                              <p className="description">
                                {product.description}
                              </p>
                            </div>

                            {/* Product features */}
                            <div className="features">
                              <h6 className="description-title">Features</h6>
                              <ul id="features">
                                <li>Free shipping over Rs.600</li>
                                <li>Fit guarantee.</li>
                                <li>Free Alterations!</li>
                                <li>Buy 2 get flat 30% off!</li>
                              </ul>
                            </div>

                            {/* POP up */}
                            <Modal isOpen={modalState} toggle={handalModal} productID={productID} />
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              <Faq />
            </div>
      }
    </div>
  );
};

export default Product;
