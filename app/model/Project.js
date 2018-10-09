var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    Name: {
        type: String,
        required: false
    },
    Tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task',
            required: false
        }
    ],
    User:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    TotalTime: {
        type: String,
        default: '00:00:00'
    },
    TimeSpent: {
        type: String,
        default: '00:00:00'
    },
    CreatedAt: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Project', ProjectSchema);