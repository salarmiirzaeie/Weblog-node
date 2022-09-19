
const Blog=require("../models/blog")
const {formDate}=require("../utils/jalali")
const { get500, get404 } = require("./errorController");

exports.getIndex=async(req,res)=>{
    try {
        const posts=await Blog.find({status:"public"}).sort({
            createdAt:"desc"
        })
        res.render("index",{
            pageTitle:"وبلاگ",
            path:"/",
            posts,
            formDate

        })
        
    } catch (error) {
        console.log(err)
        get500()

    }
}