const mongoose = require("mongoose");

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: 'Full name is required'
    },
 
    email: {
        type: String,
        unique: true,
        required: 'Email is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    token: {
        type: String
    },
}, schemaOptions);


userSchema.path('email').validate((val) => { 
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(val);
}, 'invalid email') ;

mongoose.model("users", userSchema);