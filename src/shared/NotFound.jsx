export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center">
        <h1 className="text-5xl font-bold text-gray-900">404</h1>
        <p className="mt-4 text-lg text-gray-600">Page not found.</p>
        <p className="mt-2 text-sm text-gray-500">The route you tried does not exist.</p>
      </div>
    </div>
  );
}
