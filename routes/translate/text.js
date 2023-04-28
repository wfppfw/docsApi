const router = require('koa-router')();
const { transApi } = require('../../api/baidu/translate');

router.prefix('/translate');

router.get('/text', function (ctx, next) {
  transApi('apple');
  ctx.body = 'this is a users response!';
});

module.exports = router;
