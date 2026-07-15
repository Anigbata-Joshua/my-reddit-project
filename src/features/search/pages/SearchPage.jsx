import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostList from '../../posts/components/PostList';
import api from '../../../services/api';

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteError, setDeleteError] = useState('');

    useEffect(() => {
        if (!query) return;
        const fetchResults = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/post?search=${encodeURIComponent(query)}`);
                setResults(response.data.data);
            } catch (error) {
                setError('Search failed. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [query]);

    return (
        <div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                <h1 className="text-xl font-bold text-gray-900">
                    Search results for "{query}"
                </h1>
                <p className="text-xs text-gray-500 mt-1">{results.length} results found</p>
            </div>

            {loading ? (
                <Loader />
            ) : error ? (
                <p className="text-sm text-red-500 p-4">{error}</p>
            ) : results.length === 0 ? (
                <p className="text-gray-500 p-4">No posts found for "{query}"</p>
            ) : (
                <PostList posts={results} />
            )}
        </div>
    );
}