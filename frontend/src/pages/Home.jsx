import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import ShowProducts from "../components/ShowProducts";
import axios from "axios";
const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const productFetch = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/products/");
        setProducts(data.products);
      } catch (err) {
        console.log(err);
      }
    };
    productFetch();
  }, []);

  console.log(products);

  return (
    <>
      <Navbar />
      <div className="pt-10 w-[80%] m-auto flex flex-wrap">
        {products.length == 0 ? (
          <div>There is no product</div>
        ) : (
          <section>
            <h2 className="mb-5 text-[28px] font-bold text-black">
              Products
            </h2>
            <ShowProducts products={products} />
          </section>
        )}
      </div>
    </>
  );
};

export default Home;
