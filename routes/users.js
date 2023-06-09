const {} = require('../utils/AES')

const router = require('koa-router')();

router.prefix('/users');

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!';
});

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response';
});

router.get('/ip', function (ctx, next) {
  // ctx.body = 'this is a users/bar response';
  console.log(ctx, next);
  router.redirect('www.baidu.com');
});

module.exports = router;
