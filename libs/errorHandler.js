module.exports = async (ctx, next) => {
  try {
    await next();

    if (ctx.status === 404 && ctx.originalUrl !== '/favicon.ico') {
      const err = {
        status: ctx.response.status,
        message: ctx.response.message,
      }

      ctx.app.emit('error', err, ctx)
    }

  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
};
