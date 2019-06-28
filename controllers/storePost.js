const multer = require('multer');
const path = require('path');
const Post = require('../database/models/Post');
const User = require('../database/models/Users');


const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '..', 'public/posts'),
    filename: (req, file, cb) => {
        /*
        let name = file.originalname;
        let n = name.length;
        let idx = n;
        for(let i = n-1 ; i >= 0 ; ++i){
            if(name[i] === '.'){
                idx = i;
                break;
            }
        }
        const new_name = name.substring(0,idx);
        */
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({
    storage: storage
}).single('image');


module.exports =  (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            res.redirect('/posts/new');
        }
        else{

            const data = req.body;
            const file = req.file;
            const userdata = await User.findOne({email: req.session.email});
            const username = userdata.username;

            if(data.content && data.title && data.description && file){
                Post.create({
                    username: username,
                    ...data,
                    image: `/posts/${file.filename}`,
                    email : req.session.email
                });
                console.log(data , "yha aa rha hai");
                res.redirect('/');
            }
            else{
                console.log(data , "log in nhi hai");
                res.redirect('/posts/new');
            }   
        }
    });
};