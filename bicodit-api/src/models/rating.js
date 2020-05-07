import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    userId: String,
    userLogin: String,
    userAvatar: String,
    text: String,
    value: Number,
    createdTime: Date
});

module.exports = mongoose.model('Rating', ratingSchema);