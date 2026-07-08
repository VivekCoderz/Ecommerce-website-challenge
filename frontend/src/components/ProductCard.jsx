import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import api from "../api/axios";
import {
  setCart,
  setError,
} from "../Redux/feature/cartSlice.js";
import { useState } from "react";

const ProductCard = ({product}) => {
    const dispatch = useDispatch();

  const [loading ,setLoading] = useState(false);
  console.log(loading)

  const handleAddToCart = async (productId) => {
    try {
      setLoading(true);
      dispatch(setError(null));

      const { data } = await api.post("/cart/add-to-cart", {
        productId,
        quantity: 1,
      });

      dispatch(setCart(data.cart));
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "Something went wrong")
      );
    } finally {
        setLoading(false);
    }
  };

  return (
     <div
            key={product._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-60 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-bold">{product.title}</h2>

              <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                {product.description}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-indigo-600">
                  ₹{product.price}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <Link to={`/product/${product._id}`}>
                  <button className="w-full border border-indigo-600 text-indigo-600 py-2 rounded-lg hover:bg-indigo-50">
                    View
                  </button>
                </Link>

                <button
                  disabled={loading}
                  onClick={() => handleAddToCart(product._id)}
                  className={`w-full py-2 rounded-lg text-white transition ${
                    loading
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {loading ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
  )
}

export default ProductCard