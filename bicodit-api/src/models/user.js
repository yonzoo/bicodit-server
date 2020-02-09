import mongoose from 'mongoose';
import validator from '../utils/helper';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Account'
    },
    name: String, default: "",
    about: String, default: ""
});

// userSchema.pre('save', true, function(next, done) {
//     var self = this
//     if (self.username.length > 0) {
//         const validateNameMsg = validator.username(self.username)
//         if (validateNameMsg) {
//             self.invalidate('name', validateNameMsg)
//             next(new Error(validateNameMsg))
//         }
//     }
//     if (self.about.length > 0) {
//         const validateAboutMsg = validator.about(self.about)
//         if (validateAboutMsg) {
//             self.invalidate('about', validateAboutMsg)
//             next(new Error(validateAboutMsg))
//         }
//     }
//     next()
// })

module.exports = mongoose.model('User', userSchema);