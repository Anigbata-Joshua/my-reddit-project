import AuthForm from "../components/auth/AuthForm";

export default function LoginPage({ initialMode = 'login' }) {
  return (
    <div>
      <AuthForm initialMode={initialMode} />
    </div>
  );
}
