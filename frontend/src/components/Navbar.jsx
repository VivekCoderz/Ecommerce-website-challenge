// Navbar.jsx
import { ShoppingCart, Heart, User, Search, Menu, Store } from "lucide-react";

const Navbar = () => {
  return (
    <>
      {/* Top Banner */}
      {/* <div className="bg-indigo-600 text-white text-center py-2 text-sm font-medium">
        🚚 Free Delivery on orders above ₹499 | 7 Days Easy Returns
      </div> */}

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Store className="text-indigo-600" size={34} />
            <h1 className="text-3xl font-bold">
              Nova<span className="text-indigo-600">Cart</span>
            </h1>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center w-[420px] relative">
            <Search
              className="absolute left-4 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Links */}
          <ul className="hidden lg:flex items-center gap-8 font-medium">
            {/* <li className="cursor-pointer hover:text-indigo-600">Home</li> */}
            {/* <li className="cursor-pointer hover:text-indigo-600">
              About
            </li> */}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-6">
            {/* <button className="hidden md:block">
              <User className="hover:text-indigo-600" />
            </button> */}

            {/* <button className="relative">
              <Heart className="hover:text-indigo-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                2
              </span>
            </button> */}

            <button className="relative">
              <ShoppingCart className="hover:text-indigo-600" />
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <button className="lg:hidden">
              <Menu />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;