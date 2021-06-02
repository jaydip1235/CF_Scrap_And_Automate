const nodemailer = require('nodemailer')

const sendEmail = (options) => {
    let transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'statuscodeforces@gmail.com',
            pass : 'jaydip0.1'
        }
    })

    let mainOptions = {
        from : 'statuscodeforces@gmail.com',
        to : options.to,
        subject : options.subject,
        html : options.text
    }

    transporter.sendMail(mainOptions,function(err, res){ 
        if(err) {
            console.log(err)
        }
        else{
            console.log(info)
        }
    })
}

module.exports = sendEmail