const db = require('../model/db');
const uploadFile = require('../libs/upload');

module.exports = {
  get: async ctx => {
    if (ctx.session.auth) {
      return ctx.render('pages/admin', {
        msgfile: ctx.flash.file,
        msgskill: ctx.flash.skills,
      });
    }

    return ctx.redirect('/login');

  },
  updateSkills: async ctx => {
    if (!ctx.session.auth) {
      return ctx.redirect('/login');
    }

    const body = ctx.request.body;

    try {
      for ( let skill in body) {
        if (body[skill] === '') {
          continue;
        }

        db.get('skills')
          .find({ name: skill })
          .assign({ number: body[skill]})
          .write();
      }
      ctx.flash = {skills: 'Данные успешно обновлены'}
    } catch (e) {
      ctx.flash = {skills: 'Произошла ошибка попробуйте еще раз'}
    }

    return ctx.redirect('/admin');
  },
  uploadProduct: async ctx => uploadFile(ctx).then(info => {
    ctx.flash = {file: info.message};
    return ctx.redirect('/admin');
  })
};
