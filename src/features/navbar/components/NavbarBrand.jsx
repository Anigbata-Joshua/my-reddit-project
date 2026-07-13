import { Link } from 'react-router-dom';

export default function NavbarBrand() {
    return (
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-gray-900 shrink-0 pl-10 md:pl-0">
            <span className="font-extrabold text-2xl tracking-tight text-orange-600">reddit</span>
        </Link>
    );
}
