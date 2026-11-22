import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import ShowProducts from "../components/ShowProducts";
import Footer from "../components/Footer";
import HomeLoading from "../components/Loading/HomeLoading";
import api from "../api/axios";

const Home = () => {
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

  return (
    <>
      <Navbar />
      <div className="pt-10 w-[80%] m-auto flex flex-wrap">
        {loading && <HomeLoading />}
        {!loading && products.length == 0 && <div>There is no product</div>}
        {!loading && products.length != 0 && (
          <section>
            <ShowProducts products={products} />
          </section>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
