import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import ShowProducts from "../components/ShowProducts";
import Footer from "../components/Footer";
import HomeLoading from "../components/Loading/HomeLoading";
import api from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess } from "../Redux/feature/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const homeLoading = useSelector((store) => store.auth.loading);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const productFetch = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/products/");
        setProducts(data.products);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    productFetch();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
        dispatch(loginStart())
      try {
        const { data } = await api.get("/auth/me");
        console.log(data.user);
        dispatch(loginSuccess(data.user));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
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
    <>
      <Navbar />
      <div className="pt-10 w-[80%] m-auto flex flex-wrap">
        {loading && <HomeLoading />}
        {!loading && products.length == 0 && <div>There is no product</div>}
        {!loading && products.length != 0 && (
          <section>
            <h2 className="mb-5 text-[28px] font-bold text-black">Products</h2>
            <ShowProducts products={products} />
          </section>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
