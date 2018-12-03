const db = require('../model/db');
const config = require('../config');
const validation = require('../libs/fileValidation');
const fs = require('fs');
const util = require('util');
const _path = require('path');

const rename = util.promisify(fs.rename);

module.exports = ctx => new Promise((resolve, reject) => {
  const path = _path.join(process.cwd(), config.upload.path);

  const {name, price} = ctx.request.body;
  const { size, name: photoName, path: photoPath} = ctx.request.files.photo;

  const valid = validation(name, price, {size, name: photoName});

  if (valid.err) {
    fs.unlinkSync(photoPath);
    return resolve({message: valid.status});
  }

  const fileName = _path.join(path, photoName);

  rename(photoPath, fileName).then(() => {

    db.get('products')
      .push({
        src: `${config.upload.file}/${photoName}`,
        name: name,
        price: price
      })
      .write();

    return resolve({message: 'Продукт успешно добавлен'});
  }).catch(err => {
    console.error(err);
    return resolve({message: err});
  });

});
