// src/components/Posts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchPosts = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const res = await axios.get(`/api/posts?page=${page}&limit=10`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setPosts(prev => [...prev, ...res.data]);
            if (res.data.length === 0) {
                setHasMore(false);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
            setPage(prevPage => prevPage + 1);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold">Posts</h2>
            <div className="space-y-4">
                {posts.map(post => (
                    <div key={post._id} className="p-4 border rounded">
                        <h3 className="text-xl font-bold">{post.title}</h3>
                        <p>{post.content}</p>
                    </div>
                ))}
                {loading && <p>Loading more posts...</p>}
                {!hasMore && <p>No more posts to load.</p>}
            </div>
        </div>
    );
};

export default Posts;
