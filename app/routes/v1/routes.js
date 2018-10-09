//GET User
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
      return res.status(200).send({
          success: true,
          message: "La API funciona correctamente.",
      });
});

module.exports = router;