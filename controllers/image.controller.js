const express = require('express');
const mongoose = require('mongoose');
const Images = mongoose.model('images');
const router = express.Router();
const upload = require("../s3");
const auth = require("../middleware/auth");




router.get('/images',(req, res)=>{
    Images.find({},(err, doc) => {
        try {
            if(!err){
                res.send(doc)
            }else{
                res.status(404);
                res.json({message: err});
            }
        } catch (error) {
            res.status(404);
            res.json({message: "Invalid request"});
        }
    })
});

router.get('/image/like',(req, res)=>{
    const id = req.body.id
    const liked = req.body.isLiked
    const update = liked ? { $inc: { "likes": 1 } } : { $dec: { "likes": 1 } }
            Images.findByIdAndUpdate(id, update, {new: true }, (err, doc) => {
                try {
                    if(!err) {
                        res.send(doc)
                    }else {
                        res.status(404);
                        res.json({message: err});           
                    }
                } catch (error) {
                    res.status(404);
                    res.json({message: "Invalid request"}); 
                }
            })       
})

router.post('/upload', upload.single('image'), (req, res)=>{
    const images = new Images(req.body)
    images.image_url = req.file.location
    images.save((err, doc) =>{
        if(!err){
            res.send({message: "upload successful", data: doc});
        }else{
            res.status(404);
            res.json({message: "failed to upload", error: err});
        }
    })
});



module.exports = router;
