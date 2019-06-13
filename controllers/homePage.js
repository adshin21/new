const Post = require('../database/models/Post');

module.exports = async (req, res) => {
    const post = await Post.find({});
    // console.log(req.session);
    res.render('index', { post });
};