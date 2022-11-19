const mongoose = require('mongoose');

// Defines post model to respect
const postSchema = mongoose.Schema({
    authorId: { type: String, required: true },
    authorFirstname: { type: String, required: true },
    authorLastname: { type: String, required: true },
    authorRole: { tyle: Number, default: 0 },
    authorAvatarUrl: { type: String, default: "" },
    textContent: { type: String, default: "" },
    imageContentUrl: { type: String, default: "" },
    creation_date: { type: String, required: true },
    update_date: { type: String, default: "" }, 
    likesCount: { type: Number, default: 0 },
    likersId: { type: [String], default: [] },
});

module.exports = mongoose.model('Post', postSchema);