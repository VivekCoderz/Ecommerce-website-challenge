import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Cart = () => {
  const cartItems = useSelector(store=>store.cart.items)   
    console.log(cartItems);
    
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <ShoppingBag size={80} className="mx-auto text-gray-300" />

            <h2 className="text-2xl font-bold mt-6">Your Cart is Empty</h2>

            <p className="text-gray-500 mt-2">
              Looks like you haven't added anything yet.
            </p>

            <Link to="/">
              <button className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}

            <div className="lg:col-span-2 space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.product._id}
                  className="bg-white rounded-2xl shadow-md p-5 flex flex-col sm:flex-row gap-5"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-full sm:w-40 h-40 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{item.title}</h2>

                    <p className="text-indigo-600 font-bold text-xl mt-2">
                      ₹{item.product.price}
                    </p>

                    <div className="flex items-center gap-4 mt-6">
                      <button className="w-10 h-10 rounded-lg border hover:bg-gray-100 flex items-center justify-center">
                        <Minus size={18} />
                      </button>

                      <span className="text-lg font-semibold">
                        {item.quantity}
                      </span>

                      <button className="w-10 h-10 rounded-lg border hover:bg-gray-100 flex items-center justify-center">
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="flex sm:flex-col justify-between items-end">
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 />
                    </button>

                    <h3 className="text-xl font-bold">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}

            <div>
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold transition">
                  Proceed to Checkout
                </button>

                <Link to="/">
                  <button className="w-full mt-3 border border-indigo-600 text-indigo-600 py-4 rounded-xl hover:bg-indigo-50 transition">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Cart;
