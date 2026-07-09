export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl p-10 shadow-xl text-center">
        <h1 className="text-6xl font-black text-gray-900">404</h1>
        <p className="mt-4 text-lg text-gray-600">Page not found.</p>
        <p className="mt-2 text-sm text-gray-500">The link you followed may be broken, or the page may have been removed.</p>
      </div>
    </div>
  );
}
