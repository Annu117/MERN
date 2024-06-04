import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const result = await axios.post('http://localhost:5000/forgot-password', { email });
      const result = await axios.post('https://mern-api-sable.vercel.app/forgot-password', { email });

      if (result.data.message === "Success") {
        setMessage('Password reset link sent! Please check your email.');
        setError('');
      } else {
        setError(result.data.message);
        setMessage('');
      }
    } catch (error) {
      setError('Failed to send password reset link');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Forgot Password
        </h2>
        <div className="bg-gray-50 rounded-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            {message && <div className="text-green-500 text-sm mb-4">{message}</div>}
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Reset Link
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600"><Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">Back to Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
