const moment =require("jalali-moment")
exports.formDate=date=>{
    return moment(date).locale("fa").format("D MMM YYYY")
}