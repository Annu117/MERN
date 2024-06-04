import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const result = await axios.post('http://localhost:5000/login', { username, password });
      const result = await axios.post('https://mern-api-sable.vercel.app/login', { username, password });

      if (result.data.message === "Success") {
        localStorage.setItem('token', result.data.token);
        navigate('/home', { state: { message: `Welcome back, ${username}!` } });
      } else {
        setError(result.data.message);
      }
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Login to <span className="text-indigo-600">MelodyVerse</span>
        </h2>
        <div className="bg-gray-50 rounded-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div className="mb-6">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-500 text-sm">
              Forgot Password?
            </Link>
          </div>
          <p className="text-center mt-4 text-gray-600">Don't have an account? <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
