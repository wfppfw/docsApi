// 通用翻译API HTTPS 地址：
// https://fanyi-api.baidu.com/api/trans/vip/translate

// 通用翻译平台：https://fanyi-api.baidu.com/
/**
 * 签名生成方法
签名是为了保证调用安全，使用 MD5 算法生成的一段字符串，生成的签名长度为 32 位，签名中的英文字符均为小写格式。

生成方法：
Step1. 将请求参数中的 APPID(appid)， 翻译 query(q，注意为UTF-8编码)，随机数(salt)，以及平台分配的密钥(可在管理控制台查看) 按照 appid+q+salt+密钥的顺序拼接得到字符串 1。
Step2. 对字符串 1 做 MD5 ，得到 32 位小写的 sign。
注：
1. 待翻译文本（q）需为 UTF-8 编码；
2. 在生成签名拼接 appid+q+salt+密钥 字符串时，q 不需要做 URL encode，在生成签名之后，发送 HTTP 请求之前才需要对要发送的待翻译文本字段 q 做 URL encode；
3.如遇到报 54001 签名错误，请检查您的签名生成方法是否正确，在对 sign 进行拼接和加密时，q 不需要做 URL encode，很多开发者遇到签名报错均是由于拼接 sign 前就做了 URL encode；
4.在生成签名后，发送 HTTP 请求时，如果将 query 拼接在URL上，需要对 query 做 URL encode。


输入参数
请求方式： 可使用 GET 或 POST 方式，如使用 POST 方式，Content-Type 请指定为：application/x-www-form-urlencoded
字符编码：统一采用 UTF-8 编码格式
query 长度：为保证翻译质量，请将单次请求长度控制在 6000 bytes以内（汉字约为输入参数 2000 个）
 */
const axios = require('../../utils/axios.js');
const keys = require('../../utils/key.js');
const { salt } = require('../../utils/random.js');
const { MD5 } = require('../../utils/md5');

const commonUrl = 'https://fanyi-api.baidu.com/api/trans/vip/translate';
const transApi = async (query, form = 'en', to = 'zh') => {
  console.log(query, form, to);
  let result = {};
  let randomString = new Date().getTime();
  const Step1 =
    keys.BaiDu_fanyi_APPID + query + randomString + keys.BaiDu_fanyi_SECRET;
  const Step2 = MD5(Step1);
  await axios
    .get(commonUrl, {
      params: {
        q: query,
        from: form,
        to: to,
        appid: keys.BaiDu_fanyi_APPID,
        salt: randomString,
        sign: Step2,
      },
    })
    .then((res) => {
      console.log(res)
      result = res.data;
    })
    .catch((error) => {
      result = { msg: error };
    });

  return result;
};

module.exports = {
  transApi,
};
