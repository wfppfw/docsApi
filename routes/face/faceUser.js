const router = require('koa-router')();
const { getGList } = require('../../utils/baidu/face');

router.prefix('/face');

router.get('/getGList', function (ctx, next) {
  getGList();
  ctx.body = 'this is a users response!';
});

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response';
});

module.exports = router;
