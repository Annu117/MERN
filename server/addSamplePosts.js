require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");

  const samplePosts = [
    {
      title: 'Post 1',
      content: 'This is the content of post 1.',
      image: 'https://via.placeholder.com/300x200'
    },
    {
      title: 'Post 2',
      content: 'This is the content of post 2.',
      image: 'https://via.placeholder.com/300x200'
    },
    {
      title: 'Post 3',
      content: 'This is the content of post 3.',
      image: 'https://via.placeholder.com/300x200'
    },
    {
      title: 'Post 4',
      content: 'This is the content of post 4.',
      image: 'https://via.placeholder.com/300x200'
    },
    {
      title: 'Post 5',
      content: 'This is the content of post 5.',
      image: 'https://via.placeholder.com/300x200'
    }
  ];

  Post.insertMany(samplePosts)
    .then(() => {
      console.log('Sample posts added');
      mongoose.connection.close();
    })
    .catch(error => {
      console.error('Error adding sample posts:', error);
      mongoose.connection.close();
    });

}).catch(error => {
  console.error("MongoDB connection error:", error);
});
