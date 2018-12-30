const mailer = require('nodemailer');
const { welcome } = require('./welcome_template');
const { purchase } = require('./purchase_template');
const { resetpass } = require('./resetpass_template');
require ('dotenv').config();

const getEmailData = (to, name, token, template, actionData) =>{
  let data = null;

  switch(template){
    case "welcome":
      data = {
        from: "dans <dans.audio.rev@gmail.com>",
        to,
        subject: `Welcome to dans ${name}`,
        html: welcome()
      }
    break;
    case "purchase":
    data = {
      from: "dans <dans.audio.rev@gmail.com>",
      to,
      subject: `Thanks for your order ${name}`,
      html: purchase(actionData)
    }
  break;
  case "reset_password":
    data = {
      from: "dans <dans.audio.rev@gmail.com>",
      to,
      subject: `Hey ${name}, reset your password`,
      html: resetpass(actionData)
    }
  break;
    default:
      data;
  }

  return data;

}

const sendEmail = (to, name, token, type, actionData = null) => {
  const smtpTransport = mailer.createTransport({
      service:"Gmail",
      auth:{
        user: "waves3507@gmail.com",
        pass: process.env.EMAIL_PASS
      }
  });

  const mail = getEmailData(to, name, token, type, actionData)

  smtpTransport.sendMail(mail, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log('email sent');
    }
    smtpTransport.close();
  })

  

}





module.exports = { sendEmail }