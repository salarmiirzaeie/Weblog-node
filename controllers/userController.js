const passport = require("passport");

const User = require("../models/User");

exports.login = (req, res) => {
  res.render("login", { pageTitle: "Enter Dashboard", path: "/login" });
};

exports.handleLogin = (req, res, next) => {
  passport.authenticate("local", {
    // successRedirect:"/dashboard",
    failureRedirect: "/users/login",
  })(req, res, next);
};
exports.rememberme = (req, res) => {
  if (req.body.rememberme) {
    req.session.cookie.originalMaxAge = 1000 * 60 * 60 * 24;
  } else {
    req.session.cookie.expire = null;
  }
  res.redirect("/dashboard");
};
exports.logout = (req, res) => {
  req.logout((q) => {
    
    res.redirect("/users/login");
  });
};
exports.register = (req, res) => {
  res.render("register", { pageTitle: "ثبت نام", path: "/register" });
};
exports.createUser = async (req, res) => {
  try {
    await User.userValidation(req.body);
    await User.create(req.body);
    res.redirect("/users/login");
  } catch (error) {
    console.log(error);
    const errors = [];
    error.inner.forEach((element) => {
      errors.push({
        name: element.path,
        message: element.message,
      });
    });
    return res.render("register", {
      pageTitle: "ثبت نام",
      path: "/register",
      errors,
    });
  }
};
