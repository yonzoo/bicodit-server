import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Account'
    },
    avatar: String, default: "rabbodefault",
    name: String, default: "",
    about: String, default: ""
});

module.exports = mongoose.model('User', userSchema);