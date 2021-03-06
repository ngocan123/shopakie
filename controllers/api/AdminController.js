var express = require('express');
var bcrypt = require('bcryptjs');
var Admin = require("../../models/admin");
var adminController = {};
var router = express.Router();
adminController.list = function(req, res, next) {
  Admin.find(function(err, docs){
    res.json(docs);
  });
};
adminController.getAll = function(req, res, next) {
  Admin.find({}, { password: 0 }).then((err, users) => {
      if(err)
          res.send(err)
      else if(!users)
          res.send(404)
      else
          res.send(users)
      next()
  });
};
adminController.show = function(req, res) {
  var useId = req.params.id;
  Admin.find(useId, { password: 0 }).then((err, users) => {
      if(err)
          res.send(err)
      else if(!users)
          res.send(404)
      else
          res.send(users)
      next()
  });
};
adminController.create = function(req, res) {
  res.send('View tạo tài khoản');
};
//Add record
adminController.store = function(req, res) {
  Admin.findOne({'email': req.body.email}, function(err, user){
      var newPost = new Admin();
      if(req.body.password){
          var hashedPassword = bcrypt.hashSync(req.body.password, 8);	
          newPost.password = hashedPassword;				
      }
      newPost.name = req.body.name;
      newPost.email = req.body.email;
      newPost.save(function(err, newPost){
        if(err){
          res.send(err)
        }else{
          res.send(newPost)
        }
      });
  });
};
adminController.edit = function(req, res) {
  Admin.findOne({_id: req.params.id}).exec(function (err, results) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(results);
    }
  });
};

adminController.update = function(req, res) {
  
  var messenger = {};
  var data = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      zalo: req.body.zalo,
      website: req.body.website,
      facebook: req.body.facebook,
      gplus: req.body.gplus,
      address: req.body.address,
  }
  Admin.findOne({'email': req.body.email}, function(err, result){
      if(result && result._id!=req.params.id){
          res.send({"error":0});
      }else{
          Admin.findByIdAndUpdate(req.params.id, { $set: data}, { new: true }, function (err, results) {
              res.send(results);
          });
      }
  });
};

adminController.delete = function(req, res) {
  Admin.remove({_id: req.params.id}, function(err) {
    if(err) {
      res.send(err);
    }
    else {
      res.send({"status":1});
    }
  });
};
module.exports = adminController;