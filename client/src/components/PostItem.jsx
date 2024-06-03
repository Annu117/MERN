import React from 'react';

const PostItem = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="text-gray-700 mt-2">{post.content}</p>
      <div className="flex items-center mt-4">
        <img
          className="w-10 h-10 rounded-full"
          src={post.user.profilePicture || 'https://via.placeholder.com/150'}
          alt={post.user.username}
        />
        <div className="ml-4">
          <p className="text-gray-900 font-bold">{post.user.name || post.user.username}</p>
          <p className="text-gray-600">{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
