const { Router } = require("express");
const {authenticated}=require("../middleware/auth")
const router = new Router();

router.get("/",authenticated, (req, res) => {
  res.render("dashboard", {
    pageTitle: "dashboard",
    path: "/dashboard",
    layout: "./layouts/dashLayout",
    name:req.user.name
  });
});


module.exports = router;
