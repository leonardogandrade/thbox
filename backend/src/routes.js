const express = require('express');
const routes = express.Router()
const multer = require('multer');
const DocumentsController = require('./controllers/Documents');
const UserController = require('./controllers/UserController');
const uploadConfig = require('./config/upload');
const upload = multer(uploadConfig);

//routes.post('/doc',DocumentsController.store);
routes.get('/doc',DocumentsController.listAll);
routes.get('/doc/:title',DocumentsController.listByTitle);
routes.post('/doc/:id',DocumentsController.listByID);
routes.post('/doc',upload.single('image'),DocumentsController.store);
routes.delete('/doc/:id',DocumentsController.remove);
routes.put('/doc/:id',DocumentsController.updateByID);

//User Routes
routes.post('/user',UserController.Create);

module.exports = routes;