const mongoose = require('mongoose');

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  };

  const imageSchema = new mongoose.Schema({
    title:{
        type: String,
        required: 'title is required'
    },
    tags:{
        type: String,
    },
    image_url: {
        type: String,
        required: 'image is required'
    },
    type: {
        type: String,
        enum : ['PUBLIC','PRIVATE'],
        default: 'PUBLIC',
    },
    likes: {
        type: Number,
        default:0
    },
    userId: {
        type: mongoose.ObjectId,
    },
    likedUsers:{
        type: Object,
    }
   
}, schemaOptions);

mongoose.model('images', imageSchema);