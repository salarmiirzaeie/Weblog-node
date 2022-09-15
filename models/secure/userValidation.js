
const Yup=require("yup")
exports.schema = Yup.object().shape({
    name: Yup.string().required("نام الزامی است").min(4).max(255),
    email: Yup.string().email("ایمیل معتبر نیست").required(),
    password: Yup.string().min(4).max(255).required(),
    confirmpassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null]),
  });