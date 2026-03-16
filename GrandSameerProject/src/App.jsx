import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Industries from "./pages/Industries/Industries";
import CaseStudiesPage from "./pages/CaseStudiesPage/CaseStudiesPage";

import GalleryPage from "./pages/GalleryPage/GalleryPage";
import FullGallery from "./components/Gallery/FullGallery";
import ContactUs from "./pages/ContactUs/ContactUs";
import AllCasesPage from "./pages/casesPage/AllCasesPage";
import Footer from "./components/Footer/Footer";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import SolutionsPage from "./pages/SolutionsPage/SolutionsPage";
import CaseStudyDetail from "./components/CaseStudy/CaseStudyDetail";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/case-studies" element={<CaseStudiesPage/>} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/full-gallery" element={<FullGallery />} /> 
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />

          {/* Cases */}
          <Route path="/cases" element={<AllCasesPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
