import { ShoppingCart, Search, Menu, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Store className="text-indigo-600" size={34} />
          <h1 className="text-3xl font-bold">
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

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="hidden md:block px-5 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hidden md:block px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <p className="hidden md:block font-semibold text-gray-700">
                👋 Hi, {user?.fullName}
              </p>

              <Link to="/cart" className="relative">
                <ShoppingCart className="hover:text-indigo-600" />

                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>
            </>
          )}

          <button className="lg:hidden">
            <Menu />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
