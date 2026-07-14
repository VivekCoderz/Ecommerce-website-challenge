import React, { useEffect } from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Cart from "./pages/Cart";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFail,
  loginStart,
  loginSuccess,
} from "./Redux/feature/authSlice.js";
import api from "./api/axios";
import { setCart, setLoading } from "./Redux/feature/cartSlice.js";
import Wishlist from "./pages/Wishlist.jsx";

const App = () => {
  const dispatch = useDispatch();
  const homeLoading = useSelector((store) => store.auth.loading);
  const fetchCart = async () => {
    try {
        setLoading(true)
        const { data } = await api.get("/cart/");
        dispatch(setCart(data.cart));
    } catch (err) {
        console.log(err.response.data);
    }finally{
        setLoading(true)
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(loginStart());
      try {
        const { data } = await api.get("/auth/me");
        console.log(data.user);
        dispatch(loginSuccess(data.user));
        fetchCart();
      } catch (err) {
        dispatch(loginFail());
      }
    };
    fetchUser();
  }, []);

  if (homeLoading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold">
              Nova<span className="text-indigo-600">Cart</span>
            </h1>

            <div className="mt-6 h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

            <p className="mt-4 text-gray-500">Checking your session...</p>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="h-screen w-screen ">
      {/* Routeing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
