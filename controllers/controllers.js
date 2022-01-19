const express = require('express');
const mongoose = require('mongoose');
const Images = mongoose.model('images');
const router = express.Router();



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


router.post('/upload',(req, res)=>{
    const images = new Images(req.body)
    console.log(req.body)
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
