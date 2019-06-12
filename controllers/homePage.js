const Post = require('../database/models/Post');

module.exports = async (req, res) => {
    const post = await Post.find({});
    res.render('index', { post });
};