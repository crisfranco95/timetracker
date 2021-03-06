var express = require('express');
var router = express.Router();
var User = require('../../../model/User');
var jwt = require('jsonwebtoken');
var app = express();
require('dotenv').config();

app.set('secret', process.env.JWT_SECRET);

//IMPROVE
router.post('/authenticate', function (req, res) {

  User.findOne({
    Username: req.body.Username
  }, function (err, user) {
    if (err)
      throw err;

    if (!user) {
      res.status(403).send({
        success: false,
        message: 'Email or password wrong.'
      });
    } else if (user) {

      user.comparePassword(req.body.Password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          var token = jwt.sign({
            _id: user._id,
            Username: user.Username,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            ContactNumber: user.ContactNumber
          }, 
            app.get('secret'));
          res.status(200).send({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });

        } else {
          res.status(401).send({
            success: false,
            message: 'Email or password wrong.'
          });
        }
      });

    }
  });
});

router.post('/register', function (req, res) {

  var user = new User({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    Username: req.body.Username,
    Password: req.body.Password,
    ContactNumber: req.body.ContactNumber
  });

  user.addUser(function (err, created) {
    if (err) {
      res.status(500).send({
        success: false,
        message: err
      });
    } else {

      res.status(200).send({
        success: created,
        message: "Usuario creado"
      });
    }
  });

});


module.exports = router;
