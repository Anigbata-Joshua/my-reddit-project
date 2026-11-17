import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../../store/authstore';

export function useAuthForm(initialMode = 'login') {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);

  // Sync mode whenever initialMode changes, and clear errors/messages
  useEffect(() => {
    setIsLogin(initialMode === 'login');
    if (clearError) clearError();
    setSuccessMessage('');
  }, [initialMode, clearError]);

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    if (clearError) clearError();
    setSuccessMessage('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage('');
    if (clearError) clearError();

    const from = location.state?.from?.pathname || location.state?.from || '/';

    if (isLogin) {
      const result = await login(formData.email, formData.password);
      if (result?.success) {
        setSuccessMessage(`Welcome back ${result.data.username}`);
        setFormData({ username: '', email: '', password: '' });
        navigate(from, { replace: true });
      }
    } else {
      const result = await register(formData.username, formData.email, formData.password);
      if (result?.success) {
        setSuccessMessage('Registration Successful');
        setFormData({ username: '', email: '', password: '' });
        navigate(from, { replace: true });
      }
    }
  };

  const isFormValid = useMemo(
    () => (isLogin ? formData.email && formData.password : formData.username && formData.email && formData.password),
    [formData, isLogin],
  );

  return {
    isLogin,
    setIsLogin,
    toggleMode,
    isOpen,
    setIsOpen,
    formData,
    handleChange,
    handleSubmit,
    successMessage,
    setSuccessMessage,
    loading,
    error,
    isFormValid,
  };
}
