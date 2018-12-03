const db = require('../model/db');
const sendMail = require('../libs/sendMail');

module.exports = {
  get: async ctx => {
    const data = {
      msgemail: ctx.flash.mail,
      skills: db.get('skills').value(),
      products: db.get('products').value()
    };

    return ctx.render('pages/index', data);
  },
  post: async ctx => {
    return sendMail(ctx.request.body).then((info) => {
      ctx.flash = {mail: info.message};
      ctx.redirect('/#mail-status');
    });
  }
};
