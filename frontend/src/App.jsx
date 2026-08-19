import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import bgImage from './assets/bgimage.png';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SkillAssessmentPage from './pages/SkillAssessmentPage';
import SkillGapPage from './pages/SkillGapPage';
import CareerRecommendationsPage from './pages/CareerRecommendationsPage';
import FutureSkillsPage from './pages/FutureSkillsPage';
import LearningRoadmapPage from './pages/LearningRoadmapPage';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage';
import ExplainableAiPage from './pages/ExplainableAiPage';
import ModelEvaluationPage from './pages/ModelEvaluationPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import OccupationsExplorerPage from './pages/OccupationsExplorerPage';

import { useAuth } from './context/AuthContext';

// Protected Route Guard
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex-1 min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#843bf1] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (adminOnly && currentUser?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // Gate only brand-new registered users to /assessment until they score their initial skills
  if (
    currentUser?.role !== 'admin' &&
    currentUser?.isNewUser &&
    !currentUser?.assessmentDone &&
    location.pathname !== '/assessment'
  ) {
    return <Navigate to="/assessment" replace state={{ from: location }} />;
  }

  return children;
};

export function App() {
  const location = useLocation();
  const { currentUser } = useAuth();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isLandingOrAuth = location.pathname === '/' || isAuthPage;

  const isLanding = location.pathname === '/';

  // ── Global scroll-to-top on every route change ──────────────────────────
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col font-sans antialiased text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-[#090d16] selection:bg-indigo-500 selection:text-white transition-colors duration-300 overflow-x-hidden">

      {/* ========================================================================= */}
      {/* GLOBAL FULL-WEBSITE SCENIC BACKGROUND BACKDROP (EXCLUDING LANDING PAGE) */}
      {/* ========================================================================= */}
      {!isLanding && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Full 100% Resolution Scenic Mountain Artwork */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat opacity-100"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundPosition: 'center top',
              backgroundSize: 'cover'
            }}
          />
        </div>
      )}

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {isAdminPath ? (
          <Routes>
            <Route path="/admin/*" element={
              <ProtectedRoute adminOnly>
                <AdminDashboardPage />
              </ProtectedRoute>
            } />
          </Routes>
        ) : (
          <div className="min-h-screen flex flex-col">
            {!isLandingOrAuth && <Sidebar />}

            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${!isLandingOrAuth ? 'md:ml-64' : 'ml-0'}`}>
              <Navbar />
              <main className={`flex-1 flex flex-col overflow-x-hidden ${isLandingOrAuth ? '' : 'p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full'}`}>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                  <Route path="/assessment" element={<ProtectedRoute><SkillAssessmentPage /></ProtectedRoute>} />
                  <Route path="/skill-gap" element={<ProtectedRoute><SkillGapPage /></ProtectedRoute>} />
                  <Route path="/career-roles" element={<ProtectedRoute><OccupationsExplorerPage /></ProtectedRoute>} />
                  <Route path="/occupations" element={<ProtectedRoute><OccupationsExplorerPage /></ProtectedRoute>} />
                  <Route path="/career-recommendations" element={<ProtectedRoute><CareerRecommendationsPage /></ProtectedRoute>} />
                  <Route path="/future-skills" element={<ProtectedRoute><FutureSkillsPage /></ProtectedRoute>} />
                  <Route path="/roadmap" element={<ProtectedRoute><LearningRoadmapPage /></ProtectedRoute>} />
                  <Route path="/resume-analyzer" element={<ProtectedRoute><ResumeAnalyzerPage /></ProtectedRoute>} />
                  <Route path="/explainable-ai" element={<ProtectedRoute><ExplainableAiPage /></ProtectedRoute>} />
                  <Route path="/model-evaluation" element={<ProtectedRoute><ModelEvaluationPage /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              {!isAuthPage && <Footer />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
