const router = require('koa-router')();
const { nowWeather } = require('../../api/hefeng/city');

router.prefix('/weather');

router.get('/getGList', function (ctx, next) {
  ctx.body = 'this is a users response!';
});

router.get('/now', function (ctx, next) {
  nowWeather('101010100');
  ctx.body = 'this is a users/bar response';
});

module.exports = router;
