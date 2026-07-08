import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading/HomeLoading";
import ProductDetailsLoading from "../components/Loading/ProductDetailsLoading";
import api from "../api/axios";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.product);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    setLoading(false);
    fetchProduct();
  }, []);

  return (
    <>
      <Navbar />
      {loading && <ProductDetailsLoading />}
      {!loading && (
        <section className="bg-gray-100 min-h-screen py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid lg:grid-cols-2">
                {/* Image */}

                <div className="bg-gray-50 flex justify-center items-center p-6">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full max-w-sm hover:scale-105 duration-300"
                  />
                </div>

                {/* Details */}

                <div className="p-6 md:p-10">
                  {/* <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
                Electronics
              </span> */}

                  <h1 className="text-3xl md:text-5xl font-bold mt-4">
                    {product.title}
                  </h1>

                  <div className="flex items-center gap-3 mt-4">
                    ⭐⭐⭐⭐⭐
                    <span className="text-gray-500">({product.rating})</span>
                  </div>

                  <h2 className="text-4xl font-bold text-indigo-600 mt-6">
                    ₹{product.price}
                  </h2>

                  <p className="text-gray-600 mt-6 leading-8">
                    {product.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-gray-100 rounded-xl p-4">
                      🚚 Free Delivery
                    </div>

                    <div className="bg-gray-100 rounded-xl p-4">
                      🔄 7 Days Return
                    </div>

                    <div className="bg-gray-100 rounded-xl p-4">
                      🔒 Secure Payment
                    </div>

                    <div className="bg-gray-100 rounded-xl p-4">
                      ⭐ {product.rating} Rating
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-10">
                    <button className="flex-1 bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700">
                      Add To Cart
                    </button>

                    <button className="flex-1 border-2 border-indigo-600 text-indigo-600 py-4 rounded-xl hover:bg-indigo-50">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}

            <div className="bg-white rounded-2xl shadow-lg mt-8 p-6">
              <h2 className="text-2xl font-bold mb-4">Product Description</h2>

              <p className="text-gray-600 leading-8">{product.description}</p>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default ProductDetail;
