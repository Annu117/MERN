// import React, { useState, useEffect } from 'react';
// import { fetchPosts } from '../services/api';
// import PostItem from './PostItem';
// import axios from 'axios';

// const PostList = () => {
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const loadPosts = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchPosts(page);
//         setPosts((prevPosts) => [...prevPosts, ...data]);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch posts');
//         setLoading(false);
//       }
//     };

//     loadPosts();
//   }, [page]);

//   return (
//     <div className="container mx-auto px-4">
//       {posts.map((post) => (
//         <PostItem key={post._id} post={post} />
//       ))}
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {!loading && (
//         <button
//           className="bg-blue-500 text-white py-2 px-4 rounded"
//           onClick={() => setPage((prevPage) => prevPage + 1)}
//         >
//           Load More
//         </button>
//       )}
//     </div>
//   );
// };

// export default PostList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Latest Posts</h1>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
