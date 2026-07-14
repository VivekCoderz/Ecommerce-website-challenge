import { useState } from "react";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Store,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Store className="text-indigo-600" size={34} />

          <h1 className="text-2xl md:text-3xl font-bold">
            Nova<span className="text-indigo-600">Cart</span>
          </h1>
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center w-[420px] relative">
          <Search className="absolute left-4 text-gray-400" size={18} />

          <input
            type="text"
            placeholder="Search products..."
            className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="px-5 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <p className="font-semibold text-gray-700">
                👋 Hi, {user?.fullName}
              </p>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative hover:text-red-500 transition"
              >
                <Heart size={24} />

                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative hover:text-indigo-600 transition"
              >
                <ShoppingCart size={24} />

                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t bg-white shadow-md">
          <div className="px-4 py-4 flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search products..."
                className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center border border-indigo-600 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="border rounded-xl p-4 bg-gray-50">
                  <p className="text-gray-500 text-sm">
                    Welcome Back 👋
                  </p>

                  <h2 className="font-bold text-lg mt-1">
                    {user?.fullName}
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Wishlist */}
                  <Link
                    to="/wishlist"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition"
                  >
                    <Heart size={20} />
                    Wishlist ({wishlistItems.length})
                  </Link>

                  {/* Cart */}
                  <Link
                    to="/cart"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                  >
                    <ShoppingCart size={20} />
                    Cart ({cartItems.length})
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;