import AuthForm from "./AuthForm";

export default function LoginPage({ initialMode = 'login' }) {
  return (
    <div>
      <AuthForm initialMode={initialMode} />
    </div>
  );
}
