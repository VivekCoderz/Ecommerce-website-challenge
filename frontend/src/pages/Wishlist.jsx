import { useEffect, useState } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axios";

import {
  setWishlist,
  setLoading,
  setError,
} from "../Redux/feature/wishListSlice";

import { setCart,setLoading as csetLoading} from "../Redux/feature/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist.items);
  const cart = useSelector((state) => state.cart.items);
  const loading = useSelector((state) => state.wishlist.loading);
  const cloading = useSelector((state) => state.cart.loading);

  const [buttonLoading, setButtonLoading] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        dispatch(setLoading(true));

        const { data } = await api.get("/wishlist");

        dispatch(setWishlist(data.wishlist.items));
      } catch (err) {
        dispatch(
          setError(err.response?.data?.message || "Something went wrong"),
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchWishlist();
  }, []);

  const removeWishlist = async (productId) => {
    try {
      setButtonLoading(productId);

      const { data } = await api.post(`/wishlist/remove/${productId}`);

      dispatch(setWishlist(data.wishlist.items));
    } catch (err) {
      console.log(err);
    } finally {
      setButtonLoading("");
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      csetLoading(true)

      const { data } = await api.post("/cart/add-to-cart", {
        productId,
        quantity: 1,
      });

      dispatch(setCart(data.cart));
    } catch (err) {
      console.log(err);
    } finally {
        csetLoading(false)
    }
  };

    const handleRemoveFromCart = async (product) => {
        console.log(product)
    try {
      csetLoading(true);

      const { data } = await api.post("/cart/remove-item", {
        productId: product,
      });

      dispatch(setCart(data.cart));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Something went wrong"));
    } finally {
      csetLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-8">
            <Heart className="text-red-500 fill-red-500" />
            My Wishlist
          </h1>

          {loading ? (
            <div className="flex justify-center py-32">
              <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : wishlist.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-md p-12 text-center">
              <Heart size={90} className="mx-auto text-red-300 fill-red-200" />

              <h2 className="text-3xl font-bold mt-6">
                Your Wishlist is Empty
              </h2>

              <p className="text-gray-500 mt-3">
                Save your favourite products here and buy them later.
              </p>

              <Link to="/">
                <button className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition">
                  Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.product._id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                >
                  {/* Product Image */}
                  <div className="relative bg-gray-100">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-64 object-cover hover:scale-105 transition duration-300"
                    />

                    <button
                      onClick={() => removeWishlist(item.product._id)}
                      disabled={buttonLoading === item.product._id}
                      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-red-50 transition"
                    >
                      <Trash2 size={20} className="text-red-500" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="text-xl font-bold line-clamp-1">
                      {item.product.title}
                    </h2>

                    <p className="text-gray-500 text-sm mt-2 line-clamp-2 min-h-[40px]">
                      {item.product.description}
                    </p>

                    <div className="flex items-center justify-between mt-5">
                      <span className="text-2xl font-bold text-indigo-600">
                        ₹{item.product.price}
                      </span>

                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                        In Stock
                      </span>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Link
                        to={`/product/${item.product._id}`}
                        className="flex-1"
                      >
                        <button className="w-full border border-indigo-600 text-indigo-600 py-3 rounded-xl hover:bg-indigo-50 transition font-medium">
                          View Product
                        </button>
                      </Link>

                      {cart.find(pr=>pr.product._id==item.product._id) ? (
                        <button
                          disabled={cloading}
                          onClick={()=>handleRemoveFromCart(item.product._id)}
                          className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-white transition ${
                            cloading
                              ? "bg-red-300 cursor-not-allowed"
                              : "bg-red-500 hover:bg-red-600 active:scale-95"
                          }`}
                        >
                          <Trash2 size={18} />
                          {cloading ? "Removing..." : "Remove"}
                        </button>
                      ) : (
                        <button
                          disabled={cloading}
                          onClick={()=>handleAddToCart(item.product._id)}
                          className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-white transition ${
                            cloading
                              ? "bg-indigo-300 cursor-not-allowed"
                              : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
                          }`}
                        >
                          <ShoppingCart size={18} />
                          {cloading ? "Adding..." : "Add"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Wishlist;
