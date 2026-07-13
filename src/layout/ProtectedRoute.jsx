import { useAuthStore } from '../store/authstore';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const user = useAuthStore((state) => state.user);
    const location = useLocation();

    if (!user) {
        // Remember the page they were trying to visit so we can send them back after login
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return children;
}