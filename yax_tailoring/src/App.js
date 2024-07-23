import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Faq from "./components/pages/Faq";
import Header from "./components/components/Header";
import Cart from "./components/pages/Cart";
import Contact from "./components/pages/Contact";
import { Main } from "./components/pages/Main";

import Signup from "./components/pages/Signup";
import EditProfile from "./components/pages/dashboards/EditProfile";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";
import LogOut from "./components/pages/LogOut";
import AuthWrapper from "./components/Screens/AuthWrapper";  // this is for wraping component into Auth

/* Dashboard */
import { UpdatePassword } from "./components/pages/dashboards/UpdatePassword";
import { DeleteProfile } from "./components/pages/dashboards/DeleteProfile";
import { Orders } from "./components/pages/dashboards/Orders";


import Product from "./components/pages/Product";
import PageNotFOund from "./components/pages/PageNotFOund";

import ScrollToTop from "./components/components/ScrollToTop"


function App() {

  return (
    <div className="App">
      <Router>

        {/* For scroll to top when route changed */}
        <ScrollToTop />

        {/* Header */}
        <Header />

        <Routes>

          <Route exact path="/" element={<Main />} />
          <Route path="/faq" element={<Faq img="true" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={
            <AuthWrapper>
              <Login />
            </AuthWrapper>
          } />

          <Route path="/profile" element={<Profile />} />

          <Route path="/signup" element={
            <AuthWrapper>
              <Signup />
            </AuthWrapper>
          } />

          <Route path="/logout" element={<LogOut />} />

          <Route path="/product/:productID" element={<Product />} />
          <Route path="/Cart" element={<Cart />} />

          {/* Dashboard */}
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile/orders" element={<Orders />} />
          <Route path="/profile/edit/password" element={<UpdatePassword />} />
          <Route path="/profile/delete" element={<DeleteProfile />} />

          {/* Page Not Found */}
          <Route path="*" element={<PageNotFOund />} />


        </Routes>

      </Router>
    </div>
  );
}

export default App;
