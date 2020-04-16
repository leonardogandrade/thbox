const Documents = require('../models/Documents');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const fileSystem = require('../../fileSystem.json');

module.exports = {
    async store(req,res){
        const {author,date,title,info,place,abstract,category} = req.body;
        const {image,video} = req.files;
        console.log(video[0]);
        const [Iname,Iext] = image[0].filename.split('.');
        const fileImage = `${Iname}.${Iext}`;

        const [Vname,Vext] = video[0].filename.split('.');
        const fileVideo = `${Vname}.${Vext}`;

        if(Iext.match(/[jJ][pP][gG]/g) || Iext.match(/[pP][nN][gG]/g)){
            await sharp(image[0].path)
            .resize(355,200)
            .jpeg({quality : 80})
            .toFile(
                path.resolve(fileSystem.uploads, 'resized', fileImage.toLowerCase().split(' ').join('_'))
            )        
       }

        const upload = await Documents.create({
            author,
            date,
            title,
            info,
            place,
            category,
            video : fileVideo.toLowerCase().split(' ').join('_'),
            videoDestination : video[0].destination,
            image : fileImage.toLowerCase().split(' ').join('_'),
            imageDestination : image[0].destination + '/resized',
            abstract,
        })

        if(Iext.match(/[jJ][pP][gG]/g) || Iext.match(/[pP][nN][gG]/g)){
            await fs.unlink(path.resolve(image[0].destination,fileImage),(err)=>{
                console.log(err);
            });
        }

        return res.json(upload);
    },

    async listAll(req,res){
        try{
            //const {page} = req.query;
            const docs = await Documents.find(); //paginate({},{page, limit : 15 });
            return res.json(docs)
        }catch(err){
            console.log(`error while executing listAll method - ${err}`)
        }
    },

    async remove(req,res){
        const response = await Documents.findOneAndDelete(req.params.id);
        const filename = response.image;
        const [,ext] = filename.split('.');

        if(ext.match(/[Jj][Pp][Gg]/g)){
            await fs.unlink(path.resolve(fileSystem.uploads,'resized',filename),err=>{
                console.log(err);
            })
        }else{
            await fs.unlink(path.resolve(response.destination,filename),err=>{
                console.log(err);
            })
        }
        return res.json(response);
        
    },

    async listByID(req,res){        
        const response = await Documents.findById(req.params.id);
        return res.json(response);
    },

    async listByTitle(req,res){
        const response = await Documents.find({"title" : {$regex: '.*' + req.params.title + '.*', $options: "i" }});
        console.log(response);
        return res.json(response);
    },

    async listByCategory(req,res){
        const response = await Documents.find({"category" : {$regex: '.*' + req.params.category + '.*', $options: "i" }});
        console.log(response);
        return res.json(response);
    },

    async updateByID(req,res){
        const response = await Documents.findOneAndUpdate(req.params.id,req.body)
        return res.json(response);
    }

}