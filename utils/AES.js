const crypto = require('crypto');
const key = '1234567890Abc!10';
const iv = '1234567890Abc!10';

// 加密
module.exports.encrypt = (data) => {
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

// 解密
module.exports.decrypt = (encrypted) => {
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
