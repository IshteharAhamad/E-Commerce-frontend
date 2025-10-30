import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React from "react";
import Home from "@/Pages/Home";
import Login from "@/Pages/Login";
import Protected from "./Protected";
import ProductDetails from "@/Pages/ProductDetails";

const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/product/:id"
          element={
            // <Protected>
              <ProductDetails />
            // </Protected>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default PageRoutes;
