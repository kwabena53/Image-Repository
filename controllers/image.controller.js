const express = require('express');
const mongoose = require('mongoose');
const Images = mongoose.model('images');
const router = express.Router();
const upload = require("../s3");
const auth = require("../middleware/auth");




router.get('/images', async(req, res)=>{

    try {
       const images =  await Images.find({})
       if(images){
        res.status(200).json(images)
       }
       res.status(400).send("Invalid request");
    } catch (error) {
        res.status(400).send(error)
    }
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

router.post('/upload', upload.single('image'), async(req, res)=>{
    try {
        const savedImage = await Images.create({
            ...req.body,
            image_url: req.file.location
        })
        if(savedImage){
            res.status(200).send(savedImage)
        }
        res.status(400).send(savedImage);

    } catch (error) {
        res.status(400).send(error)
    }   
});



module.exports = router;
