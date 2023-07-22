var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {restaurants,message} = require("./json/restaurants.json");
const locationsdata = require("./json/locations.json");
const MealTypedata = require("./json/MealTypes.json");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const port = 8900;
var app = express();
var db = require("./model/db")
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const mongoSanitize = require("express-mongo-sanitize")
app.use(mongoSanitize())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get("/restaurants",(req,res)=>{
    res.send(restaurants);
});

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get("/restaurants/:location_id",(req,res)=>{
    var location_id = req.params.location_id;
    console.log(location_id);
    var response = [];
    for (let i = 0; i < restaurants.length; i++) {
        const resData = restaurants[i];
        console.log(resData,"resData");
        if (resData.location_id == location_id) {
            response.push(resData)
        }
    }
    res.send(response);
});
app.get("/restaurants",(req,res)=>{
  res.send(restaurants)
})
app.get("/locations",(req,res)=>{
    res.send(locationsdata);
});

app.get("/mealtypes",(req,res)=>{
    res.send(MealTypedata);
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(port,()=>{
  console.log(`server listing on ${port}!`);
});
module.exports = app;
