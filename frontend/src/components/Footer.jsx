const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* Logo */}
        <div>
          <h2 className="text-3xl font-bold text-white">
            Nova<span className="text-indigo-500">Cart</span>
          </h2>

          <p className="mt-5 leading-7">
            Your one-stop destination for premium shopping experience.
          </p>

          <div className="flex gap-4 mt-6 text-2xl">
            <span className="cursor-pointer hover:scale-110">📘</span>
            <span className="cursor-pointer hover:scale-110">📸</span>
            <span className="cursor-pointer hover:scale-110">🐦</span>
            <span className="cursor-pointer hover:scale-110">▶️</span>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Shop</h3>

          <ul className="space-y-3">
            <li className="hover:text-white cursor-pointer">All Products</li>
            <li className="hover:text-white cursor-pointer">Categories</li>
            <li className="hover:text-white cursor-pointer">New Arrivals</li>
            <li className="hover:text-white cursor-pointer">Deals</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Support</h3>

          <ul className="space-y-3">
            <li className="hover:text-white cursor-pointer">Contact</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Returns</li>
            <li className="hover:text-white cursor-pointer">Shipping</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Company</h3>

          <ul className="space-y-3">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Newsletter
          </h3>

          <p className="mb-4">
            Subscribe for latest offers.
          </p>

          <input
            type="email"
            placeholder="Enter email"
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 outline-none"
          />

          <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg text-white font-semibold">
            Subscribe
          </button>
        </div>

      </div>

      <div className="border-t border-slate-700 py-5 text-center">
        © {new Date().getFullYear()} NovaCart. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;