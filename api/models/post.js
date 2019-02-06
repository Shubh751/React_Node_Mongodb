const mongoose=require('mongoose');

const postSchema = mongoose.Schema(
{
    _id:mongoose.Schema.Types.ObjectId,
    title:String,
    tags:String,
    comments:[String]
});

module.exports = mongoose.model('Post',postSchema);