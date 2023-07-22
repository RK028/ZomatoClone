var mongoose = require('mongoose');


function connection(){
    mongoose.connect('mongodb://127.0.0.1:27017/Zomato',
    {useNewUrlParser:true, useUnifiedTopology:true , KeepAlive:true, keepAliveInitialDelay:30000})
    .then(()=> console.log('connection succesful'))
    .catch((err)=> console.log("Monogo connection err", err));
}
connection()
mongoose.connection.on('connected',function(){});
mongoose.connection.on('error',function(err){
    console.log('Moogoose default connection error:'+ err);
    connection()
});
mongoose.connection.on('disconnected', function(){
    console.log('mongoes default connection disconnected');
    connection()
});