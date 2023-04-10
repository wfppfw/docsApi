const { encrypt, decrypt } = require('../utils/AES');
const axios = require('../utils/axios');
const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  });
});

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string';
});

router.get('/getMd5url', async (ctx, next) => {
  ctx.body = {
    url: encrypt(ctx.request.query.url),
  };
});
router.get('/ip', async (ctx, next) => {
  console.log(
    'cf770a3d336a2312f688d76587537f0da36db94776f90e5aca21131912d12023',
    ctx.url,
    ctx.request.query,
    encrypt('hellow'),
    decrypt(encrypt('hellow'))
  );
  axios
    .get(
      'https://apis.map.qq.com/ws/location/v1/ip?key=6CJBZ-EBHRH-I5BDY-WGC66-KN6OF-Y4FD5'
    )
    .then((res) => {
      console.log(res.result.ip);
    })
    .catch((err) => {
      console.log(err);
    });
  // 跳转目标地址
  ctx.response.redirect(decrypt(ctx.request.query.url));
});

module.exports = router;
