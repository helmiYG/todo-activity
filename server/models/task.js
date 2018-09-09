var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  task:  {type: String, required : true},
  description : String,
  d_day: {type: Date, required : true},
  reminder: {type : Date},
  status: {type:Boolean, default: false},
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

let Task = mongoose.model('Task',taskSchema)
module.exports = Task