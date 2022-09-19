const { Router } = require("express");
const {authenticated}=require("../middleware/auth")
const router = new Router();
const adminController=require("../controllers/adminController")
router.get("/",authenticated,adminController.getDashboard);
router.get("/add-post",authenticated,adminController.getAddpost);
router.get("/edit-posts/:id",authenticated,adminController.getEditpost);
router.post("/edit-post/:id",authenticated,adminController.editPost);
router.get("/delete-post/:id",authenticated,adminController.deletePost);

router.post("/add-post",authenticated,adminController.createPost);
router.post("/image-upload",authenticated,adminController.uploadImage);


module.exports = router;
