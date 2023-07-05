const { encrypt, decrypt } = require('../utils/AES');
const axios = require('../utils/axios');
const {
  getUrlbody,
  selectResult,
  getListResult,
  getListResultOne,
} = require('../utils/wallpaper/index');
const { downloadImg } = require('../utils/file/index');
const { Fnc, db } = require('../utils/sql/index');
const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  });
});
router.get('/sql', async (ctx, next) => {
  const createTableSql = `
  CREATE TABLE ipSearch (
    id INTEGER PRIMARY KEY,
    ip VARCHAR (50) NOT NULL,
    time VARCHAR (50) NOT NULL
  ) 
  `;
  const sql1add = db.prepare(
    'INSERT OR REPLACE INTO ipSearch (ip,time) VALUES (?,?)'
  );
  // sql1add.run('1', '2023');
  db.each('SELECT id, ip,time FROM ipSearch', function (err, row) {
    console.log(`${row.id} ip:${row.ip} time:${row.time}`);
  });

  // Fnc();
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  });
});
router.get('/img', async (ctx, next) => {
  downloadImg(
    'https://w.wallhaven.cc/full/01/wallhaven-01p8g0.jpg',
    'wallpaperRandom.jpg'
  );
  ctx.body = 'img';
});

router.get('/random', async (ctx, next) => {
  const str = await getUrlbody();
  console.log(str, 'str');
  const list = selectResult(str);
  console.log(list, 'list');
  // console.log(await getListResultOne(list));
  // const s1 = await getUrlbody(list[0]);
  // const l1 = selectResult(
  //   s1,
  //   /<img\s+[^>]*id\s*=\s*["']wallpaper["'][^>]*src\s*=\s*["']([^"']*)["']/gi
  // );
  // const list = selectResult(str);
  // const res = await getListResult(list);
  // console.log(res);
  // console.log(res, 'ssss');
  ctx.body = '';
});

router.get('/test', async (ctx, next) => {
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
      console.log(Object.keys(res), res.data.result, 222, 111);
      ctx.body = res.data.state;
    })
    .catch((err) => {
      console.log(err);
    });
  // 跳转目标地址
  // ctx.body = 'success';
  // ctx.response.redirect(decrypt(ctx.request.query.url));
});

module.exports = router;
