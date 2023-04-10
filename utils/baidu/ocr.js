const keys = require('../key.js');
const AipFaceClient = require('baidu-aip-sdk').face;
const fs = require('fs');

// 设置APPID/AK/SK
const APP_ID = keys.OCR_APP_ID;
const API_KEY = keys.OCR_API_KEY;
const SECRET_KEY = keys.OCR_SECRET_KEY;

// 新建一个对象，建议只保存一个对象调用服务接口
const client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);

const HttpClient = require('baidu-aip-sdk').HttpClient;

// 设置request库的一些参数，例如代理服务地址，超时时间等
// request参数请参考 https://github.com/request/request#requestoptions-callback
HttpClient.setRequestOptions({ timeout: 5000 });

// 也可以设置拦截每次请求（设置拦截后，调用的setRequestOptions设置的参数将不生效）,
// 可以按需修改request参数（无论是否修改，必须返回函数调用参数）
// request参数请参考 https://github.com/request/request#requestoptions-callback
HttpClient.setRequestInterceptor(function (requestOptions) {
  // 查看参数
  console.log(requestOptions);
  // 修改参数
  requestOptions.timeout = 5000;
  // 返回参数
  return requestOptions;
});

//通用文字识别
//用户向服务请求识别某张图中的所有文字。
const basicOcr = (data, type = 'url') => {
  // 如果有可选参数
  const options = {};

  /**
 * 默认为CHN_ENG。可选值包括：
- CHN_ENG：中英文混合；
- ENG：英文；
- POR：葡萄牙语；
- FRE：法语；
- GER：德语；
- ITA：意大利语；
- SPA：西班牙语；
- RUS：俄语；
- JAP：日语；
- KOR：韩语；
 */
  options['language_type'] = 'CHN_ENG';
  /**
 * 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:
- true：检测朝向；
- false：不检测朝向。
 */
  options['detect_direction'] = 'true';
  /**
   * 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）
   */
  options['detect_language'] = 'true';
  /**
   * 	是否返回识别结果中每一行的置信度
   */
  options['probability'] = 'true';
  if (type === 'url') {
    // 带参数调用通用文字识别, 图片参数为远程url图片
    client
      .generalBasicUrl(data, options)
      .then(function (result) {
        console.log(JSON.stringify(result));
      })
      .catch(function (err) {
        // 如果发生网络错误
        console.log(err);
      });
  } else {
    // 带参数调用通用文字识别, 图片参数为本地图片
    client
      .generalBasic(data, options)
      .then(function (result) {
        console.log(JSON.stringify(result));
      })
      .catch(function (err) {
        // 如果发生网络错误
        console.log(err);
      });
  }
};

// 通用文字识别（高精度版）
// 用户向服务请求识别某张图中的所有文字，相对于通用文字识别该产品精度更高，但是识别耗时会稍长。
const accurateOcr = (image) => {
  // 如果有可选参数
  const options = {};
  options['detect_direction'] = 'true';
  options['probability'] = 'true';

  // 带参数调用通用文字识别（高精度版）
  client
    .accurateBasic(image, options)
    .then(function (result) {
      console.log(JSON.stringify(result));
    })
    .catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
};

// 通用文字识别（含位置信息版）
// 用户向服务请求识别某张图中的所有文字，并返回文字在图中的位置信息。
const generalOcr = (data, type = 'url') => {
  // 如果有可选参数
  const options = {};

  options['recognize_granularity'] = 'big';
  options['language_type'] = 'CHN_ENG';
  options['detect_direction'] = 'true';
  options['detect_language'] = 'true';
  options['vertexes_location'] = 'true';
  options['probability'] = 'true';
  if (type === 'url') {
    // 带参数调用通用文字识别, 图片参数为远程url图片
    client
      .generalUrl(data, options)
      .then(function (result) {
        console.log(JSON.stringify(result));
      })
      .catch(function (err) {
        // 如果发生网络错误
        console.log(err);
      });
  } else {
    // 带参数调用通用文字识别, 图片参数为本地图片
    client
      .generalUrl(data, options)
      .then(function (result) {
        console.log(JSON.stringify(result));
      })
      .catch(function (err) {
        // 如果发生网络错误
        console.log(err);
      });
  }
};

// 通用文字识别（含位置高精度版）
// 用户向服务请求识别某张图中的所有文字，并返回文字在图片中的坐标信息，相对于通用文字识别（含位置信息版）该产品精度更高，但是识别耗时会稍长。
const accurateHeigtOcr = (image) => {
  // 如果有可选参数
  const options = {};
  options['recognize_granularity'] = 'big';
  options['detect_direction'] = 'true';
  options['vertexes_location'] = 'true';
  options['probability'] = 'true';

  // 带参数调用通用文字识别（含位置高精度版）
  client
    .accurate(image, options)
    .then(function (result) {
      console.log(JSON.stringify(result));
    })
    .catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
};

// 通用文字识别（含生僻字版）
// 某些场景中，图片中的中文不光有常用字，还包含了生僻字，这时用户需要对该图进行文字识别，应使用通用文字识别（含生僻字版）
const generalEnhanceOcr = (data, type = 'url') => {
  // 如果有可选参数
  const options = {};

  options['language_type'] = 'CHN_ENG';
  options['detect_direction'] = 'true';
  options['detect_language'] = 'true';
  options['probability'] = 'true';
  if (type === 'url') {
    // 带参数调用通用文字识别, 图片参数为远程url图片
    client
      .generalEnhance(data, options)
      .then(function (result) {
        console.log(JSON.stringify(result));
      })
      .catch(function (err) {
        // 如果发生网络错误
        console.log(err);
      });
  } else {
    // 带参数调用通用文字识别, 图片参数为本地图片
    client
      .generalEnhance(data, options)
      .then(function (result) {
        console.log(JSON.stringify(result));
      })
      .catch(function (err) {
        // 如果发生网络错误
        console.log(err);
      });
  }
};

// 网络图片文字识别
// 用户向服务请求识别一些网络上背景复杂，特殊字体的文字
const webImageOcr = (data, type = 'url') => {
  // 如果有可选参数
  const options = {};
  options['detect_direction'] = 'true';
  options['detect_language'] = 'true';
  if (type === 'url') {
    // 带参数调用通用文字识别, 图片参数为远程url图片
    client
      .webImage(data, options)
      .then(function (result) {
        console.log(JSON.stringify(result));
      })
      .catch(function (err) {
        // 如果发生网络错误
        console.log(err);
      });
  } else {
    // 带参数调用通用文字识别, 图片参数为本地图片
    client
      .webImage(data, options)
      .then(function (result) {
        console.log(JSON.stringify(result));
      })
      .catch(function (err) {
        // 如果发生网络错误
        console.log(err);
      });
  }
};

module.exports = {
  client,
  HttpClient,
  webImageOcr,
};
