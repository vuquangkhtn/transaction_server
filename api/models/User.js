var mongoose = require('mongoose');  

var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String,
  amountWallet: {
  	type: Number,
    default: 1000
  },
  transactions: [
  	{
  		emailReceiver: String,
      amountTransaction: Number
  	}
  ]
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');