const {Router}=require("express")
const router=new Router()
//weblog landig page
//route GET/
router.get('/',(req,res)=>{
    res.render("index",{pageTitle:"Weblog",path:"/"})
})
module.exports=router