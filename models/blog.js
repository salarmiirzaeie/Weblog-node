const mongoose=require("mongoose")
const {schema}=require("./secure/postValidation")
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        rquired:true,
        trim:true,
        minlenghth:5,
        maxlength:255
    },
    body:{
        type:String,
        required:true

    },
    status:{
        type:String,
        default:"public",
        enum:["private","public"],

    },
    thumbnail:{
        type:String,
        rquired:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
   
})
blogSchema.index({title:"text"})
blogSchema.static.postValidation=function(body){
    return schema.validate(body,{abortEarly:false})
}
module.exports=mongoose.model("Blog",blogSchema)