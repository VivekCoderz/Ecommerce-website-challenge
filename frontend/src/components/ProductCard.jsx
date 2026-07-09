import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import api from "../api/axios";
import { setCart, setError } from "../Redux/feature/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const cart = useSelector((store) => store.cart.items);

  const [loading, setLoading] = useState(false);

  const isInCart = cart.some(
    (item) => item.product._id === product._id
  );

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      const { data } = await api.post("/cart/add-to-cart", {
        productId: product._id,
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

  const handleRemoveFromCart = async () => {
    try {
      setLoading(true);

      const { data } = await api.post("/cart/remove-item", {
        productId: product._id,
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
    <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 border border-gray-100 group">

      {/* Product Image */}

      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-52 sm:h-60 object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}

      <div className="p-4">

        <h2 className="font-semibold text-lg line-clamp-1">
          {product.title}
        </h2>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-4">

          <span className="text-2xl font-bold text-indigo-600">
            ₹{product.price}
          </span>

          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            In Stock
          </span>

        </div>

        {/* Buttons */}

        <div className="flex gap-2 mt-5">

          <Link
            to={`/product/${product._id}`}
            className="flex-1"
          >
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

              {loading ? "..." : "Remove"}
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

              {loading ? "..." : "Add"}
            </button>
          )}

        </div>

      </div>
    </div>
  );
};

export default ProductCard;