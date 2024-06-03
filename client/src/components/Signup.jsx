import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const Signup = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const signupwithgoogle = ()=>{
    window.open("http://localhost:5000/auth/google/callback","_self")
}
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      termsAccepted: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms and conditions')
    }),
    onSubmit: async (values) => {
      try {
        const result = await axios.post('http://localhost:5000/signup', values);
        if (result.data.message === "Success") {
          localStorage.setItem('token', result.data.token);
          console.log(`Welcome email sent to ${values.email}`);
          navigate('/posts', { state: { message: `Welcome back, ${values.username}!` } });
        } else {
          setError(result.data.message);
        }
      } catch (error) {
        setError('Signup failed');
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          SignUp to <span className="text-indigo-600">MelodyVerse</span>
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Username"
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
              )}
            </div>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              )}
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              )}
            </div>
            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Confirm Password"
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
              )}
            </div>
            <div>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Name (Optional)"
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.termsAccepted}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-900">
                I accept the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms and Conditions</a>
              </label>
            </div>
            {formik.touched.termsAccepted && formik.errors.termsAccepted && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.termsAccepted}</div>
            )}
          </div>

          {error && <div className="text-red-500 text-sm mt-4">{error}</div>}

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">Log In</Link>
        </p>
        <p className="text-center mt-2 text-sm text-gray-600">
          Or sign up with
          <button
            onClick={signupwithgoogle}
            className="ml-1 text-indigo-600 hover:text-indigo-500 font-medium focus:outline-none"
          >
            Google
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
