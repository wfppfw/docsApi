const router = require('koa-router')();
const { nowWeather, getCity, dayWeather } = require('../../api/hefeng/city');

router.prefix('/weather');

router.get('/getGList', function (ctx, next) {
  ctx.body = 'this is a users response!';
});

// id或坐标查询实时天气
router.get('/now', async function (ctx, next) {
  // location 坐标逗号相隔，LocationID或Adcode,不能为文字
  const { location } = ctx.request.query;
  if (location) {
    const nowMsg = await nowWeather(location);
    ctx.body = { ...nowMsg };
  } else {
    ctx.body = {};
  }
});

// 关键字查询城市信息
router.get('/city', async function (ctx, next) {
  // key 为文字，坐标逗号相隔，LocationID或Adcode
  const { key } = ctx.request.query;
  if (key) {
    const cityMsg = await getCity(key);
    ctx.body = { ...cityMsg };
  } else {
    ctx.body = {};
  }
});
module.exports = router;
