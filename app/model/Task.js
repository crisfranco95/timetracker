var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    Name: {
        type: String,
        required: false
    },
    Started: {
        type: Boolean,
        required: false,
        default: false
    },
    StartedAt: {
        type: Date,
        required: false,
    },
    IsDone: {
        type: Boolean,
        required: false,
        default: false
    },
    IsPaused: {
        type: Boolean,
        required: false,
        default: false
    },
    NextTask:{
        type: String,
        required: false,
        default: null
    },
    Duration: {
        type: String,
        required: true
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    CreatedAt: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Task', TaskSchema);