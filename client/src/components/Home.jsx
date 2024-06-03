import React from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const { message } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-red-900">
          {message || 'Welcome to MelodyVerse'}
        </h2>
      </div>
    </div>
  );
};

export default Home;
