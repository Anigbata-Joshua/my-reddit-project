import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import CommunityPage from './pages/CommunityPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Layout from './components/layout/Layout';
import Popular from './pages/Popular';
import News from './pages/News';
import Explore from './pages/Explore';
import CreateConnunity from './pages/CreateCommunity';

// Import your widget data and component to pass as the right sidebar prop
import RecentPostsWidget from './components/community/CommunityCard';
import { posts as mockPosts } from './data/mockData';

function App() {
  // Build the home page sidebar content layout piece safely
  const homeRightSidebar = <RecentPostsWidget posts={[...mockPosts].slice(0, 2)} />;

  return (
    <Routes>
      {/* Home page with right column widget */}
      <Route element={<Layout rightColumn={homeRightSidebar} />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/*  Sub-pages with no right column widget */}
      <Route element={<Layout />}>
        <Route path="/popular" element={<Popular />} />
        <Route path="/news" element={<News />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create-community" element={<CreateConnunity />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/r/:communityName" element={<CommunityPage />} />
      </Route>

      {/* Authentication */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;