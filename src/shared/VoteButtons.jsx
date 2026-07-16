import { useState } from 'react';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import api from '../services/api';
import { useAuthStore } from '../store/authstore';
import { usePostStore } from '../store/postStore'
import { useNavigate } from 'react-router-dom';


export default function VoteButtons({ votes, targetId, targetType }) {
  const [count, setCount] = useState(votes);
  const [userVote, setUserVote] = useState(0); 
  const { fetchPosts } = usePostStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();


const handleVote = async (direction) => {
    if (!user) {
        navigate('/login');
        return;
    }

    try {
        const response = await api.post('/vote', {
            targetId,
            targetType,
            value: direction
        });
        // Use the real voteCount from the server
        setCount(response.data.voteCount);
        
        // Toggle userVote state
        if (userVote === direction) {
            setUserVote(0);
        } else {
            setUserVote(direction);
        }
    } catch (error) {

    }
};

  const formatCount = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n);

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-full px-2.5 py-1.5 cursor-pointer">
      <button
        className={`p-0.5 rounded hover:bg-black/10 ${userVote === 1 ? 'text-orange-600' : 'text-gray-500'}`}
        onClick={() => handleVote(1)}
        aria-label="Upvote"
      >
        <ArrowBigUp size={20} fill={userVote === 1 ? 'currentColor' : 'none'} />
      </button>
      <span className="text-xs font-bold text-gray-900 min-w-6 text-center">
        {formatCount(count)}
      </span>
      <button
        className={`p-0.5 rounded hover:bg-black/10 ${userVote === -1 ? 'text-blue-500' : 'text-gray-500'}`}
        onClick={() => handleVote(-1)}
        aria-label="Downvote"
      >
        <ArrowBigDown size={20} fill={userVote === -1 ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
}
