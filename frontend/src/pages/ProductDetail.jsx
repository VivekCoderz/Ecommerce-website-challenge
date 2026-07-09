import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  Zap,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductDetailsLoading from "../components/Loading/ProductDetailsLoading";

import api from "../api/axios";

import { useDispatch, useSelector } from "react-redux";
import { setCart, setError } from "../Redux/feature/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const cart = useSelector((store) => store.cart.items);

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [cartLoading, setCartLoading] = useState(false);

  const [quantity, setQuantity] = useState(1);

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

    fetchProduct();
  }, [id]);

  const isInCart = cart.some(
    (item) => item.product._id === product?._id
  );

  const handleAddToCart = async () => {
    try {
      setCartLoading(true);

      dispatch(setError(null));

      const { data } = await api.post("/cart/add-to-cart", {
        productId: product._id,
        quantity,
      });

      dispatch(setCart(data.cart));
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "Something went wrong")
      );
    } finally {
      setCartLoading(false);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      setCartLoading(true);

      dispatch(setError(null));

      const { data } = await api.post("/cart/remove-item", {
        productId: product._id,
      });

      dispatch(setCart(data.cart));
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "Something went wrong")
      );
    } finally {
      setCartLoading(false);
    }
  };

  if (loading)
    return (
      <>
        <Navbar />
        <ProductDetailsLoading />
        <Footer />
      </>
    );

  return (
    <>
      <Navbar />

      <section className="bg-gray-100 py-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

            <div className="grid lg:grid-cols-2 gap-10">

              {/* LEFT */}

              <div className="bg-gray-50 flex justify-center items-center p-8">

                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-[500px] object-contain hover:scale-105 duration-300"
                />

              </div>

              {/* RIGHT */}

              <div className="p-8">

                <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-sm font-medium">
                  Premium Product
                </span>

                <h1 className="text-3xl md:text-5xl font-bold mt-5">
                  {product.title}
                </h1>

                {/* Rating */}

                <div className="flex items-center gap-3 mt-5">

                  <div className="flex text-yellow-500">
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                  </div>

                  <span className="text-gray-500">
                    4.8 (128 Reviews)
                  </span>

                </div>

                {/* Price */}

                <div className="mt-8 flex items-center gap-4 flex-wrap">

                  <span className="text-5xl font-bold text-indigo-600">
                    ₹{product.price}
                  </span>

                  <span className="text-2xl text-gray-400 line-through">
                    ₹{(product.price * 1.25).toFixed(0)}
                  </span>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                    20% OFF
                  </span>

                </div>

                <div className="mt-5">

                  <span className="bg-green-100 text-green-700 px-3 py-2 rounded-full font-medium">
                    ✅ In Stock
                  </span>

                </div>

                {/* Description */}

                <p className="text-gray-600 leading-8 mt-8">
                  {product.description}
                </p>

                {/* Quantity */}

                <div className="mt-10">

                  <h3 className="font-semibold mb-4">
                    Quantity
                  </h3>

                  <div className="flex items-center gap-5">

                    <button
                      onClick={() =>
                        setQuantity((prev) =>
                          prev > 1 ? prev - 1 : 1
                        )
                      }
                      className="w-11 h-11 rounded-xl border hover:bg-gray-100 flex justify-center items-center"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="text-xl font-bold">
                      {quantity}
                    </span>

                    <button
                      onClick={() =>
                        setQuantity((prev) => prev + 1)
                      }
                      className="w-11 h-11 rounded-xl border hover:bg-gray-100 flex justify-center items-center"
                    >
                      <Plus size={18} />
                    </button>

                  </div>

                </div>

                {/* Buttons */}

                <div className="grid md:grid-cols-2 gap-4 mt-10">

                  {isInCart ? (
                    <button
                      disabled={cartLoading}
                      onClick={handleRemoveFromCart}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-xl py-4 flex justify-center items-center gap-3 transition"
                    >
                      <Trash2 />

                      {cartLoading
                        ? "Removing..."
                        : "Remove from Cart"}
                    </button>
                  ) : (
                    <button
                      disabled={cartLoading}
                      onClick={handleAddToCart}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-4 flex justify-center items-center gap-3 transition"
                    >
                      <ShoppingCart />

                      {cartLoading
                        ? "Adding..."
                        : "Add to Cart"}
                    </button>
                  )}

                  <button className="border-2 border-indigo-600 text-indigo-600 rounded-xl py-4 hover:bg-indigo-50 flex justify-center items-center gap-3 transition">
                    <Zap />

                    Buy Now
                  </button>

                </div>

                {/* Feature Cards */}

                <div className="grid grid-cols-2 gap-4 mt-10">

                  <div className="bg-gray-100 rounded-2xl p-5 flex items-center gap-3">

                    <Truck className="text-indigo-600" />

                    <div>
                      <h4 className="font-semibold">
                        Free Delivery
                      </h4>

                      <p className="text-sm text-gray-500">
                        Within 3-5 Days
                      </p>
                    </div>

                  </div>

                  <div className="bg-gray-100 rounded-2xl p-5 flex items-center gap-3">

                    <RotateCcw className="text-indigo-600" />

                    <div>
                      <h4 className="font-semibold">
                        Easy Returns
                      </h4>

                      <p className="text-sm text-gray-500">
                        7 Days Return
                      </p>
                    </div>

                  </div>

                  <div className="bg-gray-100 rounded-2xl p-5 flex items-center gap-3">

                    <ShieldCheck className="text-indigo-600" />

                    <div>
                      <h4 className="font-semibold">
                        Secure Payment
                      </h4>

                      <p className="text-sm text-gray-500">
                        100% Protected
                      </p>
                    </div>

                  </div>

                  <div className="bg-gray-100 rounded-2xl p-5 flex items-center gap-3">

                    <Star className="text-yellow-500" />

                    <div>
                      <h4 className="font-semibold">
                        Top Rated
                      </h4>

                      <p className="text-sm text-gray-500">
                        Loved by Customers
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>
                    {/* Product Description */}

          <div className="bg-white rounded-3xl shadow-xl mt-8 p-8">

            <h2 className="text-3xl font-bold mb-6">
              Product Description
            </h2>

            <p className="text-gray-600 leading-8 text-lg">
              {product.description}
            </p>

          </div>

          {/* Specifications */}

          <div className="bg-white rounded-3xl shadow-xl mt-8 p-8">

            <h2 className="text-3xl font-bold mb-8">
              Specifications
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="flex justify-between border-b pb-3">
                <span className="font-semibold text-gray-600">
                  Brand
                </span>

                <span>NovaCart</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-semibold text-gray-600">
                  Category
                </span>

                <span>Electronics</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-semibold text-gray-600">
                  Warranty
                </span>

                <span>1 Year</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-semibold text-gray-600">
                  Return Policy
                </span>

                <span>7 Days</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-semibold text-gray-600">
                  Delivery
                </span>

                <span>Free Delivery</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-semibold text-gray-600">
                  Availability
                </span>

                <span className="text-green-600 font-semibold">
                  In Stock
                </span>
              </div>

            </div>

          </div>

          {/* Customer Reviews */}

          <div className="bg-white rounded-3xl shadow-xl mt-8 p-8">

            <h2 className="text-3xl font-bold mb-8">
              Customer Reviews
            </h2>

            <div className="space-y-8">

              <div className="border-b pb-6">

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="font-semibold text-lg">
                      Rahul Sharma
                    </h3>

                    <div className="flex text-yellow-500 mt-1">
                      ⭐⭐⭐⭐⭐
                    </div>

                  </div>

                  <span className="text-gray-400 text-sm">
                    2 Days Ago
                  </span>

                </div>

                <p className="text-gray-600 mt-4 leading-7">
                  Excellent quality product. Packaging was very
                  good and delivery was on time. Highly
                  recommended.
                </p>

              </div>

              <div className="border-b pb-6">

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="font-semibold text-lg">
                      Priya Verma
                    </h3>

                    <div className="flex text-yellow-500 mt-1">
                      ⭐⭐⭐⭐⭐
                    </div>

                  </div>

                  <span className="text-gray-400 text-sm">
                    1 Week Ago
                  </span>

                </div>

                <p className="text-gray-600 mt-4 leading-7">
                  Worth every rupee. Product quality is amazing and
                  customer support is also excellent.
                </p>

              </div>

              <div>

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="font-semibold text-lg">
                      Aman Gupta
                    </h3>

                    <div className="flex text-yellow-500 mt-1">
                      ⭐⭐⭐⭐☆
                    </div>

                  </div>

                  <span className="text-gray-400 text-sm">
                    3 Weeks Ago
                  </span>

                </div>

                <p className="text-gray-600 mt-4 leading-7">
                  Nice product. Delivery was quick and the build
                  quality is premium.
                </p>

              </div>

            </div>

          </div>

          {/* Related Products */}

          <div className="bg-white rounded-3xl shadow-xl mt-8 p-8 mb-10">

            <h2 className="text-3xl font-bold mb-8">
              Why Buy From NovaCart?
            </h2>

            <div className="grid md:grid-cols-4 gap-6">

              <div className="text-center p-6 rounded-2xl bg-gray-50 hover:shadow-lg transition">

                <div className="text-5xl">
                  🚚
                </div>

                <h3 className="font-bold mt-4">
                  Fast Delivery
                </h3>

                <p className="text-gray-500 mt-2 text-sm">
                  Get products delivered quickly.
                </p>

              </div>

              <div className="text-center p-6 rounded-2xl bg-gray-50 hover:shadow-lg transition">

                <div className="text-5xl">
                  🔒
                </div>

                <h3 className="font-bold mt-4">
                  Secure Payment
                </h3>

                <p className="text-gray-500 mt-2 text-sm">
                  Safe & encrypted payment gateway.
                </p>

              </div>

              <div className="text-center p-6 rounded-2xl bg-gray-50 hover:shadow-lg transition">

                <div className="text-5xl">
                  🔄
                </div>

                <h3 className="font-bold mt-4">
                  Easy Returns
                </h3>

                <p className="text-gray-500 mt-2 text-sm">
                  Hassle-free replacement & returns.
                </p>

              </div>

              <div className="text-center p-6 rounded-2xl bg-gray-50 hover:shadow-lg transition">

                <div className="text-5xl">
                  ⭐
                </div>

                <h3 className="font-bold mt-4">
                  Trusted Quality
                </h3>

                <p className="text-gray-500 mt-2 text-sm">
                  Thousands of happy customers.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductDetail;