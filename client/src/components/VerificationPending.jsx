// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const VerificationPending = () => {
//   const location = useLocation();
//   const email = location.state.email;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyEmail = async () => {
//       try {
//         const response = await axios.post('http://localhost:5000/verifyEmail', { email });
//         if (response.data.success) {
//           // Email verification successful, redirect to /posts
//           navigate('/posts');
//         } else {
//           // Email verification failed, handle accordingly
//           console.error('Email verification failed:', response.data.message);
//         }
//       } catch (error) {
//         console.error('Error verifying email:', error);
//       }
//     };

//     verifyEmail();
//   }, [email, navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
//           Verification Pending
//         </h2>
//         <p>An email has been sent to {email} with instructions for account verification. Please check your email and follow the instructions to complete the signup process.</p>
//       </div>
//     </div>
//   );
// };

// export default VerificationPending;

import React from 'react';
import { useLocation } from 'react-router-dom';

const VerificationPending = () => {
  const location = useLocation();
  const email = location.state.email;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Verification Pending
        </h2>
        <p>An email has been sent to {email} with instructions for account verification. Please check your email and follow the instructions to complete the signup process.</p>
      </div>
    </div>
  );
};

export default VerificationPending;
