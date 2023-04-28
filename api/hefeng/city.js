const axios = require('../../utils/axios.js');
const keys = require('../../utils/key.js');

const nowWeather = (location) => {
  const url = `https://devapi.qweather.com/v7/weather/now?location=${location}&key=${keys.hefeng_KEY}`;
  axios
    .get(url)
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getCity = (location) => {
  /**
   * location(必选)需要查询地区的名称，支持文字、以英文逗号分隔的经度,纬度坐标（十进制，最多支持小数点后两位）、LocationID或Adcode（仅限中国城市）。例如 location=北京 或 location=116.41,39.92
   */

  const url = `https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=${keys.hefeng_KEY}`;

  axios
    .get(url)
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  nowWeather,
  getCity,
};
