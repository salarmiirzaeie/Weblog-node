const multer = require("multer");

const Blog = require("../models/blog");
const { formDate } = require("../utils/jalali");
const { get500, get404 } = require("./errorController");
const { storage, fileFilter } = require("../utils/multer");
exports.getDashboard = async (req, res) => {
  const page=+req.query.page||1
  const postPerPage=2
  try {
    const numberOfPosts=await Blog.find({
      user:req.user._id
    }).countDocuments()
    const blogs = await Blog.find({ user: req.user.id })
    .skip((page-1)*postPerPage)
    .limit(postPerPage)

    res.render("private/blogs", {
      pageTitle: "داشبورد",
      path: "/dashboard",
      layout: "./layouts/dashLayout",
      name: req.user.name,
      blogs,
      formDate,
      currentPage:page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: postPerPage * page < numberOfPosts,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(numberOfPosts / postPerPage),
    });
  } catch (error) {
    console.log(error);
    get500();
  }
};
exports.getAddpost = (req, res) => {
  res.render("private/addPost", {
    pageTitle: "ساخت پست",
    path: "./dashboard/add-post",
    layout: "./layouts/dashLayout",
    name: req.user.name,
  });
};

exports.getEditpost = async (req, res) => {
  const post = await Blog.findOne({ _id: req.params.id });
  if (!post) {
    get404();
  }
  if (post.user.toString() != req.user._id) {
    return res.redirect("/dashboard");
  }

  res.render("private/editPost", {
    pageTitle: "ویرایش پست",
    path: "./dashboard/edit-post",
    layout: "./layouts/dashLayout",
    name: req.user.name,
    post,
  });
};
exports.editPost = async (req, res) => {
  const post = await Blog.findOne({ _id: req.params.id });

  try {
    const { title, status, body } = req.body;
    post.title = title;
    post.status = status;
    post.body = body;
    await post.save();
    // await Blog.postValidation(req.body)
    return res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.render("private/editPost", {
      pageTitle: "ویرایش پست",
      path: "./dashboard/edit-post",
      layout: "./layouts/dashLayout",
      name: req.user.name,
      post,
    });
  }
};
exports.deletePost = async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.id);
    return res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    get500()
  }
};
exports.createPost = async (req, res) => {
  try {
    // await Blog.postValidation(req.body)
    await Blog.create({ ...req.body, user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    get500();
  }
};

exports.uploadImage = (req, res) => {
  const upload = multer({
    limits: { fileSize: 4000000 },
    dest: "uploads/",
    storage: storage,
    fileFilter: fileFilter,
  }).single("image");
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.send("عکسی نیست");
    } else {
      res.status(200).send("حله");
    }
  });
};
