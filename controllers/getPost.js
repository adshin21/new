const Post = require('../database/models/Post');

module.exports = async (req, res) => {
    const post = await Post.findById({ _id: req.params.id });
    // console.log(post);
    res.render('post', { post : post , auth: req.session.userId });
};
