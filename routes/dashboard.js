const { Router } = require("express");
const router = new Router();

router.get("/", (req, res) => {
  res.render("dashboard", {
    pageTitle: "dashboard",
    path: "/dashboard",
    layout: "./layouts/dashLayout",
  });
});


module.exports = router;
