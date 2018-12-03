const db = require('../model/db');
const config = require('../config');
const auth = require('../libs/auth');

module.exports = {
  get: async ctx => {
    if (ctx.session.auth) {
      return ctx.redirect('/admin');
    }

    ctx.render('pages/login', {msgslogin: ctx.flash.login});
  },
  postAuthorization: async ctx => {
    const { email, password } = ctx.request.body;

    return auth.authorization(email, password).then(({err, status}) => {
      if (err) {
        ctx.flash = {login: err.message};
        return ctx.redirect('/login');
      }

      if (!status.email || !status.pass) {
        ctx.flash = {login: 'Неверный логин или пароль'};
        return ctx.redirect('/login');
      }

      ctx.session.auth = status.pass;

      ctx.redirect('/admin');
    });
  }
};
