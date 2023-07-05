const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');

// const regExp =
// /<a\s+[^>]*class\s*=\s*["']preview["'][^>]*href\s*=\s*["']([^"']*)["']/gi;
const selectResult = (htmlStr, regExp) => {
  if (!regExp) {
    regExp =
      /<a\s+[^>]*class\s*=\s*["']preview["'][^>]*href\s*=\s*["']([^"']*)["']/gi;
  }

  let result = [];
  let match;
  while ((match = regExp.exec(htmlStr))) {
    result.push(match[1]);
  }

  return result;
};
const getUrlbody = (URL = 'https://wallhaven.cc/random') => {
  //   await axios
  //     .get(URL)
  //     .then((response) => {
  //       const html = response.data;
  //       const $ = cheerio.load(html);
  //       const body = $('body');

  //       bodyData = body.html();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  return new Promise((resolve, reject) => {
    request(URL, async function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // 输出网页内容
        console.log('body');
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
};

const getListResultOne = async (list) => {
  let length = list?.length;
  let oneIndex = Math.random() * length;
  let res = await getUrlbody(list[oneIndex]);
  let url = await selectResult(
    res,
    /<img\s+[^>]*id\s*=\s*["']wallpaper["'][^>]*src\s*=\s*["']([^"']*)["']/gi
  );
  return url;
};

const getListResult = (list) => {
  // Promise.all(list.map((i) => getUrlbody(i)[0]))
  // console.log(list, '---');
  // Promise.all(
  //   list.map((i) => {
  //     console.log(getUrlbody(i));
  //     return getUrlbody(i);
  //   })
  // )
  //   .then((res) => {
  //     console.log(res, '11111');
  //   })
  //   .catch((error) => {
  //     console.log(error, '2222');
  //   });
  // return new Promise((resolve, reject) => {
  //   Promise.all([...list.map((i) => getUrlbody(i))])
  //     .then((res) => {
  //       resolve(
  //         res.map((j) => [
  //           ...new Set(
  //             selectResult(
  //               j,
  //               /<img\s+[^>]*id\s*=\s*["']wallpaper["'][^>]*src\s*=\s*["']([^"']*)["']/gi
  //             )
  //           ),
  //         ])
  //       );
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // resolve(Promise.all(...list.map(i=>getUrlbody(i))).map(j=>selectResult(j,/<img\s+[^>]*id\s*=\s*["']wallpaper["'][^>]*src\s*=\s*["']([^"']*)["']/gi)));
  // });
  //   return list.map(async (i) => {
  //     let htmlStr = await getUrlbody(i);
  //     return await selectResult(
  //       htmlStr,
  //       /<img\s+[^>]*id\s*=\s*["']wallpaper["'][^>]*src\s*=\s*["']([^"']*)["']/gi
  //     );
  //   });
};

module.exports = {
  getUrlbody,
  selectResult,
  getListResult,
  getListResultOne,
};
