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
    const dispatch = useDispatch();

  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);

  const [product, setProduct] = useState(null);
  
  const cart = useSelector((store) => store.cart.items);
  const [cartLoading, setCartLoading] = useState(false);


  const [loading, setLoading] = useState(true);

  
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

 const fetchReviews = async () => {
  try {
      console.log("fetching reviews")
    const { data } = await api.get(`/review/${id}`);
    console.log(data)

    setReviews(data.review);
  } catch (err) {
    console.log(err);
  }
};

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

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  const handleAddReview = async (e) => {
  e.preventDefault();

  try {
    setReviewLoading(true);

    await api.post(`/review/add/${id}`, {
      rating,
      comment,
    });

    setComment("");
    setRating(5);

    fetchReviews();
  } catch (err) {
    alert(err.response?.data?.message);
  } finally {
    setReviewLoading(false);
  }
};

 const handleDeleteReview = async (reviewId) => {
  try {
    await api.delete(`/review/delete/${reviewId}`);

    fetchReviews();
  } catch (err) {
    console.log(err);
  }
};

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  const isInCart = cart.some((item) => item.product._id === product?._id);

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
      dispatch(setError(err.response?.data?.message || "Something went wrong"));
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
      dispatch(setError(err.response?.data?.message || "Something went wrong"));
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
                    {averageRating} ({reviews.length} Reviews)
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
                  <h3 className="font-semibold mb-4">Quantity</h3>

                  <div className="flex items-center gap-5">
                    <button
                      onClick={() =>
                        setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                      }
                      className="w-11 h-11 rounded-xl border hover:bg-gray-100 flex justify-center items-center"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="text-xl font-bold">{quantity}</span>

                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
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

                      {cartLoading ? "Removing..." : "Remove from Cart"}
                    </button>
                  ) : (
                    <button
                      disabled={cartLoading}
                      onClick={handleAddToCart}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-4 flex justify-center items-center gap-3 transition"
                    >
                      <ShoppingCart />

                      {cartLoading ? "Adding..." : "Add to Cart"}
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
                      <h4 className="font-semibold">Free Delivery</h4>

                      <p className="text-sm text-gray-500">Within 3-5 Days</p>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-2xl p-5 flex items-center gap-3">
                    <RotateCcw className="text-indigo-600" />

                    <div>
                      <h4 className="font-semibold">Easy Returns</h4>

                      <p className="text-sm text-gray-500">7 Days Return</p>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-2xl p-5 flex items-center gap-3">
                    <ShieldCheck className="text-indigo-600" />

                    <div>
                      <h4 className="font-semibold">Secure Payment</h4>

                      <p className="text-sm text-gray-500">100% Protected</p>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-2xl p-5 flex items-center gap-3">
                    <Star className="text-yellow-500" />

                    <div>
                      <h4 className="font-semibold">Top Rated</h4>

                      <p className="text-sm text-gray-500">
                        Loved by Customers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}

          <div className="bg-white rounded-3xl shadow-xl mt-8 p-8">
            <h2 className="text-3xl font-bold mb-8">Specifications</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex justify-between border-b pb-3">
                <span className="font-semibold text-gray-600">Brand</span>

                <span>NovaCart</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-semibold text-gray-600">Category</span>

                <span>Electronics</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-semibold text-gray-600">Warranty</span>

                <span>1 Year</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-semibold text-gray-600">
                  Return Policy
                </span>

                <span>7 Days</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-semibold text-gray-600">Delivery</span>

                <span>Free Delivery</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-semibold text-gray-600">
                  Availability
                </span>

                <span className="text-green-600 font-semibold">In Stock</span>
              </div>
            </div>
          </div>

          {/* Customer Reviews */}

         {/* ===================== Customer Reviews ===================== */}

<div className="bg-white rounded-3xl shadow-lg mt-8 overflow-hidden">

  {/* Header */}

  <div className="border-b p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
        Customer Reviews
      </h2>

      <p className="text-gray-500 mt-1">
        {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
      </p>
    </div>

    <div className="flex items-center gap-3">

      <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl font-semibold flex items-center gap-2">
        ⭐ {averageRating}
      </div>

    </div>

  </div>

  {/* Review Form */}

  {user && (

    <div className="p-6 border-b bg-gray-50">

      <h3 className="text-lg font-semibold mb-5">
        Share your experience
      </h3>

      <form
        onSubmit={handleAddReview}
        className="space-y-5"
      >

        <div>

          <label className="block mb-2 font-medium">
            Rating
          </label>

          <select
            value={rating}
            onChange={(e)=>setRating(Number(e.target.value))}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          >

            {[5,4,3,2,1].map((star)=>(
              <option key={star} value={star}>
                ⭐ {star} Star
              </option>
            ))}

          </select>

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Review
          </label>

          <textarea
            rows="4"
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            placeholder="Tell others about this product..."
            className="w-full border rounded-xl p-4 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
          />

        </div>

        <button
          type="submit"
          disabled={reviewLoading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition"
        >

          {reviewLoading ? "Posting..." : "Post Review"}

        </button>

      </form>

    </div>

  )}

  {/* Reviews */}

  <div className="divide-y">

    {reviews.length === 0 && (

      <div className="py-14 text-center">

        <div className="text-5xl mb-4">
          ⭐
        </div>

        <h3 className="text-xl font-semibold">
          No Reviews Yet
        </h3>

        <p className="text-gray-500 mt-2">
          Be the first to review this product.
        </p>

      </div>

    )}

    {reviews.map((review)=>(

      <div
        key={review._id}
        className="p-6 hover:bg-gray-50 transition"
      >

        <div className="flex items-start justify-between gap-4">

          <div className="flex gap-4">

            {/* Avatar */}

            <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shrink-0">

              {review.user?.fullName?.charAt(0).toUpperCase()}

            </div>

            <div>

              <h3 className="font-semibold text-gray-900">

                {review.user?.fullName}

              </h3>

              <div className="flex items-center gap-3 mt-1">

                <div className="text-yellow-500 text-lg">

                  {"⭐".repeat(review.rating)}

                </div>

                <span className="text-sm text-gray-500">

                  {new Date(review.createdAt).toLocaleDateString()}

                </span>

              </div>

              <p className="text-gray-600 mt-4 leading-7">

                {review.comment}

              </p>

            </div>

          </div>

          {user?._id===review.user?._id && (

            <button
              onClick={()=>handleDeleteReview(review._id)}
              className="text-red-500 hover:text-red-600 text-sm font-medium"
            >

              Delete

            </button>

          )}

        </div>

      </div>

    ))}

  </div>

</div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductDetail;
