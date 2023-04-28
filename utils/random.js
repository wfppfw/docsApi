// 生成随机字母或数字
const salt = (length = 10) => {
  let arr = [...Array(26).keys()]
    .map((i) => String.fromCharCode(i + 65))
    .concat([...Array(26).keys()].map((i) => String.fromCharCode(i + 97)))
    .concat([...new Array(10).keys()]);
  return [...new Array(length).keys(length)]
    .map((i) => arr[Math.floor(Math.random() * 63)])
    .join('');
};
module.exports = {
  salt,
};
