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

export function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isLandingOrAuth = location.pathname === '/' || isAuthPage;

  const isLanding = location.pathname === '/';

  // ── Global scroll-to-top on every route change ──────────────────────────
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className={`relative min-h-screen flex flex-col font-sans antialiased text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-[#090d16] selection:bg-indigo-500 selection:text-white transition-colors duration-300 overflow-x-hidden ${isAuthPage ? 'h-screen overflow-hidden' : ''}`}>

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
            <Route path="/admin/*" element={<AdminDashboardPage />} />
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
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/assessment" element={<SkillAssessmentPage />} />
                  <Route path="/skill-gap" element={<SkillGapPage />} />
                  <Route path="/career-roles" element={<OccupationsExplorerPage />} />
                  <Route path="/occupations" element={<OccupationsExplorerPage />} />
                  <Route path="/career-recommendations" element={<CareerRecommendationsPage />} />
                  <Route path="/future-skills" element={<FutureSkillsPage />} />
                  <Route path="/roadmap" element={<LearningRoadmapPage />} />
                  <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
                  <Route path="/explainable-ai" element={<ExplainableAiPage />} />
                  <Route path="/model-evaluation" element={<ModelEvaluationPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
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
