var express = require('express');
var router = express.Router();
var Product = require('../models/product');
/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, docs){
    console.log(docs[0].name);
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i+chunkSize));
    }
    res.render('frontend/index', { title: 'Trang chu' , products:productChunks});
  });
});
module.exports = router;