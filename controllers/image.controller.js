const express = require('express');
const mongoose = require('mongoose');
const Images = mongoose.model('images');
const router = express.Router();
const upload = require("../s3");
const auth = require("../middleware/auth");




router.get('/user/images', auth, async(req, res)=>{
    try {
        //for any filter eg. public, private
        let queryImages = {}
        if(req.query){
            queryImages = req.query
        }
        //auth user images
        const user_id = req.user.user_id
        queryImages["userId"] = user_id

       const images =  await Images.find(queryImages)
       if(images){
        return res.status(200).json(images)
       }
      return res.status(400).send("Invalid request")
       
    } catch (error) {
        console.log(error)
    }
});

router.get('/images', async(req, res)=>{
    try {
       const images =  await Images.find({type :"PUBLIC"})
       if(images){
        return res.status(200).json(images)
       }
      return res.status(400).send("Invalid request")
       
    } catch (error) {
        console.log(error)
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

router.post('/user/upload', auth, upload.single('image'), async(req, res)=>{
    try {
        const savedImage = await Images.create({
            ...req.body,
            image_url: req.file.location,
            userId: req.user.user_id
        })
        if(savedImage){
            return res.status(200).send(savedImage)
        }
       return res.status(400).send(savedImage);

    } catch (error) {
        console.log(error)
    }   
});

router.post('/upload/public', upload.single('image'), async(req, res)=>{
    try {
        const savedImage = await Images.create({
            ...req.body,
            image_url: req.file.location,
        })
        if(savedImage){
            return res.status(200).send(savedImage)
        }
       return res.status(400).send(savedImage);

    } catch (error) {
        console.log(error)
    }   
});


module.exports = router;
