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


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// app.get("/restaurants/:location_id",(req,res)=>{
//     var location_id = req.params.location_id;
//     console.log(location_id);
//     var response = [];
//     for (let i = 0; i < restaurants.length; i++) {
//         const resData = restaurants[i];
//         console.log(resData,"resData");
//         if (resData.location_id == location_id) {
//             response.push(resData)
//         }
//     }
//     res.send(response);
// });
// app.get("/restaurants",(req,res)=>{
//   res.send(restaurants)
// })
app.get("/locations",(req,res)=>{
    res.send(locationsdata);
});
app.get("/restaurants",(req,res)=>{
  res.send(restaurants);
});
app.get("/mealtypes",(req,res)=>{
    res.send(MealTypedata);
});
app.post("/filter",(req,res)=>{
  try {
    console.log(req.body)
    var response;
    if(Object.keys(req.body).indexOf("mealtype") == 0){
      function checkMealtype(item) {
        if(req.body.location){
          console.log("hi")
          return item.mealtype_id == req.body.mealtype && item.location_id == Number(req.body.location);
        } 
        else {
          console.log("bye")
          if(req.body.hcost && req.body.lcost){
            return item.mealtype_id == req.body.mealtype && item.min_price >= req.body.lcost && item.min_price <= req.body.hcost ;
          }
          if(req.body.cusisine ){
            return (req.body.cusisine).filter((cusisine)=>{
              return (item.cuisine).filter((rescus)=>{
               return (rescus.id) == (cusisine)
              })
            });
          }
          return item.mealtype_id == req.body.mealtype ;
        }

       
      }
      response = restaurants.filter(checkMealtype)
      if(req.body.sort == 1){
        response = response.sort((a, b) => parseFloat(a.min_price) - parseFloat(b.min_price))
      }
      else if(req.body.sort == -1){
        response = response.sort((a, b) => parseFloat(b.min_price) - parseFloat(a.min_price))
      }
    }else{
      response = {"status":false}
    }
    
    res.json(response);
  } catch (error) {
    console.log(error,"err")
  }

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
