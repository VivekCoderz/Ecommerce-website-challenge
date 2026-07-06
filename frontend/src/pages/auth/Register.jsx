import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Register = () => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ]= useState("");
  const navigator = useNavigate();

  const [formData, setFormData] = useState({      
    fullName : "",
    email: "",
    password: "",
    ConfirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/auth/register", formData);
      navigator("/login");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Nova<span className="text-indigo-600">Cart</span>
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account and start shopping.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="mt-8 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>

            <input
              type="text"
              name="fullName"
              placeholder="NovaCart"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="NovaCart@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>

            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              name="ConfirmPassword"
              placeholder="********"
              value={formData.ConfirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm">
              {error}
            </div>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t"></div>
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 border-t"></div>
        </div>

        {/* Google */}
        <button
          disabled
          className="relative w-full border border-gray-300 bg-gray-100 text-gray-400 py-3 rounded-xl cursor-not-allowed"
        >
          Continue with Google
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] px-2 py-1 rounded-full">
            Coming Soon
          </span>
        </button>

        {/* Login */}
        <p className="text-center text-gray-500 mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
