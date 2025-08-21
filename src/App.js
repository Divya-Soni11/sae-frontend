import logo from './logo.svg';
import './App.css';

// import Navbar from './pages/CyberpunkSAEHomepage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SAEHomepage from './pages/SAEHomepage';
import CyberpunkNavbar from './pages/Navbar';
import CyberpunkGallery from './pages/Gallery';
import Footer from './pages/Footer';
import MeetTheTeam from './pages/MeettheTeam';
import Sponosor from './pages/Sponosor';
import SAEblogs from './Component/SAEblogs';
import Event from './pages/Event';
import EvenDetails from './Component/EvenDetails';
import ArticleSkeleton from './Component/ArticleSkeleton';
import BlogPost from './Component/BlogPost';
import Newsletter from './pages/Newsletter';

function App() {
  return (
    <>
    <BrowserRouter>
    <CyberpunkNavbar className="sticky top-0 "  />
      <Routes>
        <Route path="/" element={<SAEHomepage />} />
        <Route path="/gallery" element={<CyberpunkGallery />} />
        <Route path="/Meet-team" element={<MeetTheTeam/>} />
        <Route path="/sponsor" element={<Sponosor/>}/>
        {/* <Route path = "/events" element={<Event/>}/> */}
        <Route path="/sae-blogs" element={<Newsletter />} />
        {/* <Route path = "/sae-project-blog/:blogId" element={<SAEblogs/>}/> */}
        <Route path="/event-details/:eventId" element={<EvenDetails/>} />
        <Route path="/sae-project-blog/:wing/:projectId" element={<SAEblogs />} />
        <Route path="/sae-project-blog" element={<SAEblogs />} />
        <Route path="/sae-blog-article/:title/:category" element={<BlogPost />} />
        <Route path="/techblog" element={<ArticleSkeleton />} />
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
    {/* <CyberpunkSAEHomepage/>
    <CyberpunkGallery/> */}
   </>
  );
}

export default App;
