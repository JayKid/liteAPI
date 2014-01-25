module.exports = function(app) {

  var Measure = require('../models/measure.js');

  function getThresholdDate()
  {
    var offset = 300000; // 5 minutes
    return new Date(new Date().getTime()-offset);
  }

  findAllMeasures = function(req, res) {
    Measure.find(function(err, measures) {
        if(!err) {
            res.send(measures);
        } else {
            console.log('ERROR: ' + err);
        }
    });
  };

  findByPsuId = function(req, res) {
    var date_threshold = getThresholdDate();

    Measure.find({ psu: req.params.id, timestamp: {$gt: date_threshold} }, function(err, measures) {
      if(!err) {
        res.send(measures);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

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