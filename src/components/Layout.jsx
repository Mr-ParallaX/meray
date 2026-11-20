import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout = ({ children, hideHeader = false }) => {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col font-sans selection:bg-white selection:text-black">
      <ScrollToTop />
      {!hideHeader && (
        <div className="px-6 md:px-16 py-6 border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto">
            <Header />
          </div>
        </div>
      )}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
