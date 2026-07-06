import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess ,loginStart,loginFail} from "../../Redux/feature/authSlice.js";
import axios from "axios"

const Login = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate()

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try{
        dispatch(loginStart())
        const {data} = await axios.post('http://localhost:5000/auth/login',formData)
        dispatch(loginSuccess(data.user));
        navigator('/')
    }catch(errer){
        dispatch(loginFail(errer.response.data.message))
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
            Welcome back! Sign in to continue.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">
                Password
              </label>

              <button
                type="button"
                className="text-sm text-indigo-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="********"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t"></div>

          <span className="mx-3 text-gray-400 text-sm">
            OR
          </span>

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

        {/* Register */}
        <p className="text-center text-gray-500 mt-8">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;