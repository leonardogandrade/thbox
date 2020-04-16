const express = require('express');
const routes = express.Router()
const multer = require('multer');
const DocumentsController = require('./controllers/Documents');
const ContentCategoriesController = require('./controllers/ContentCategoriesController');
const UserController = require('./controllers/UserController');
const uploadConfig = require('./config/upload');
const upload = multer(uploadConfig);

//routes.post('/doc',DocumentsController.store);
routes.get('/doc',DocumentsController.listAll);
routes.get('/doc/:title',DocumentsController.listByTitle);
routes.post('/doc/:id',DocumentsController.listByID);
routes.post('/doc',upload.fields([{ name: 'image', maxCount: 1 },{ name: 'video', maxCount: 1 }]),DocumentsController.store);
routes.delete('/doc/:id',DocumentsController.remove);
routes.put('/doc/:id',DocumentsController.updateByID);

//Routes Categories
routes.post('/cat/',ContentCategoriesController.store);
routes.delete('/cat',ContentCategoriesController.delete);
routes.get('/cat',ContentCategoriesController.listAll);
routes.get('/cat/:category',DocumentsController.listByCategory);

//User Routes
routes.post('/user',UserController.Create);

module.exports = routes;