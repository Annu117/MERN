// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';

// const PostList = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const observer = useRef();

//   useEffect(() => {
//     const fetchPosts = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('http://localhost:5000/posts?page=${page}');
//         // setPosts(response.data);
//         // setLoading(false);
//         setPosts(prevPosts => [...prevPosts, ...response.data.posts]);
//         setHasMore(response.data.posts.length > 0);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [page]);

//   const lastPostElementRef = useRef();

//   useEffect(() => {
//     if (loading) return;
//     if (observer.current) observer.current.disconnect();
//     observer.current = new IntersectionObserver(entries => {
//       if (entries[0].isIntersecting && hasMore) {
//         setPage(prevPage => prevPage + 1);
//       }
//     });
//     if (lastPostElementRef.current) {
//       observer.current.observe(lastPostElementRef.current);
//     }
//   }, [loading, hasMore]);

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-4 text-center">Latest Posts</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {posts.map((post, index) => {
//           if (posts.length === index + 1) {
//             return (
//               <div
//                 ref={lastPostElementRef}
//                 key={post.id}
//                 className="bg-white rounded-lg shadow-md overflow-hidden"
//               >
//                 <img
//                   src={post.image}
//                   alt={post.title}
//                   className="w-full h-40 object-cover"
//                 />
//                 <div className="p-4">
//                   <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
//                   <p className="text-gray-600">{post.content}</p>
//                 </div>
//               </div>
//             );
//           } else {
//             return (
//               <div
//                 key={post.id}
//                 className="bg-white rounded-lg shadow-md overflow-hidden"
//               >
//                 <img
//                   src={post.image}
//                   alt={post.title}
//                   className="w-full h-40 object-cover"
//                 />
//                 <div className="p-4">
//                   <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
//                   <p className="text-gray-600">{post.content}</p>
//                 </div>
//               </div>
//             );
//           }
//         })}
//       </div>
//       {loading && <p className="text-gray-600 text-center mt-4">Loading...</p>}
//     </div>
//   );
// };

// export default PostList;


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/posts?page=${page}`);
        console.log('Fetched posts:', response.data.posts);
        setPosts(prevPosts => [...prevPosts, ...response.data.posts]);
        setHasMore(response.data.posts.length > 0);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const lastPostElementRef = useRef();

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (lastPostElementRef.current) {
      observer.current.observe(lastPostElementRef.current);
    }
  }, [loading, hasMore]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Latest Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post, index) => {
          if (posts.length === index + 1) {
            return (
              <div
                ref={lastPostElementRef}
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600">{post.content}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600">{post.content}</p>
                </div>
              </div>
            );
          }
        })}
      </div>
      {loading && <p className="text-gray-600 text-center mt-4">Loading...</p>}
    </div>
  );
};

export default PostList;
