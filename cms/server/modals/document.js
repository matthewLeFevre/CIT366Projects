let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  id: {type: String, required: true},
  name: {type: String},
  description: {type: String},
  url: {type: String},
  children:[{type: Schema.Types.ObjectId, ref: 'Document'}],
});

module.exports = mongoose.model('Document', schema);