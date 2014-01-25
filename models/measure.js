var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var measureSchema = new Schema({
  psu:    { type: Number },
  watts:     { type: Number },
  timestamp: { type : Date, default: Date.now }  
});

module.exports = mongoose.model('Measure', measureSchema);