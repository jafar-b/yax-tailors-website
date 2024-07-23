// Order Page

import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { Order } from '../../components/Order';

const cookies = new Cookies()

export const Orders = () => {

  const token_id = cookies.get("token_id");

  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);


  // get list of orders
  const getOrders = async () => {

    let headersList = {
      "Accept": "*/*",
      token_id: token_id
    }

    let response = await fetch("http://localhost:5000/profile", {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();

    if (response.ok) {

      setOrdersList(data.orders)
      console.log(data.orders);

    }

  }

  // Currently i am not sure where to fetch ordersDetails

  return (
    <div className='container mt-1 mb-2'>

      {
        ordersList.length !== 0 ?
          ordersList.map((item, index) => {

            return <Order orderId={item} key={index} />

          }) :

          <div className="alert mt-1 mb-1">
            No Orders Placed
          </div>
      }

    </div>
  )
}
