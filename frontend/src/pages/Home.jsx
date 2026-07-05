import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import ShowProducts from "../components/ShowProducts";
import axios from "axios";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const productFetch = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://novacart-backend-45p2.onrender.com/products/",
        );
        setProducts(data.products);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    productFetch();
  }, []);

  console.log(products);

  return (
    <>
      <Navbar />
      <div className="pt-10 w-[80%] m-auto flex flex-wrap">
        {loading && <Loading />}
        {!loading && products.length == 0 && <div>There is no product</div>}
        {!loading && products.length != 0 && (
          <section>
            <h2 className="mb-5 text-[28px] font-bold text-black">Products</h2>
            <ShowProducts products={products} />
          </section>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Home;
