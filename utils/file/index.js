const fs = require('fs');
const request = require('request');
const path = require('path');

const downloadImg = (url, fileName, fn) => {
  request(url).pipe(
    fs
      .createWriteStream(
        path.join(__dirname, '../../public/images/' + fileName)
      )
      .on('close', (err, res) => {
        if (err) {
          console.log(err);
        } else {
          fn && fn();
        }
      })
  );
};

module.exports = {
  downloadImg,
};
