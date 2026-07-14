import React from 'react';
import AuthPageShell from './components/AuthPageShell';
import AuthSocialButtons from './components/AuthSocialButtons';
import Input from './components/Input';
import { useAuthForm } from './hooks/useAuthForm';

export default function AuthForm({ initialMode = 'login' }) {
  const { isLogin, setIsLogin, isOpen, setIsOpen,
    formData, handleChange, handleSubmit, successMessage, setSuccessMessage,
    loading, error, isFormValid } = useAuthForm(initialMode);

  if (!isOpen) return null;

  return (
    <AuthPageShell onClose={() => setIsOpen(false)}>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{isLogin ? 'Login' : 'Sign Up'}</h1>
        <p className="mt-3 text-[13px] leading-relaxed text-gray-500">
          By continuing, you agree to our <a href="#" className="text-blue-600 hover:underline">User Agreement</a> and acknowledge that you understand the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
        </p>
      </div>

      <AuthSocialButtons />

      <div className="relative my-6 flex items-center justify-center">
        <div className="absolute inset-x-0 h-px bg-gray-200" />
        <span className="relative bg-white px-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">OR</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <Input
            label="Full Name"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
        {successMessage && <p className="text-xs text-green-600 font-medium">{successMessage}</p>}

        <p className="text-xs text-gray-900 pt-1">
          {isLogin ? 'New to Reddit?' : 'Already a redditor?'} {' '}
          <button
            type="button"
            onClick={() => { setIsLogin(!isLogin); setSuccessMessage(''); }}
            className="font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>

        <button
          type="submit"
          disabled={loading || !isFormValid}
          className={`mt-20 flex w-full items-center justify-center rounded-full h-12 font-semibold text-sm transition-all ${isFormValid && !loading
            ? 'bg-orange-600 text-white hover:bg-orange-700 cursor-pointer shadow-md'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
        >
          {loading ? 'Please wait...' : 'Continue'}
        </button>
      </form>
    </AuthPageShell>
  );
}