var assert = require('chai').assert;
var superagent = require('superagent');
require('dotenv').config()

describe('API tests', function () {

    it('should return an user token', function (done) {

        superagent.post(process.env.HOST_FOR_TESTS +'/api/v1/auth/authenticate')
            .send({
                Username: 'random_user',
                Password: 'abc123$'
            })
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                if (err)  throw new Error (err);
                
                assert.equal(res.body.message, "Enjoy your token!");
                done();
            })
    });


    it('should create a task', function (done) {

        superagent.post(process.env.HOST_FOR_TESTS + '/api/v1/task')
        .send(
            {
                "Name" : "Test Task",
                "Duration" : "12:20:12"
            }
        )    
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmJhYWExODYyYWQ1NjAyOWZiODFjYTIiLCJVc2VybmFtZSI6ImNmcmFuY285NSIsIkZpcnN0TmFtZSI6IkNyaXN0aWFuIiwiTGFzdE5hbWUiOiJGcmFuY28iLCJFbWFpbCI6ImNyaXN0aWFuanVuaW9yMjJAaG90bWFpbC5jb20iLCJpYXQiOjE1Mzg5NTk5MTV9.Hl48nnaHFimJLfopPiCyOlifdlzTG7d-U80U6suI8lw')
            .end((err, res) => {
                if (err)  throw new Error (err);
                assert.equal(res.status, 200)
                done();
            })
    });
    

    it('should return a list of task per user', function (done) {

        superagent.get(process.env.HOST_FOR_TESTS +'/api/v1/task/user')
            .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmJhYWExODYyYWQ1NjAyOWZiODFjYTIiLCJVc2VybmFtZSI6ImNmcmFuY285NSIsIkZpcnN0TmFtZSI6IkNyaXN0aWFuIiwiTGFzdE5hbWUiOiJGcmFuY28iLCJFbWFpbCI6ImNyaXN0aWFuanVuaW9yMjJAaG90bWFpbC5jb20iLCJpYXQiOjE1Mzg5NTk5MTV9.Hl48nnaHFimJLfopPiCyOlifdlzTG7d-U80U6suI8lw')
            .end((err, res) => {
                if (err)  throw new Error (err);
                
                assert.equal(res.body.success, true);
                assert.equal(typeof(res.body.message), "object");
                done();
            })
    });

    it('should start a task', function (done) {

        superagent.put(process.env.HOST_FOR_TESTS + '/api/v1/task/start/5bbaaa4362ad56029fb81ca3')
            .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmJhYWExODYyYWQ1NjAyOWZiODFjYTIiLCJVc2VybmFtZSI6ImNmcmFuY285NSIsIkZpcnN0TmFtZSI6IkNyaXN0aWFuIiwiTGFzdE5hbWUiOiJGcmFuY28iLCJFbWFpbCI6ImNyaXN0aWFuanVuaW9yMjJAaG90bWFpbC5jb20iLCJpYXQiOjE1Mzg5NTk5MTV9.Hl48nnaHFimJLfopPiCyOlifdlzTG7d-U80U6suI8lw')
            .end((err, res) => {
                if (err)  throw new Error (err);
                assert.equal(res.status, 200)
                done();
            })
    });
    
    it('should restart a task', function (done) {

        superagent.put(process.env.HOST_FOR_TESTS + '/api/v1/task/restart/5bbaaa4362ad56029fb81ca3')
            .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmJhYWExODYyYWQ1NjAyOWZiODFjYTIiLCJVc2VybmFtZSI6ImNmcmFuY285NSIsIkZpcnN0TmFtZSI6IkNyaXN0aWFuIiwiTGFzdE5hbWUiOiJGcmFuY28iLCJFbWFpbCI6ImNyaXN0aWFuanVuaW9yMjJAaG90bWFpbC5jb20iLCJpYXQiOjE1Mzg5NTk5MTV9.Hl48nnaHFimJLfopPiCyOlifdlzTG7d-U80U6suI8lw')
            .end((err, res) => {
                if (err)  throw new Error (err);
                assert.equal(res.status, 200)
                done();
            })
    });
    
    it('should pause a task', function (done) {

        superagent.put(process.env.HOST_FOR_TESTS + '/api/v1/task/pause/5bbaaa4362ad56029fb81ca3')
            .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmJhYWExODYyYWQ1NjAyOWZiODFjYTIiLCJVc2VybmFtZSI6ImNmcmFuY285NSIsIkZpcnN0TmFtZSI6IkNyaXN0aWFuIiwiTGFzdE5hbWUiOiJGcmFuY28iLCJFbWFpbCI6ImNyaXN0aWFuanVuaW9yMjJAaG90bWFpbC5jb20iLCJpYXQiOjE1Mzg5NTk5MTV9.Hl48nnaHFimJLfopPiCyOlifdlzTG7d-U80U6suI8lw')
            .end((err, res) => {
                if (err)  throw new Error (err);
                assert.equal(res.status, 200)
                done();
            })
    });

    
    // it('should create a project', function (done) {

    //     superagent.post(process.env.HOST_FOR_TESTS + '/api/v1/task')
    //     .send(
    //         {
    //             "Name" : "New Project",
    //             "Tasks" : ["5bbaaf4f0c5a3f02d08b7c2a", "5bbaaf510c5a3f02d08b7c2b" ]
    //         }
    //     )    
    //     .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmJhYWExODYyYWQ1NjAyOWZiODFjYTIiLCJVc2VybmFtZSI6ImNmcmFuY285NSIsIkZpcnN0TmFtZSI6IkNyaXN0aWFuIiwiTGFzdE5hbWUiOiJGcmFuY28iLCJFbWFpbCI6ImNyaXN0aWFuanVuaW9yMjJAaG90bWFpbC5jb20iLCJpYXQiOjE1Mzg5NTk5MTV9.Hl48nnaHFimJLfopPiCyOlifdlzTG7d-U80U6suI8lw')
    //         .end((err, res) => {
    //             if (err)  throw new Error (err);
    //             assert.equal(res.status, 200)
    //             done();
    //         })
    // });

   
    it('should return a list of projects per user', function (done) {

        superagent.get(process.env.HOST_FOR_TESTS + '/api/v1/project/user')
            .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmJhYWExODYyYWQ1NjAyOWZiODFjYTIiLCJVc2VybmFtZSI6ImNmcmFuY285NSIsIkZpcnN0TmFtZSI6IkNyaXN0aWFuIiwiTGFzdE5hbWUiOiJGcmFuY28iLCJFbWFpbCI6ImNyaXN0aWFuanVuaW9yMjJAaG90bWFpbC5jb20iLCJpYXQiOjE1Mzg5NTk5MTV9.Hl48nnaHFimJLfopPiCyOlifdlzTG7d-U80U6suI8lw')
            .end((err, res) => {
                if (err)  throw new Error (err);
                
                assert.equal(res.status, 200);
                assert.notEqual(res.body.success, false);
                assert.equal(typeof(res.body.message), "object");
                done();
            })
    });


    // it('should update a task and start the next one', function (done) {

    //     superagent.patch(process.env.HOST_FOR_TESTS + '/api/v1/task/continue/5bbaaf510c5a3f02d08b7c2b')
    //         .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmJhYWExODYyYWQ1NjAyOWZiODFjYTIiLCJVc2VybmFtZSI6ImNmcmFuY285NSIsIkZpcnN0TmFtZSI6IkNyaXN0aWFuIiwiTGFzdE5hbWUiOiJGcmFuY28iLCJFbWFpbCI6ImNyaXN0aWFuanVuaW9yMjJAaG90bWFpbC5jb20iLCJpYXQiOjE1Mzg5NTk5MTV9.Hl48nnaHFimJLfopPiCyOlifdlzTG7d-U80U6suI8lw')
    //         .send({

    //         })
    //         .end((err, res) => {
    //             if (err)  throw new Error (err);
                
    //             assert.equal(res.status, 200);
    //             assert.equal(res.body.message, 'Task updated.');
    //             assert.notEqual(res.body.success, false);
    //             done();
    //         })
    // });

});