var express = require('express');
var router = express.Router();
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

        // verifies secret key
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

router.post('', function (req, res) {

    var task = new Task({
        User: req.decoded._id,
        Name: req.body.Name,
        Duration: req.body.Duration,
        NextTask: req.body.NextTask
    });

    task.save(err => {

        if (err) {
            res.status(500).send({
                success: false,
                message: err
            });
        }

        res.status(200).send({
            success: true,
            message: "Task created."
        });
    });
});

//START, RESTART OR PAUSE TASKS
router.put('/:action/:id', function (req, res) {
    var taskId = req.params.id;
    var action = req.params.action;

    var StartedAt = undefined;
    var Started = false;
    var IsPaused = false;

    switch (action) {
        case 'start':
            IsPaused = false;
            Started = true;
            StartedAt = Date.now();
            break;
        case 'restart':
            IsPaused = false;
            Started = true;
            StartedAt = Date.now();
            break;
        case 'pause':
            Started = true;
            IsPaused = true;
            break;
        default:
            res.status(500).send({
                success: false,
                message: "Invalid action."
            })
            break;

    }
    var task = {
        StartedAt: StartedAt,
        IsPaused: IsPaused,
        Started: Started
    };

    Task.findByIdAndUpdate(taskId,
        task, {
            new: false
        }, (err, doc) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: err
                })
            } else {
                res.status(200).send({
                    success: true,
                    message: "Updated"
                })
            }
        })
});

router.patch('/continue/:id', function (req, res) {
    var taskId = req.params.id;

    Task.findOne({
            _id: taskId
        })
        .exec(function (err, task) {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: err
                })
            } else {
                if(!task.NextTask){
                    res.status(500).send({
                        success: false,
                        message: "No task to continue."
                    })
                }

                Task.findByIdAndUpdate(task.NextTask, {
                    StartedAt: Date.now(),
                    Started: true
                }, {
                    new: false

                }, (err, doc) => {
                    if (err) {
                        res.status(500).send({
                            success: false,
                            message: err
                        })
                    } else {
                        res.status(200).send({
                            success: true,
                            message: "Task updated."
                        })
                    }
                })


            }
        })

});

//Add next task
router.put('/:id', function (req, res) {
    var taskId = req.params.id;

    var task = {
        NextTask: req.body.NextTask
    };

    Task.findByIdAndUpdate(taskId,
        task, {
            new: false

        }, (err, doc) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: err
                })
            } else {
                res.status(200).send({
                    success: true,
                    message: "Task updated."
                })
            }
        })
});




router.delete('/:id', function (req, res) {
    var taskId = req.params.id;

    Task.findByIdAndRemove(taskId, (err, task) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            })
        } else {
            res.status(200).send({
                success: true,
                message: task._id
            })
        }
    })
});



router.get('/user', function (req, res) {

    Task.find({
            User: req.decoded._id
        })
        .sort({
            CreatedAt: -1
        })
        .exec(function (err, task) {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: err
                })
            } else {
                res.status(200).send({
                    success: true,
                    message: task
                })
            }
        })
});



module.exports = router;