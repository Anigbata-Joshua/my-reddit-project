import { Routes, Route } from 'react-router-dom';
import Home from './features/home/pages/HomePage';
import PostPage from './features/posts/pages/PostPage';
import CommunityPage from './features/community/pages/CommunityPage';
import LoginPage from './features/auth/LoginPage';
import Profile from './features/profile/pages/ProfilePage';
import Layout from './layout/Layout';
import Popular from './features/explore/pages/PopularPage';
import News from './features/explore/pages/NewsPage';
import Explore from './features/explore/pages/ExplorePage';
import CreateCommunity from './features/community/pages/CreateCommunityPage';
import ProtectedRoute from './layout/ProtectedRoute';
import NotFound from './shared/NotFound';
import CreatePost from './features/posts/pages/CreatePostPage';
import SearchPage from './features/search/pages/SearchPage';
import RecentPostsSidebar from './features/home/components/RecentPostsSidebar';


function App() {
  const homeRightSidebar = <RecentPostsSidebar />;

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
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<NotFound />} /></Route>
    </Routes>
  );
}

export default App;