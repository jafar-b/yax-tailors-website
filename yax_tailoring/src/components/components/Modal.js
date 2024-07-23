// Order Modal : to order the clothing items

import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import AuthValidate from '../../Auth/AuthValidate';
import "../style/OrderModal.css";

// Auth Token
import Cookies from "universal-cookie"; 
const cookies = new Cookies();


// first open the order pop modal
// then get the inputs for size and fabric type
// the make API request

// Use this later for optimizations
const SizeOptions = [
  {
    label: "S"
  },
  {
    label: "M"
  },
  {
    label: "L"
  },
  {
    label: "XL"
  },
  {
    label: "XXL"
  },
  {
    label: "XXXL"
  },
]

const OrderModal = (props) => {

  // Loging/auth. status 
  const [authstate, setAuthState] = useState("");
  const [size, setSize] = useState("");
  const [fibric, setFibric] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");


  // check logged or not
  const checkAuth = () => {

    AuthValidate.onAuth().then(value => {
      console.log("Logged: ", value)

      // change auth state
      setAuthState(value);
    });
  }

  useEffect(() => {
    checkAuth();

    // get address from server only if user is logged
    if (authstate === "logged") {
      getAddress();
    }

  }, [])


  // Size Selection Handling
  const onSizeHandle = (e) => {
    setSize(e.target.value);
  }

  // Fibric selector handling
  const onFibricSelect = (e) => {
    setFibric(e.target.value);
  }

  // Hnadle User order description
  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  }

  // Handle user address
  const addressHander = (e) => {
    setAddress(e.target.value);
  }

  // if already address present in database then add into the input value 
  // otherwise take address from user

  // check all input before requesting
  const handleInputs = () => {
    if (size === "") {

      alert("Please Select Size");

    } else if (fibric === "") {

      alert("Please Select Fibric");

    } else if (address === "") {

      alert("Please Enter Shipping Address");

    }
    else {
      // console.log("Size:", size);
      // console.log("Fibric:", fibric)

      // request
      orderNow(props.productID);
    }
  }


  // OnClick Order
  const onOrderNowEvent = async () => {

    // check if the user has already authorized or not authorized
    if (authstate === "logged") {

      // validate the user inputs
      handleInputs();

    } else {
      console.log("Please Login to Complete Your Order");
      alert("Please Login to Complete Your Order")
    }

  }

  // API request for /Order
  const orderNow = async (productID) => {

    const token_id = cookies.get("token_id");

    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
      "token_id": token_id
    }

    let bodyContent = `size=${size}&fabrictype=${fibric}&address=${address}&description=${description}`;

    let response = await fetch(`http://localhost:5000/product/order/${productID}`, {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.json();
    console.log(data);
    alert(data.message);

    // close popup window
    props.toggle();
  }

  // Get address from server
  const getAddress = async () => {

    const token_id = cookies.get("token_id");

    let headersList = {
      "Accept": "*/*",
      "token_id": token_id
    }

    let response = await fetch("http://localhost:5000/user/address", {
      method: "POST",
      headers: headersList
    });

    let data = await response.json();
    console.log(data);
    setAddress(data.address);


  }


  return (
    <div>

      {/* // passing in the isOpen prop from the container */}
      <Modal show={props.isOpen}>

        <Modal.Header className='d-block'>
          <Modal.Title>Order Now</Modal.Title>
          <h6 className='mb-2'> Few Steps To Complete Your Order ! </h6>

        </Modal.Header>

        <Modal.Body >


          {/* Size Selector */}
          <div className='size mb-3'>
            Choose Size: <span className="required">&#9733;</span>

            <Form.Select value={size}
              aria-label="Default select example"
              onChange={onSizeHandle}>

              <option >Size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
              <option value="XXXL">XXXL</option>

            </Form.Select>

          </div>

          {/* Fibric selector */}
          <div className='fibric '>
            Fibric Type: <span className="required">&#9733;</span>

            <Form.Select aria-label="Default select example"
              value={fibric}
              onChange={onFibricSelect} >

              <option >Choose Fibric</option>
              <option value="cotton">Cotton</option>
              <option value="polyester">Polyester</option>
              <option value="nylon">Nylon</option>
              <option value="rayon">Rayon</option>
              <option value="denim">Denim</option>
              <option value="Lycra">Lycra</option>

            </Form.Select>

          </div>


          {/* user shipping address*/}
          <div className="address mt-2">
            Your Shipping Address: <span className="required">&#9733;</span>
            <input value={address} onChange={addressHander} type="text" id="desc" className="form-control" placeholder='your address' />
          </div>

          {/* Cloth user description */}
          <div className="description mt-2">
            Description For your Order:
            <input type="text" id="desc" value={description} onChange={descriptionHandler} className="form-control" placeholder='Description' />
          </div>

        </Modal.Body>

        <Modal.Footer>
          <span className="required">&#9733; Required</span>
          <Button variant="btn btn-danger" onClick={props.toggle}>Cancel</Button>

          <Button variant="primary btn-success" onClick={onOrderNowEvent}>Order Now</Button>

        </Modal.Footer>

      </Modal>
    </div>
  )
}

export default OrderModal;