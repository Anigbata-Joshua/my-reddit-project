import React, { useState } from 'react';
import { useAuthStore } from '../../store/authstore';
import { Link, useNavigate } from 'react-router-dom';

export default function AuthForm({ initialMode = 'login' }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  // Hooks — use per-field selectors to keep references stable across renders
  const login    = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const loading  = useAuthStore((s) => s.loading);
  const error    = useAuthStore((s) => s.error);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle Change in form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (isLogin) {
      const result = await login(formData.email, formData.password);

      if (result?.success) {
        setSuccessMessage(`Welcome back ${result.data.username}`);
        setFormData({ email: "", password: "" });
        navigate('/');
      }
    } else {
      // Fixed: Moved out of the isLogin block so registration actually triggers
      const result = await register(formData.username, formData.email, formData.password);
      if (result?.success) {
        setSuccessMessage('Registration Successful');
        setIsLogin(true);
        setFormData({ username: "", email: "", password: "" });
        navigate('/login');

      }
    }
  };

  if (!isOpen) return null;

  // Validation helper to verify required inputs are filled
  const isFormValid = isLogin
    ? formData.email && formData.password
    : formData.username && formData.email && formData.password;

  return (
    // Backdrop / Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 ">

      {/* Modal Container Card */}
      <div className="relative w-full max-w-lg h-auto rounded-2xl bg-white px-6 py-12 shadow-2xl transition-all sm:px-10">

        {/* Close Button (X) */}
        <Link to="/"
          onClick={() => setIsOpen(false)}
          className="absolute right-6 top-6 flex h-8 w-8 items-center cursor-pointer justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
          aria-label="Close modal"
        >
          <svg className="h-4 w-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>

        {/* Header Text */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {isLogin ? "Login" : "Sign Up"}
          </h1>

          <p className="mt-3 text-[13px] leading-relaxed text-gray-500">
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">User Agreement</a>
            {' '}and acknowledge that you understand the{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
          </p>
        </div>

        {/* SSO Provider Buttons */}
        <div className="mt-8 space-y-3">
          <button type="button" className="grid w-full grid-cols-[1fr_auto_1fr] items-center rounded-full border border-gray-300 bg-white px-5 py-3 cursor-pointer transition-colors hover:bg-gray-50">
            <div className="flex justify-start">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Continue with Google</span>
            <div />
          </button>

          <button type="button" className="grid w-full grid-cols-[1fr_auto_1fr] items-center rounded-full border border-gray-300 bg-white px-5 py-3 cursor-pointer transition-colors hover:bg-gray-50">
            <div className="flex justify-start">
              <svg className="h-5 w-5 fill-current text-gray-900" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.56 2.95-1.39z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Continue with Apple</span>
            <div />
          </button>
        </div>

        {/* Divider Line */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-x-0 h-px bg-gray-200"></div>
          <span className="relative bg-white px-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">OR</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input (Sign Up Only) */}
          {!isLogin && (
            <div className="relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full rounded-2xl bg-gray-100 p-4 text-sm text-gray-900 outline-none ring-1 ring-transparent transition-all focus:bg-white focus:ring-blue-200"
              />
              <label className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none transition-all duration-150 peer-placeholder-shown:opacity-100 peer-focus:opacity-0 ${formData.username ? 'opacity-0' : 'opacity-100'}`}>
                Full Name <span className="text-red-500">*</span>
              </label>
            </div>
          )}

          {/* Email Input Field */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full rounded-2xl bg-gray-100 p-4 text-sm text-gray-900 outline-none ring-1 ring-transparent transition-all focus:bg-white focus:ring-blue-200"
            />
            <label className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none transition-all duration-150 peer-placeholder-shown:opacity-100 peer-focus:opacity-0 ${formData.email ? 'opacity-0' : 'opacity-100'}`}>
              Email <span className="text-red-500">*</span>
            </label>
          </div>

          {/* Password Input Field */}
          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full rounded-2xl bg-gray-100 p-4 text-sm text-gray-900 outline-none ring-1 ring-transparent transition-all focus:bg-white focus:ring-blue-200"
            />
            <label className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none transition-all duration-150 peer-placeholder-shown:opacity-100 peer-focus:opacity-0 ${formData.password ? 'opacity-0' : 'opacity-100'}`}>
              Password <span className="text-red-500">*</span>
            </label>
          </div>

          {/* Global Store Errors & Messages */}
          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
          {successMessage && <p className="text-xs text-green-600 font-medium">{successMessage}</p>}

          {/* Footer Auth Switcher Toggle link */}
          <p className="text-xs text-gray-900 pt-1">
            {isLogin ? "New to Reddit?" : "Already a redditor?"}{' '}
            <button
              type="button"
              onClick={() => { setIsLogin(!isLogin); setSuccessMessage(""); }}
              className="font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>

          {/* Form Submission Action Button */}
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className={`mt-20 flex w-full items-center justify-center rounded-full h-12 font-semibold text-sm transition-all ${isFormValid && !loading
              ? 'bg-orange-600 text-white hover:bg-orange-700 cursor-pointer shadow-md'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            {loading ? "Please wait..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}