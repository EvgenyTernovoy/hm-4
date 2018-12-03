const Koa  = require('koa');
const koaStatic = require('koa-static');
const session = require('koa-session');
const Pug = require('koa-pug');
const errorHandler = require('./libs/errorHandler');
const flash = require('koa-flash');
const path = require('path');
const config = require('./config');
const fs = require('fs');

const app = new Koa();

app.keys = ['23ewfdsvfdv', 'gdsfg45ttgergf'];

const pug = new Pug({
  viewPath: './views',
  noCache: true,
  basedir: './views',
  pretty: false,
  app: app,
});

app.use(session(config.session, app));
app.use(flash());

app.use(koaStatic(path.join(process.cwd(), config.public)));

app.use(errorHandler);

app.on('error', (err, ctx) => {
  ctx.render('pages/error', {
    status: ctx.response.status,
    error: ctx.response.message
  });
});



const router = require('./routes');

app.use(router.routes()).use(router.allowedMethods());

/*app.use(session({
  secret: 'loftschool',
  key: 'login',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 680000
  },
  resave: false,
  saveUninitialized: false,
}));*/






const server = app.listen(process.env.PORT || config.port, () => {
  console.log(`server listen on ${server.address().port} port`);
  if(!fs.existsSync(path.join(process.cwd(), config.upload.path))) {
    fs.mkdirSync(path.join(process.cwd(), config.upload.path));
  }
});
