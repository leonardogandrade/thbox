const Documents = require('../models/Documents');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const fileSystem = require('../../fileSystem.json');

module.exports = {
    async store(req,res){
        const {author,date,title,info,place,abstract} = req.body;
        const {filename : image} = req.file;
        
        const [name,ext] = image.split('.');
        const filename = `${name}.${ext}`

        if(ext.match(/[jJ][pP][gG]/g)){
            await sharp(req.file.path)
            .resize(800)
            .jpeg({quality : 80})
            .toFile(
                path.resolve(fileSystem.uploads, 'resized', filename.toLowerCase().split(' ').join('_'))
            )
            
       }

        const upload = await Documents.create({
            author,
            date,
            title,
            info,
            place,
            image : filename.toLowerCase().split(' ').join('_'),
            abstract,
            destination : req.file.destination
        })

        if(ext.match(/[Jj][Pp][Gg]/g)){
            await fs.unlink(path.resolve(req.file.destination,filename),(err)=>{
                console.log(err);
            });
        }

        return res.json(upload);
    },

    async listAll(req,res){
        try{
            const {page} = req.query;
            const docs = await Documents.paginate({},{page, limit : 15 });
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

    async updateByID(req,res){
        const response = await Documents.findOneAndUpdate(req.params.id,req.body)
        return res.json(response);
    }

}