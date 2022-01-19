const mongoose = require('mongoose');

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  };

  const imageSchema = new mongoose.Schema({
    title:{
        type: String,
        required: 'First name is required'
    },
    tags:{
        type: String,
        required: 'Last name is required'
    },
    image_url: {
        type: String,
        enum : ['public','private'],
        default: 'public',
    },
    type: {
        type: String,
        enum : ['public','private'],
        default: 'public',
    },
   
}, schemaOptions);

mongoose.model('images', imageSchema);