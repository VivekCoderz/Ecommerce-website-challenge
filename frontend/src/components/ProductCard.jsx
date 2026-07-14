import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, ShoppingCart, Trash2, Heart } from "lucide-react";
import { useState } from "react";
import api from "../api/axios";
import { setCart, setError } from "../Redux/feature/cartSlice";
import { setWishlist } from "../Redux/feature/wishListSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const cart = useSelector((store) => store.cart.items);
  const [loading, setLoading] = useState(false);

  const wishlist = useSelector((store) => store.wishlist.items);
console.log(wishlist)
  const isInCart = cart.some((item) => item.product._id === product._id);

  const handleAddWishlist = async (productId) => {
    const { data } = await api.post(`/wishlist/add/${productId}`);
    console.log(data.wishlist.items)
    dispatch(setWishlist(data.wishlist.items));
  };

  const handleRemoveWishlist = async (productId) => {
      const { data } = await api.post(`/wishlist/remove/${productId}`);
    dispatch(setWishlist(data.wishlist.items));
  };

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      const { data } = await api.post("/cart/add-to-cart", {
        productId: product._id,
        quantity: 1,
      });

      dispatch(setCart(data.cart));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      setLoading(true);

      const { data } = await api.post("/cart/remove-item", {
        productId: product._id,
      });

      dispatch(setCart(data.cart));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow hover:shadow-xl transition-all duration-300 group">
      {/* Product Image */}

      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-52 sm:h-60 object-cover group-hover:scale-105 transition duration-300"
        />

        {/* Wishlist */}

        <button
          onClick={() =>
            wishlist.find((pr)=>pr.product._id==product._id)
              ? handleRemoveWishlist(product._id)
              : handleAddWishlist(product._id)
          }
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition"
        >
          <Heart
            size={20}
            className={
              wishlist.find((pr)=>pr.product._id==product._id) ? "fill-red-500 text-red-500" : "text-gray-500"
            }
          />
        </button>

        {/* Stock Badge */}

        <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow">
          In Stock
        </span>
      </div>

      {/* Content */}

      <div className="p-4">
        <h2 className="font-semibold text-lg line-clamp-1">{product.title}</h2>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        {/* Price */}

        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-indigo-600">
            ₹{product.price}
          </span>

          <span className="text-yellow-500 text-sm">⭐ {product.rating}</span>
        </div>

        {/* Buttons */}

        <div className="flex gap-2 mt-5">
          <Link to={`/product/${product._id}`} className="flex-1">
            <button className="w-full flex items-center justify-center gap-2 border border-indigo-600 text-indigo-600 py-2.5 rounded-xl hover:bg-indigo-50 transition">
              <Eye size={18} />
              View
            </button>
          </Link>

          {isInCart ? (
            <button
              disabled={loading}
              onClick={handleRemoveFromCart}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-white transition ${
                loading
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 active:scale-95"
              }`}
            >
              <Trash2 size={18} />
              {loading ? "Removing..." : "Remove"}
            </button>
          ) : (
            <button
              disabled={loading}
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-white transition ${
                loading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
              }`}
            >
              <ShoppingCart size={18} />
              {loading ? "Adding..." : "Add"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
