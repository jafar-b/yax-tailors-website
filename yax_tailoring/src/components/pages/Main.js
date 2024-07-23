import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import Offer from "../components/Offer";
import Overview from "../components/Overview";
import "../style/Main.css";
import Footer from "../components/Footer";


export const Main = () => {

  const [product, setProduct] = useState([]);

  const [isLoading, setLoading] = useState(false);

  const [isError, setError] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);


  // API request for fetching products from DB
  const fetchProduct = async () => {
    setLoading(true);
    setError(false)

    try {

      let headersList = {
        "Accept": "*/*",

      }

      let response = await fetch("http://localhost:5000/products", {
        method: "GET",
        headers: headersList
      });

      let data = await response.json();

      setLoading(false)

      // console.log(data);
      setProduct(data);

    } catch (Err) {
      console.log("Something went wrong..");
      setLoading(false)
      setError(true)
    }
  }

  return (
    <>
      {/* <Offer title={"Buy 4 or more tailored items get 20% off"} btn={"Grab it!"} /> */}
      <Offer title={"Buy 2 e tailored items get 10% off"} btn={"Grab it!"} />

      <Overview />

      <div className="container-max">
        <h3 className="services">Products We Offer</h3>

        {/* If Error while fetching  */}
        {
          isError === true ? <div className="container">
            <div className="card bg-white p-2 m-2">

              <div className="alert alert-warning" role="alert">
                Something Went Wrong
              </div>
              <div className="try-again">

                <button className="reload p-2 btn  btn-primary" onClick={fetchProduct}>Reload</button>
              </div>

            </div>
          </div> : null
        }

        {/* Loading effect */}
        {
          isLoading === true ? <div className="d-flex justify-content-center mb-2 mt-0">
            <div className="spinner-border text-danger" role="status">
              <span className="sr-only"></span>
            </div>
          </div> : null
        }


        {/* Services */}
        <div className="p-2 d-flex flex-sm-row flex-column justify-content-center flex-wrap">
          {
            product.map((item, n) => {
              return <Product product={item} key={n} />;
            })
          }
        </div>

        {/* How it works */}
        <h3>How it Works</h3>

        <div className="how-its-works container">
          <p className="steps">
            1. Once you place an order with us, we'll schedule a pickup of your
            fabric from your home. If you don’t have fabric, We can help you
            find the best fabric for you.{" "}
          </p>
          <p className="steps">
            2. Next, a dedicated fashion designer will help you style your
            fabric. You can choose to speak with them on video call or have them
            visit your home.
          </p>
          <p className="steps">
            3. Once the design is confirmed, we'll stitch the garment & ship it
            to your home under 5-10 working days.
          </p>
          <p className="steps">
            4. Alterations, if any, are taken care free of charge.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};
