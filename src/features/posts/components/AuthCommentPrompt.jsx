import { Link, useLocation } from "react-router-dom";

export default function AuthCommentPrompt() {
    const location = useLocation();

    return (
        <div className="mb-6 p-5 border border-gray-100 rounded-xl bg-gray-50 text-center flex flex-col items-center justify-center gap-3">
            <p className="text-sm text-gray-500 font-medium">Log in or sign up to leave a comment</p>
            <div className="flex gap-2">
                <Link
                    to="/login"
                    state={{ from: location.pathname }}
                    className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full text-xs font-bold transition-all"
                >
                    Log In
                </Link>
                <Link
                    to="/signup"
                    state={{ from: location.pathname }}
                    className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white rounded-full text-xs font-bold transition-all"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
}