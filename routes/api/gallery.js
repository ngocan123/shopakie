var express = require('express');
var app = express();
var router = express.Router();
const galleryController = require('../../controllers/api/GalleryController');
const verifyToken = require('../../Middlewares/JwtAuthMiddleware');
router.get('/getAll', galleryController.getAll);
router.get('/show/:id', galleryController.show);
router.post('/store', galleryController.store);
module.exports = router;