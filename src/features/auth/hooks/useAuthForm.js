import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authstore';

export function useAuthForm(initialMode = 'login') {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage('');

    if (isLogin) {
      const result = await login(formData.email, formData.password);
      if (result?.success) {
        setSuccessMessage(`Welcome back ${result.data.username}`);
        setFormData({ username: '', email: '', password: '' });
        navigate('/');
      }
      return;
    }

    const result = await register(formData.username, formData.email, formData.password);
    if (result?.success) {
      setSuccessMessage('Registration Successful');
      setIsLogin(true);
      setFormData({ username: '', email: '', password: '' });
      navigate('/login');
    }
  };

  const isFormValid = useMemo(
    () => (isLogin ? formData.email && formData.password : formData.username && formData.email && formData.password),
    [formData, isLogin],
  );

  return {
    isLogin,
    setIsLogin,
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
