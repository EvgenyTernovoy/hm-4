const nodemailer = require('nodemailer');
const config = require('../config');

module.exports = fields => new Promise((resolve, reject) => {

  const { name, email, message } = fields;

  if (!name || !email || !message) {
    return resolve({message: 'Все поля нужно заплонить'});
  }

  const transporter = nodemailer.createTransport(config.mail.smtp);

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text: message.trim().slice(0, 500) + `\n Отправлено с ${email}`
  };

  transporter.sendMail(mailOptions, (err, info) => {

    if (err) {
      return resolve({message:  `При отправки письма произошла ошибка: ${err}`});
    }

    return resolve({message: 'Сообщение успешно отправлено'});
  });
});
