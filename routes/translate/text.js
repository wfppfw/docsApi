const router = require('koa-router')();
const { transApi } = require('../../api/baidu/translate');

router.prefix('/translate');

router.get('/text', async function (ctx, next) {
  const { text, form, to } = ctx.request.query;
  const resTrans = await transApi(text, form, to);
  console.log(resTrans);
  ctx.body = { ...resTrans };
});

module.exports = router;
