import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ── Portfolio components ──
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Contact from "./pages/Contact";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import AIChat from "./components/AIChat";

// ── Admin components ──
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminSkills from "./pages/admin/Skills";
import Messages from "./pages/admin/Messages";
import Videos from "./pages/admin/Videos";
import Designs from "./pages/admin/Designs";
import Sidebar from "./components/admin/Sidebar";
import AdminNavbar from "./components/admin/AdminNavbar";

// ── Protection des routes admin ──
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin" replace />;
};

// ── Layout admin : Sidebar + Navbar + contenu ──
const AdminLayout = ({ children }) => (
  <div className="flex h-screen bg-dark overflow-hidden">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <AdminNavbar />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
    </div>
  </div>
);

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <Router>
      <Routes>
        {/* ═══════════════════════════════════════
            ADMIN ROUTES (/admin/*)
            ═══════════════════════════════════════ */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminLayout><Dashboard /></AdminLayout></PrivateRoute>} />
        <Route path="/admin/projects" element={<PrivateRoute><AdminLayout><AdminProjects /></AdminLayout></PrivateRoute>} />
        <Route path="/admin/skills" element={<PrivateRoute><AdminLayout><AdminSkills /></AdminLayout></PrivateRoute>} />
        <Route path="/admin/messages" element={<PrivateRoute><AdminLayout><Messages /></AdminLayout></PrivateRoute>} />
        <Route path="/admin/videos" element={<PrivateRoute><AdminLayout><Videos /></AdminLayout></PrivateRoute>} />
        <Route path="/admin/designs" element={<PrivateRoute><AdminLayout><Designs /></AdminLayout></PrivateRoute>} />

        {/* ═══════════════════════════════════════
            PORTFOLIO ROUTES (pages publiques)
            ═══════════════════════════════════════ */}
        <Route path="/*" element={
          <div className="portfolio-cursor">
            <Loader onComplete={() => setLoaded(true)} />
            <CustomCursor />
            <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
              <AIChat />
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
