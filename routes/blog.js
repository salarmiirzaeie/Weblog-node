const {Router}=require("express")
const blogController=require("../controllers/blogController")
const router=new Router()
//weblog landig page
//route GET/
router.get('/',blogController.getIndex)
router.get('/post/:id',blogController.getSinglePost)
router.post('/search',blogController.handlesearch)
module.exports=router