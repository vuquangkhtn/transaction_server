var mongoose = require("mongoose");

// mongoose.connect('mongodb://1412430:1234567890@ds119306.mlab.com:19306/btcn04');

mongoose.connect(process.env.MONGOLAB_URI, options, function(error) {
  // Check error in initial connection. There is no 2nd param to the callback.
  console.log(error);
});