const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const DocumentsSchema = mongoose.Schema({
    author : String,
    title : String,
    date : String,
    place : String,
    info : String,
    image : String,
    abstract : String,
    destination : String,
},{
    timestamps : true,
});

DocumentsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Documents', DocumentsSchema);