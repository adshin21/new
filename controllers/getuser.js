const User = require('../database/models/Users');
const Post = require('../database/models/Post');

module.exports = async (req , res) => {
    // console.log(req.params);
    const user = await User.findOne({username: req.params.id});
    let posts = await Post.find({username: req.params.id});
    posts.reverse();
    // console.log(user);
    res.render('user' , {post : posts , user: user});
}