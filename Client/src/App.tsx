import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Pricing from "./Pages/Pricing";
import Projects from "./Pages/Projects";
import MyProjects from "./Pages/MyProjects";
import Preview from "./Pages/Preview";
import Community from "./Pages/Community";
import View from "./Pages/View";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Toaster } from "sonner";
import AuthPage from "./Pages/Auth/AuthPage";
import Settings from "./Pages/Settings";

export default function App() {
  const { pathname } = useLocation();

  const hideNavBar =
    (pathname.startsWith("/projects/") && pathname !== "/projects") ||
    pathname.startsWith("/view/") ||
    pathname.startsWith("/preview/");

  return (
    <>
      <Toaster />
      {!hideNavBar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/projects/:projectId" element={<Projects />} />
        <Route path="/projects" element={<MyProjects />} />
        <Route path="/preview/:projectId" element={<Preview />} />
        <Route path="/preview/:projectId/:versionId" element={<Preview />} />
        <Route path="/community" element={<Community />} />
        <Route path="/view/:projectId" element={<View />} />
        <Route path="/auth/:pathname" element={<AuthPage />} />
        <Route path="/account/settings" element={<Settings />} />
      </Routes>
      <Footer />
    </>
  );
}
