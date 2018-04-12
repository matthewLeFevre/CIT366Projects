let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  maxDocumentId: {type: String, required: true},
  maxContactId: {type: String, required: true},
  maxMessageId: {type: String, required: true},
});

module.exports = mongoose.model('Sequence', schema);