import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AudienceProvider } from './context/AudienceContext';
import { ToastProvider } from './components/crm/ToastContext';
import Preloader from './components/Preloader';

// Public Website Pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import StylesPage from './pages/StylesPage';
import GalleryPage from './pages/GalleryPage';
import OffersPage from './pages/OffersPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BookPage from './pages/BookPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin CRM Pages & Guard
import AdminAuthGuard from './components/crm/AdminAuthGuard';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminBookingsPage from './pages/admin/AdminBookingsPage';
import AdminCalendarPage from './pages/admin/AdminCalendarPage';
import AdminCustomersPage from './pages/admin/AdminCustomersPage';
import AdminServicesPage from './pages/admin/AdminServicesPage';
import AdminStylesPage from './pages/admin/AdminStylesPage';
import AdminGalleryPage from './pages/admin/AdminGalleryPage';
import AdminOffersPage from './pages/admin/AdminOffersPage';
import AdminReviewsPage from './pages/admin/AdminReviewsPage';
import AdminStylistsPage from './pages/admin/AdminStylistsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

function App() {
  const [showPreloader, setShowPreloader] = useState(() => {
    if (typeof window !== "undefined") {
      // Do NOT show preloader on admin pages
      if (window.location.pathname.startsWith('/admin')) return false;

      const params = new URLSearchParams(window.location.search);
      if (params.get("nopreloader") === "true") return false;
      const alreadyLoaded = sessionStorage.getItem("meray_preloader_seen");
      return !alreadyLoaded;
    }
    return true;
  });

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("meray_preloader_seen", "true");
    }
  };

  return (
    <ToastProvider>
      <AudienceProvider>
        <BrowserRouter>
          {showPreloader && (
            <Preloader onComplete={handlePreloaderComplete} />
          )}
          <Routes>
            {/* Public Website Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/styles" element={<StylesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/book" element={<BookPage />} />

            {/* Admin CRM Auth Route */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Protected Admin CRM Routes */}
            <Route
              path="/admin"
              element={
                <AdminAuthGuard>
                  <AdminDashboardPage />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/bookings"
              element={
                <AdminAuthGuard>
                  <AdminBookingsPage />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/calendar"
              element={
                <AdminAuthGuard>
                  <AdminCalendarPage />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/customers"
              element={
                <AdminAuthGuard>
                  <AdminCustomersPage />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/services"
              element={
                <AdminAuthGuard>
                  <AdminServicesPage />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/styles"
              element={
                <AdminAuthGuard>
                  <AdminStylesPage />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/gallery"
              element={
                <AdminAuthGuard>
                  <AdminGalleryPage />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/offers"
              element={
                <AdminAuthGuard>
                  <AdminOffersPage />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/reviews"
              element={
                <AdminAuthGuard>
                  <AdminReviewsPage />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/stylists"
              element={
                <AdminAuthGuard>
                  <AdminStylistsPage />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <AdminAuthGuard>
                  <AdminSettingsPage />
                </AdminAuthGuard>
              }
            />

            {/* Fallback 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AudienceProvider>
    </ToastProvider>
  );
}

export default App;
