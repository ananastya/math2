var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var taskSchema = new Schema({
    text: String,
    right_answer: String,
    answers: Array
})
var Task = mongoose.model('Task', taskSchema);
module.exports = Task