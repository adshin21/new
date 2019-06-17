const multer = require('multer');
const path = require('path');
const Post = require('../database/models/Post');

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '..', 'public/posts'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({
    storage: storage
}).single('image');


module.exports = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            res.redirect('/posts/new');
        }
        else{
            const data = req.body;
            const file = req.file;

            if(data.username && data.content && data.title && data.description && file){
                Post.create({
                    ...data,
                    image: `/posts/${file.filename}`,
                    user_id : req.session.userId
                });
                res.redirect('/');
            }
            else{
                res.redirect('/posts/new');
            }   
        }
    });
};