var express = require('express');
var router = express.Router();
var Project = require('../../../model/Project');
var Task = require('../../../model/Task');
var app = express();
var jwt = require('jsonwebtoken');

require('dotenv').config()

app.set('secret', process.env.JWT_SECRET);




// route middleware that will happen on every request
router.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret
        jwt.verify(token, app.get('secret'), function (err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;

                next();

            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

});


//GET ALL PROJECTS
router.get('', function(req, res){

    Project.find()
    .populate("Tasks")
    .exec(function(err, projects){
        if(err){
            res.status(500).send({
                success: false,
                message: err
            })
        } else {

            res.status(200).send({
                success: true,
                message: projects
            })
        }
    })
});

router.post('', function (req, res) {

    var project = new Project({
        User: req.decoded._id,
        Name: req.body.Name,
        Tasks: req.body.Tasks,
    });

    project.save(err => {

        if (err) {
            res.status(500).send({
                success: false,
                message: err.message
            });
        }

        res.status(200).send({
            success: true,
            message: "Project created."
        });
    });
});


//GET USER'S PROJECTS
router.get('/user', function (req, res) {

    Project.find({
            User: req.decoded._id
        })
        .populate("Tasks")
        .exec(function (err, projects) {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: err
                })
            } else {


                res.status(200).send({
                    success: true,
                    message: projects
                })
            }
        })
});


router.put('/:id', function (req, res) {

    var projectId = req.params.id;
    
    var project = {
        TotalTime: req.body.TotalTime,
    };

    Project.findByIdAndUpdate(projectId,
        project,
         {
        new: false

    }, (err, doc) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            })
        } else if(doc){

            res.status(200).send({
                success: true,
                message: "Updated."
            })
        } else {
            res.status(404).send({
                success: true,
                message: "Project not found."
            })
        }
    })



});

//DELETE PROJECT BY ID
router.delete('/:id', function (req, res) {
    var projectId = req.params.id;

    Project.findByIdAndRemove(projectId, (err, project) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            })
        } else {
            res.status(200).send({
                success: true,
                message: "Project deleted."
            })
        }
    })
});

module.exports = router;
