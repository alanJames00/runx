// schema definitions for runtimes
const mongoose = require('mongoose');

const runtimeSchema = mongoose.Schema({
  runtime: String,
  alias: String,
  version: String,
})


const runtimes = mongoose.model('runx-runtimes', runtimeSchema);

module.exports = runtimes;
