const axios = require('../../utils/axios.js');
const keys = require('../../utils/key.js');

// 实时天气
const nowWeather = async (location) => {
  let result = {};
  const url = `https://devapi.qweather.com/v7/weather/now?location=${location}&key=${keys.hefeng_KEY}`;
  await axios
    .get(url)
    .then((res) => {
      result = res.data;
      console.log(res.data);
    })
    .catch((error) => {
      result = { error: error };
      console.log(error);
    });
  return result;
};

// 未来天数天气 day:3,5,7,10,15
const dayWeather = async (location, day) => {
  let result = {};
  const url = `https://devapi.qweather.com/v7/weather/${day}d?location=${location}&key=${keys.hefeng_KEY}`;
  await axios
    .get(url)
    .then((res) => {
      result = res.data;
      console.log(res.data);
    })
    .catch((error) => {
      result = { error: error };
      console.log(error);
    });
  return result;
};

const getCity = async (location) => {
  /**
   * location(必选)需要查询地区的名称，支持文字、以英文逗号分隔的经度,纬度坐标（十进制，最多支持小数点后两位）、LocationID或Adcode（仅限中国城市）。例如 location=北京 或 location=116.41,39.92
   */

  let result = {};
  const url = `https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=${keys.hefeng_KEY}`;
  await axios
    .get(url)
    .then((res) => {
      result = res.data;
      console.log(res.data);
    })
    .catch((error) => {
      result = { error: error };
      console.log(error);
    });
  return result;
};

module.exports = {
  nowWeather,
  getCity,
};
