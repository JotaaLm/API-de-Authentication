// routes/postRoutes.js
const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const Post = require('../models/Post');
const router = express.Router();

// Criar novo post (protegido)
router.post('/', authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = new Post({ title, content, user: req.user._id });
    await post.save();

    // Relacionar o post com o usuário
    req.user.posts.push(post._id);
    await req.user.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: 'Error creating post' });
  }
});

module.exports = router;
