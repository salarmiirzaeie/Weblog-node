const User = require("../models/User");

exports.login = (req, res) => {
  res.render("login", { pageTitle: "Enter Dashboard", path: "/login" });
};
exports.register = (req, res) => {
  res.render("register", { pageTitle: "ثبت نام", path: "/register" });
};
exports.createUser = async (req, res) => {
  try {
    await User.userValidation(req.body);
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
