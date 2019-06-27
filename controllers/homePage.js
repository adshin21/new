const Post = require('../database/models/Post');

module.exports = async (req, res) => {
    let post = await Post.find({});
    post = await post.reverse();
    // console.log(post);
    // console.log(req.flash('success'));
    res.render('index', { 
        post: post, 
        auth : req.session.userId,
        msg: req.flash('success')[0]
    });
};