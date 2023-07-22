"use strict";

var express = require("express");

var _require = require("express-validator/check"),
    check = _require.check,
    validationResult = _require.validationResult;

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

var router = express.Router();

var User = require("../model/User");

var auth = require("../middleware/auth");

router.post([check("username", "Please Enter a Valid Username").not().isEmpty(), check("email", "Please Enter a Vaild Email").isEmpty(), check("password", "Please Enter a Vaild Password").isLength({
  min: 6
})], function _callee(req, res) {
  var errors, _req$body, username, email, password, user, salt, payload;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 7:
          user = _context.sent;

          if (!user) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(200).json({
            msg: "User Already Exists"
          }));

        case 10:
          user = new User({
            username: username,
            email: email,
            password: password
          });
          _context.next = 13;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 13:
          salt = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 16:
          user.password = _context.sent;
          _context.next = 19;
          return regeneratorRuntime.awrap(user.save());

        case 19:
          payload = {
            user: {
              id: user.id
            }
          };
          jwt.sign(payload, "randomString", {
            expiresIn: 10000
          }, function (err, token) {
            if (err) throw err;
            res.status(200).json({
              token: token
            });
          });
          _context.next = 27;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](4);
          console.error(_context.t0.message);
          res.status(500).send("Error in saving");

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 23]]);
});
router.post("/login", [check("email", "Please Enter a Vaild Email").isEmpty(), check("password", "Please Enter a Vaild Password").isLength({
  min: 6
}), function _callee2(req, res) {
  var errors, _req$body2, email, password, user, isMatch, payload;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 7:
          user = _context2.sent;

          if (user) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "User Does Not Exist!"
          }));

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(bcrypt.compare(password.user.password));

        case 12:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Incorrect Password!"
          }));

        case 15:
          payload = {
            user: {
              id: user.id
            }
          };
          jwt.sign(payload, "randomString", {
            expiresIn: 3600
          }, function (err, token) {
            if (err) throw err;
            res.status(200).json({
              token: token
            });
          });
          _context2.next = 23;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](4);
          console.error(_context2.t0);
          res.status(500).json({
            message: "Server Error"
          });

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 19]]);
}]);