import { Search, ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Search Bar */}
        <div className="relative w-full max-w-lg">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Cart Button */}
        <button className="relative ml-6 p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition">
          <ShoppingCart size={24} />

          {/* Cart Count */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;