import AuthForm from './AuthForm';

export default function LoginPage({ initialMode = 'login' }) {
  return <AuthForm initialMode={initialMode} />;
}
