var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

/* GET users listing. */
router.get('/users', function(req, res) {
  let search_query = {};
  ['name', 'email', 'phone'].forEach((key) => {
    if(req.query[key])
      search_query[key] = new RegExp(req.query[key]);
  });
  ['gender', 'role'].forEach((key) => {
    if(req.query[key])
      search_query[key] = req.query[key];
  })
  User.find(search_query).sort({registered: -1}).exec(function(err, users) {
    if(err) {
      return res.status(400).send("err in get /users");
    } else {
      return res.status(200).json(users);
    }
  });
});

router.post('/user', function(req, res) {
  User.create(req.body, function(err, user) {
    if (err) {
      return res.status(400).send("err in post /user");
    } else {
      return res.status(200).json(user);
    }
  })
});

router.put('/user/:_id', function(req, res) {
  User.findByIdAndUpdate(req.params._id, req.body, function (err, user) {
    if (err) {
      return res.status(400).send("err in put /user/:_id");
    } else {
      return res.status(200).json(user);
    }
  });
})

router.delete('/user/:_id', function(req, res) {
  User.findByIdAndRemove(req.params._id, function(err, user) {
    if (err) {
      return res.status(400).send("err in delete /user/:_id");
    } else {
      return res.status(200).json(user);
    }
  });
});

module.exports = router;
