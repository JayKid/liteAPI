//File: routes/measures.js
module.exports = function(app) {

  var Measure = require('../models/measure.js');

  //GET - Return all tvshows in the DB
  findAllMeasures = function(req, res) {
    Measure.find(function(err, measures) {
        if(!err) {
            res.send(measures);
        } else {
            console.log('ERROR: ' + err);
        }
    });
  };

  //GET - Return a Measure with specified ID
  findByPsuId = function(req, res) {
    // Measure.findById(req.param.id, function(err, measure) {
    Measure.find({ psu: req.params.id }, function(err, measures) {
      if(!err) {
        res.send(measures);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //POST - Insert a new Measure in the DB
  addMeasure = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var measure = new Measure({
      psu:       req.body.psu,
      watts:     req.body.watts, 
    });

    measure.save(function(err) {
      if(!err) {
        console.log('Created');
      } else {
        console.log('ERROR: ' + err);
      }
    });

    res.send(measure);
  };

  //PUT - Update a register already exists
  updateMeasure = function(req, res) {
    Measure.findById(req.params.id, function(err, measure) {
      measure.psu      = req.body.psu;
      measure.watts    = req.body.watts;

      measure.save(function(err) {
        if(!err) {
          console.log('Updated');
        } else {
          console.log('ERROR: ' + err);
        }
        res.send(measure);
      });
    });
  }

  //DELETE - Delete a Measure with specified ID
  deleteMeasure = function(req, res) {
    Measure.findById(req.params.id, function(err, measure) {
      measure.remove(function(err) {
        if(!err) {
          console.log('Removed');
        } else {
          console.log('ERROR: ' + err);
        }
      })
    });
  }

}