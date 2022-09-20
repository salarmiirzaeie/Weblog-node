const nodemailer=require("nodemailer")
const smtpTransparent=require("nodemailer-smtp-transport")
const transporterDetails=smtpTransparent({
    host:"salarmiirzaeie@gmail.com",
    port:3000,
    secure:{
        user:"salarmiirzaeie@gmail.com",
        pass:"Salar9757110041"
    },
    tls:{
        rejectUnauthorized:false
    }
})
exports.sendEmail=(email,fullname,subject,message)=>{
    const transporter=nodemailer.createTransport(transporterDetails)
    transporter.sendMail({
        from:"salarmiirzaeie@gmail.com",
        to:email,
        subject:subject,
        html:`<h1>سلام ${name}</h1>
        <p>${message}</p>`
    })
}