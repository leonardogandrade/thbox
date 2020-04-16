const ContentCategories = require('../models/ContentCategories');

module.exports = {
    async store(req,res){
        const payload = await req.body;
        await ContentCategories.create(payload);
        res.json(payload);
    },
    async delete(req,res){
        const payload = await req.body.category;
        ContentCategories.findOneAndRemove(payload);
        res.json(payload);
    },
    async listAll(req,res){
        const response = await ContentCategories.find();
        res.json(response);
    }
}