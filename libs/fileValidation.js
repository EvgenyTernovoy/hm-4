module.exports = (name, price, photo) => {
  if (!name) {
    return {
      status: 'Не указано имя товара',
      err: true
    };
  }

  if (!price) {
    return {
      status: 'Не указана цена',
      err: true
    };
  }

  if (photo.name === '' || photo.size === 0) {
    return {
      status: 'Не загружена картинка',
      err: true
    };
  }

  return { err: false };
};
