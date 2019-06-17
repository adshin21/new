const Post = require('../database/models/Post');

module.exports = async (req, res) => {
    let post = await Post.find({});
    post = await post.reverse();
    res.render('index', { post: post , auth : req.session.userId});
};