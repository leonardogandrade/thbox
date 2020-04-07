const express = require('express');
const routes = express.Router();
const Login = require('../controllers/LoginController');

routes.post('/signin',Login.signIn);
//routes.delete('/delete',AssetController.deleteAllAssets);

module.exports = routes;