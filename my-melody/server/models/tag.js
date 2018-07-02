const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let tagSchema = new Schema({
    tag: {type: String, required: true, unique: true},
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
}, {versionKey: false});


module.exports = mongoose.model('Tag', tagSchema);
