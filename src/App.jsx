import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import CommunityPage from './pages/CommunityPage';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import Layout from './components/layout/Layout';
import Popular from './pages/Popular';
import News from './pages/News';
import Explore from './pages/Explore';
import CreateCommunity from './pages/CreateCommunity';
import ProtectedRoute from './components/route/ProtectedRoute';
import NotFound from './pages/NotFound';
import CreatePost from './pages/CreatePostPage';

function App() {
  // Build the home page sidebar content layout piece safely
  const homeRightSidebar = null;

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
        <Route path="/create-community" element={<CreateCommunity />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/r/:communityName" element={<CommunityPage />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/login" element={<LoginPage initialMode="login" />} />
        <Route path="/signup" element={<LoginPage initialMode="signup" />} />
        <Route path="/profile" element={<ProtectedRoute>   <Profile /> </ProtectedRoute>} />
        <Route path="*" element={<NotFound />} /></Route>
    </Routes>
  );
}

export default App;