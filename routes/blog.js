const {Router}=require("express")
const blogController=require("../controllers/blogController")
const router=new Router()
//weblog landig page
//route GET/
router.get('/',blogController.getIndex)
module.exports=router