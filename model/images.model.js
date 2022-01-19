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
        enum : ['public','private'],
        default: 'public',
    },
    likes: {
        type: Number,
        default:0
    },
   
}, schemaOptions);

mongoose.model('images', imageSchema);