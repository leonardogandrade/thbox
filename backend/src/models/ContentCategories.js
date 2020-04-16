const mongoose = require('mongoose');

const ContentCategories = mongoose.Schema({
    category : String
},{
    timestamps : true
});

module.exports = mongoose.model('ContentCategories',ContentCategories);