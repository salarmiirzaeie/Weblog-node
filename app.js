const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fileupload=require("express-fileupload")
const dotEnv = require("dotenv");
const app = express();
const expressLayout = require("express-ejs-layouts");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");
const debug=require("debug")("weblog")
const bodyParser=require("body-parser")
//load config
dotEnv.config({ path: "./config/config.env" });
//databse connection
connectDB();
debug("connected to database")
//Password Configuratiin
require("./config/passport");

//logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//View Engine
app.use(expressLayout);
app.set("layout", "./layouts/mainLayout");
app.set("view engine", "ejs");
app.set("views", "views");
//bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
//upload
app.use(fileupload())
//session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    unset:"destroy",
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());
//Static folder
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/", require("./routes/blog"));
app.use("/users", require("./routes/users"));
app.use("/dashboard", require("./routes/dashboard"));
//404
app.use(require("./controllers/errorController").get404)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("server running"));
