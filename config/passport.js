const passport = require("passport");
const { Strategy } = require("passport-local");

const User = require("../models/User");

passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return done(null,false,{message:"کاربری بااین ایمیل ثبت نشده"})
      }
      if (password===user.password) {
        return done(null,user)
      }
      else{
        return done (null,false,{
            message:"نام کاربری یارمز عبور صحیح نیست"
        })
      }
      
    } catch (error) {
        console.log(err)
    }
  })
);

passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user)
    })
})