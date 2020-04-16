const multer = require('multer');
const path = require('path');

module.exports = {
    storage : multer.diskStorage({
        destination : path.resolve(__dirname,'..','..','uploads'),
        filename : function(req,file,cb){
            const [name,ext] = file.originalname.split('.')
            cb(null,name + '_' + Date.now() + '.' + ext);
        },
        video : function(req,file,cb){
            const [name,ext] = file.originalname.split('.')
            cb(null,name + '_' + Date.now() + '.' + ext);
        }
    })
}