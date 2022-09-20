const Blog = require("../models/blog");
const { formDate } = require("../utils/jalali");
const { truncate } = require("../utils/helpers");

const { get500, get404 } = require("./errorController");

exports.getIndex = async (req, res) => {
  const page = +req.query.page || 1;
  const postPerPage = 3;
  try {
    const numberOfPosts = await Blog.find({
      status: "public",
    }).countDocuments();
    const posts = await Blog.find({ status: "public" })
      .sort({
        createdAt: "desc",
      })
      .skip((page - 1) * postPerPage)
      .limit(postPerPage);
    res.render("index", {
      pageTitle: "وبلاگ",
      path: "/",
      posts,
      formDate,
      truncate,
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: postPerPage * page < numberOfPosts,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(numberOfPosts / postPerPage),
    });
  } catch (error) {
    console.log(err);
    get500();
  }
};
exports.getSinglePost = async (req, res) => {
  try {
    const post = await Blog.findOne({ _id: req.params.id }).populate("user");
    if (!post) {
      get404();
    }
    res.render("post", {
      pageTitle: post.title,
      path: "/post",
      post,
      formDate,
    });
  } catch (error) {
    console.log(error);
    get500();
  }
};
exports.handlesearch = async (req, res) => {
  const page = +req.query.page || 1;
  const postPerPage = 3;
  try {
    const numberOfPosts = await Blog.find({
      status: "public",
      $text: { $search: req.body.searchtext },

    }).countDocuments();
    const posts = await Blog.find({
      status: "public",
      $text: { $search: req.body.searchtext },
    })
      .sort({
        createdAt: "desc",
      })
      .skip((page - 1) * postPerPage)
      .limit(postPerPage);
    res.render("index", {
      pageTitle: "نتایج",
      path: "/",
      posts,
      formDate,
      truncate,
      currentPage: page,
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
