const { Router } = require("express");
const userControlller=require("../controllers/userController")
const { authenticated } = require("../middleware/auth");

const router = new Router();
//logout page
//route get /dashboard
router.get("/logout",authenticated,userControlller.logout)
//login page
//route get /dashboard
router.get("/login",userControlller.login)
//login handle
//route get /dashboard
router.post("/login",userControlller.handleLogin,userControlller.rememberme)
//register page
//route get /dashboard
router.get("/register",userControlller.register);
//register handele
//route get /dashboard
router.post("/register",userControlller.createUser)
module.exports = router;
