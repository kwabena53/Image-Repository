const express = require('express');
const mongoose = require('mongoose');
const Images = mongoose.model('images');
const router = express.Router();
const upload = require("../s3");
const auth = require("../middleware/auth");




router.get('/user/images', auth, async (req, res) => {
    try {
        //for any filter eg. public, private
        let queryImages = {}
        if (req.query) {
            queryImages = req.query
        }
        //auth user images
        const user_id = req.user.user_id
        queryImages["userId"] = user_id

        const images = await Images.find(queryImages)
        if (images) {
            return res.status(200).json(images)
        }
        return res.status(400).send("Invalid request")

    } catch (error) {
        console.log(error)
    }
});

router.get('/images', async (req, res) => {
    try {
        const images = await Images.find({ type: "PUBLIC" })
        if (images) {
            return res.status(200).json(images)
        }
        return res.status(400).send("Invalid request")

    } catch (error) {
        console.log(error)
    }
});

router.post('/image/like', auth, async (req, res) => {

    try {
        const likedImage = await Images.findOne({ id: req.body.imageId })
        if (likedImage) {
            const likers = likedImage.likedUsers
            const user_id = req.user.user_id
            let updateFields = {}

            //allow only one increase for a like
            if (req.body.isLiked && !likers[user_id]) {
                    updateFields = {
                        $inc: { likes: 1 },
                        likedUsers: {
                            ...likers,
                            [user_id]: true
                        }
                }
                
            } else if(!req.body.isLiked && likers[user_id]) {
                    updateFields = {
                        $inc: { likes: -1 },
                        likedUsers: {
                            ...likers,
                            [user_id]: false
                        }
                    }
            }

            const saveUpdate = await Images.findOneAndUpdate({ id: req.body.imageId }, updateFields, { new: true })
            if (saveUpdate) {
                return res.status(200).send(saveUpdate)
            }

        }
        return res.status(400).send(likedImage);
    } catch (error) {
        console.log(error)
    }

})

router.post('/user/upload', auth, upload.single('image'), async (req, res) => {
    try {
        const savedImage = await Images.create({
            ...req.body,
            image_url: req.file.location,
            userId: req.user.user_id
        })
        if (savedImage) {
            return res.status(200).send(savedImage)
        }
        return res.status(400).send(savedImage);

    } catch (error) {
        console.log(error)
    }
});

router.post('/upload/public', upload.single('image'), async (req, res) => {
    try {
        const savedImage = await Images.create({
            ...req.body,
            image_url: req.file.location,
        })
        if (savedImage) {
            return res.status(200).send(savedImage)
        }
        return res.status(400).send(savedImage);

    } catch (error) {
        console.log(error)
    }
});


module.exports = router;
