const crypto = require('crypto');
const db = require('../model/db.js');
const promisify = require('util').promisify;

const pbkdf2Promise = promisify(crypto.pbkdf2);

const authorization = (email, pass) => {
  const user = db.get('user').value();

  return pbkdf2Promise(pass, user.salt, 1000, 512, 'sha512').then(hash => {
    return {
      err: null,
      status: {
        email: user.email === email,
        pass: hash.toString('hex') === user.hash,
      }
    };
  }).catch(err => {
    return {
      err: new Error('Возникла ошибка попробуйте еще раз'),
    };
  });
};

const setUser = (email, pass) => {
  const salt = crypto.randomBytes(16).toString('hex');
  crypto.pbkdf2(pass, salt, 1000, 512, 'sha512', (err, hash) => {
    if (err) {
      return;
    }

    db.set('user', {
      email,
      salt,
      hash: hash.toString('hex')
    }).write();
  });
};

module.exports = {
  authorization,
  setUser,
};
