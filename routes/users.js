const { Router } = require("express");
const userControlller=require("../controllers/userController")

const router = new Router();

//login page
//route get /dashboard
router.get("/login",userControlller.login)
//register page
//route get /dashboard
router.get("/register",userControlller.register);
//register handele
//route get /dashboard
router.post("/register",userControlller.createUser)
module.exports = router;
