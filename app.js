var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    mongoose = require('mongoose'),
    routes   = require('./routes/measures')(app);

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

app.get('/', function(req, res) {
    res.send("Hello world!");
});

app.get('/measures', findAllMeasures);
app.get('/measure/:id', findByPsuId);
app.post('/measure', addMeasure);
app.put('/measure/:id', updateMeasure);
app.delete('/measure/:id', deleteMeasure);

mongoose.connect('mongodb://localhost/measures', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

server.listen(8080, function() {
    console.log("Node server running on http://localhost:8080");
});