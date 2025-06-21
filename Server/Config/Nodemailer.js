const nodemailer = require('nodemailer')

const transporter= nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    },
})

const sendEmail = async (to,subject,html)=>{
    await transporter.sendMail({
        from:`<${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    })
}

module.exports={sendEmail};