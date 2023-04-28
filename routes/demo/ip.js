const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const { encrypt, decrypt } = require('../../utils/AES');
const keys = require('../../utils/key');
router.prefix('/demo');

function getClientIP(req) {
  let ip =
    req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
    req.ip ||
    req.connection.remoteAddress || // 判断 connection 的远程 IP
    req.socket.remoteAddress || // 判断后端的 socket 的 IP
    req.connection.socket.remoteAddress ||
    '';
  if (ip) {
    ip = ip.replace('::ffff:', '');
  }
  return ip;
}
router.get('/ip', function (ctx, next) {
  const { url } = ctx.request.query;
  try {
    if (url) {
      console.log(getClientIP(ctx.req));
      // axios
      //   .get(keys.qqMapUrl + 'key=' + keys.qqMapKey)
      //   .then((res) => {
      //     console.log(res.result.ip);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      ctx.response.redirect(decrypt(url));
    } else {
      ctx.body = 'error param';
    }
  } catch (error) {
    ctx.body = '';
  }
});
router.post('/ip', async (ctx, next) => {
  //返回拼装重定向第三方地址：
  let postParam = ctx.request.body; //获取post提交的数据{url:xxx}
  let prefixUrl = '';
  if (process.env.NODE_ENV === 'dev') {
    prefixUrl = 'http://localhost/demo/ip';
  }
  if (process.env.NODE_ENV === 'prd') {
    prefixUrl = 'http://localhost/demo/ip';
  }
  //短链接处理

  //
  ctx.body = {
    url: prefixUrl + `?url=${encrypt(ctx.request.body.url)}`,
  };
});

module.exports = router;
