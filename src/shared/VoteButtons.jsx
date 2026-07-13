import { useState } from 'react';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import api from '../services/api';
import { useAuthStore } from '../store/authstore';
import { usePostStore } from '../store/postStore'


export default function VoteButtons({ votes, targetId, targetType }) {
  const [count, setCount] = useState(votes);
  const [userVote, setUserVote] = useState(0); // 1 = up, -1 = down, 0 = none
  const { fetchPosts } = usePostStore();
  const { user } = useAuthStore();


  const handleVote = async (direction) => {
    if (!user) return; // not logged in

    // Update UI optimistically first
    if (userVote === direction) {
      setCount(count - direction);
      setUserVote(0);
    } else {
      setCount(count - userVote + direction);
      setUserVote(direction);
    }

    // Then call the API
    try {
      await api.post('/vote', {
        targetId,
        targetType,
        value: direction
      });
      // await fetchPosts(); // refresh vote count from database
    } catch (error) {
      console.error('Vote failed:', error.message);

      if (userVote === direction) {
        setCount(count + direction);
        setUserVote(direction);
      } else {
        setCount(count + userVote - direction);
        setUserVote(userVote);
      }
    }
  };

  const formatCount = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n);

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-full px-2.5 py-1.5">
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
