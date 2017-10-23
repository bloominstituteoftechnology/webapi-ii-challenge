const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  constents: String,
});

module.exports = mongoose.model('Post', PostSchema);
