/**
 * 关于人脸库的设置限制

每个appid对应一个人脸库，且不同appid之间，人脸库互不相通；
每个人脸库下，可以创建多个用户组，用户组（group）数量没有限制；
每个用户组（group）下，可添加最多无限张人脸，无限个uid；
每个用户（uid）所能注册的最大人脸数量20个；
 */

const keys = require('../key.js');
const AipFaceClient = require('baidu-aip-sdk').face;

// 设置APPID/AK/SK
const APP_ID = keys.FACE_APP_ID;
const API_KEY = keys.FACE_API_KEY;
const SECRET_KEY = keys.FACE_SECRET_KEY;

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

// 用户信息查询
const getUserInfo = (userId, groupId = 'user_1') => {
  /**
   * userId:用户id（由数字、字母、下划线组成），长度限制128B
   * groupId:用户组id（由数字、字母、下划线组成），长度限制128B
   */
  // 调用用户信息查询
  client
    .getUser(userId, groupId)
    .then(function (result) {
      console.log(JSON.stringify(result));
    })
    .catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
};
// 获取用户人脸列表
const getUserFaceList = (userId, groupId = 'user_1') => {
  // 调用获取用户人脸列表
  client
    .faceGetlist(userId, groupId)
    .then(function (result) {
      console.log(JSON.stringify(result));
    })
    .catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
};
//获取用户组中的用户列表
const getGroupList = (groupId = 'user_1') => {
  // 如果有可选参数
  var options = {};
  options['start'] = '0';
  options['length'] = '50';

  // 带参数调用获取用户列表
  client
    .getGroupUsers(groupId, options)
    .then(function (result) {
      console.log(JSON.stringify(result));
    })
    .catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
};
//复制用户到一个新的组
const copyUser = (userId) => {
  // 如果有可选参数
  // var options = {};
  // options["src_group_id"] = "11111";
  // options["dst_group_id"] = "222222";

  // 带参数调用复制用户
  client
    .userCopy(userId)
    .then(function (result) {
      console.log(JSON.stringify(result));
    })
    .catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
};
//删除用户
const deleteUser = (userId, groupId = 'user_1') => {
  // 调用删除用户
  client
    .deleteUser(groupId, userId)
    .then(function (result) {
      console.log(JSON.stringify(result));
    })
    .catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
};
//创建用户组
const createUser = (groupId = 'user_1') => {
  // 调用创建用户组,用于创建一个空的用户组，如果用户组已存在 则返回错误。
  client
    .groupAdd(groupId)
    .then(function (result) {
      console.log(JSON.stringify(result));
    })
    .catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
};
//删除用户组
const deleteGroup = (groupId = 'user_1') => {
  // 调用删除用户组
  client
    .groupDelete(groupId)
    .then(function (result) {
      console.log(JSON.stringify(result));
    })
    .catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
};
//组列表查询
const getGList = () => {
  // 调用组列表查询
  client
    .getGrouplist()
    .then(function (result) {
      console.log(JSON.stringify(result));
    })
    .catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
};

//人脸注册
const addFace = (image, groupId, userId, imageType = 'BASE64') => {
  // var image =
  //   '取决于image_type参数，传入BASE64字符串或URL字符串或FACE_TOKEN字符串';

  // var imageType = 'BASE64';

  // var groupId = 'group1';

  // var userId = 'user1';

  // 如果有可选参数
  var options = {};
  /**
   * 用户资料，长度限制256B
   */
  options['user_info'] = "user's info";
  /**
   * 图片质量控制
   * NONE: 不进行控制 LOW:较低的质量要求
   * NORMAL: 一般的质量要求
   * HIGH: 较高的质量要求
   * 默认 NONE
   */
  options['quality_control'] = 'NORMAL';

  /**
   * 活体检测控制
   * NONE: 不进行控制 LOW:较低的活体要求(高通过率 低攻击拒绝率)
   * NORMAL: 一般的活体要求(平衡的攻击拒绝率, 通过率)
   * HIGH: 较高的活体要求(高攻击拒绝率 低通过率)
   * 默认NONE
   */
  options['liveness_control'] = 'LOW';

  /**
   * 操作方式
   * APPEND: 当user_id在库中已经存在时，对此user_id重复注册时，新注册的图片默认会追加到该user_id下,
   * REPLACE: 当对此user_id重复注册时,则会用新图替换库中该user_id下所有图片,
   * 默认使用APPEND
   */
  options['action_type'] = 'REPLACE';

  // 带参数调用人脸注册
  client
    .addUser(image, imageType, groupId, userId, options)
    .then(function (result) {
      console.log(JSON.stringify(result));
    })
    .catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
};

//人脸更新
const updateFace = (image, groupId, userId, imageType = 'imageType') => {
  // 如果有可选参数
  var options = {};
  options['user_info'] = "user's info";
  options['quality_control'] = 'NORMAL';
  options['liveness_control'] = 'LOW';
  options['action_type'] = 'REPLACE';

  // 带参数调用人脸更新
  client
    .updateUser(image, imageType, groupId, userId, options)
    .then(function (result) {
      console.log(JSON.stringify(result));
    })
    .catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
};

//人脸删除
const deleteFace = (groupId, userId, faceToken) => {
  // 删除的内容，包括用户所有图像和身份信息；
  // 如果一个uid存在于多个用户组内，将会同时将从各个组中把用户删除
  // 如果指定了group_id，则只删除此group下的uid相关信息
  // var userId = "user1";
  // var groupId = "group1";
  // var faceToken = "face_token_23123";

  // 调用人脸删除
  client
    .faceDelete(userId, groupId, faceToken)
    .then(function (result) {
      console.log(JSON.stringify(result));
    })
    .catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
};

//人脸检测
const faceDetect = (image, imageType = 'BASE64') => {
  // var image =
  // '取决于image_type参数，传入BASE64字符串或URL字符串或FACE_TOKEN字符串';

  // var imageType = 'BASE64';

  // 如果有可选参数
  var options = {};
  /**
 * 包括age,beauty,expression,face_shape,gender,glasses,landmark,landmark150,quality,eye_status,emotion,face_type信息
逗号分隔. 默认只返回face_token、人脸框、概率和旋转角度
 */
  // options["face_field"] = "age";

  /**
   * 最多处理人脸的数目，默认值为1，仅检测图片中面积最大的那个人脸；最大值10，检测图片中面积最大的几张人脸
   */
  options['max_face_num'] = '1';
  /**
   * 人脸的类型
   * LIVE表示生活照：通常为手机、相机拍摄的人像图片、或从网络获取的人像图片等
   * IDCARD表示身份证芯片照：二代身份证内置芯片中的人像照片 WATERMARK表示带水印证件照：一般为带水印的小图，如公安网小图 CERT表示证件照片：如拍摄的身份证、工卡、护照、学生证等证件图片
   * 默认LIVE
   */
  options['face_type'] = 'LIVE';
  /**
   * 活体检测控制
   *  NONE: 不进行控制
   *  LOW:较低的活体要求(高通过率 低攻击拒绝率) NORMAL: 一般的活体要求(平衡的攻击拒绝率, 通过率)
   * HIGH: 较高的活体要求(高攻击拒绝率 低通过率) 默认NONE
   */
  options['liveness_control'] = 'LOW';

  // 带参数调用人脸检测
  client
    .detect(image, imageType, options)
    .then(function (result) {
      console.log(JSON.stringify(result));
    })
    .catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
};

//人脸搜索
// 1：N人脸搜索：也称为1：N识别，在指定人脸集合中，找到最相似的人脸；
// 1：N人脸认证：基于uid维度的1：N识别，由于uid已经锁定固定数量的人脸，所以检索范围更聚焦；
const faceSearch = (image, groupIdList, imageType = 'BASE64') => {
  // var image = "取决于image_type参数，传入BASE64字符串或URL字符串或FACE_TOKEN字符串";

  // var imageType = "BASE64";

  // 从指定的group中进行查找 用逗号分隔，上限10个
  // var groupIdList = "3,2";

  // 如果有可选参数
  var options = {};
  /**
   * 匹配阈值（设置阈值后，score低于此阈值的用户信息将不会返回） 最大100 最小0 默认80
此阈值设置得越高，检索速度将会越快，推荐使用默认阈值80
   */
  options['match_threshold'] = '70';

  /**
   * 图片质量控制
   */
  options['quality_control'] = 'NORMAL';

  /**
   * 活体检测控制
   */
  options['liveness_control'] = 'LOW';

  /**
   * 当需要对特定用户进行比对时，指定user_id进行比对。即人脸认证功能。
   */
  // options['user_id'] = '233451';
  /**
   * 查找后返回的用户数量。返回相似度最高的几个用户，默认为1，最多返回50个。
   */
  options['max_user_num'] = '1';

  // 带参数调用人脸搜索
  client
    .search(image, imageType, groupIdList, options)
    .then(function (result) {
      console.log(JSON.stringify(result));
    })
    .catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
};

//人脸搜索 M:N 识别
//待识别的图片中，存在多张人脸的情况下，支持在一个人脸库中，一次请求，同时返回图片中所有人脸的识别结果
const faceMultiSearch = (image, groupIdList, imageType = 'BASE64') => {
  // var image = "取决于image_type参数，传入BASE64字符串或URL字符串或FACE_TOKEN字符串";

  // var imageType = "BASE64";

  // var groupIdList = "3,2";

  // 如果有可选参数
  var options = {};
  /**
 * 最多处理人脸的数目
默认值为1(仅检测图片中面积最大的那个人脸) 最大值10
 */
  options['max_face_num'] = '3';
  options['match_threshold'] = '70';
  options['quality_control'] = 'NORMAL';
  options['liveness_control'] = 'LOW';
  options['max_user_num'] = '1';

  // 带参数调用人脸搜索 M:N 识别
  client
    .multiSearch(image, imageType, groupIdList, options)
    .then(function (result) {
      console.log(JSON.stringify(result));
    })
    .catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
};

module.exports = {
  client,
  HttpClient,
  getUserInfo,
  getUserFaceList,
  getGroupList,
  getGList,
  copyUser,
  faceMultiSearch,
  faceSearch,
  faceDetect,
  addFace,
  updateFace,
  deleteFace,
  createUser,
  deleteGroup,
  deleteUser,
};
