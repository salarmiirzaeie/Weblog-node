const Yup = require("yup");
exports.schema = Yup.object().shape({
  title: Yup.string().required("لازمه"),
  body: Yup.string().required("لازمه"),
  status: Yup.mixed().oneOf(["public", "private"], "یاخصوصی یا عمومی"),
});
