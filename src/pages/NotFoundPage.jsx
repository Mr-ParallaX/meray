import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useSEO } from '../hooks/useSEO';

const NotFoundPage = () => {
  useSEO({
    title: "Page Not Found — Meray Hair Salon",
    description: "The requested page was not found."
  });

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-32 text-center flex flex-col items-center justify-center">
        <span className="font-thunder text-9xl font-bold text-stroke block mb-4">
          404
        </span>
        <h1 className="text-4xl md:text-6xl font-thunder font-bold uppercase text-white tracking-tight mb-4">
          Lost? Let's Get You A Fresh Look.
        </h1>
        <p className="text-gray-400 font-sans text-lg max-w-md mx-auto mb-10 leading-relaxed">
          The page you're searching for might have been trimmed or moved. Head back home to book your appointment.
        </p>
        <Link
          to="/"
          className="px-10 py-4 bg-white text-black font-trade font-bold uppercase tracking-wider rounded-full hover:bg-gray-200 transition-all shadow-xl"
        >
          Return to Home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
