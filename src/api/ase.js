import CryptoJS from 'crypto-js'
import $C from './config'
// 默认的 KEY 与 iv 如果没有给
const KEY = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_MODE === 'production' ? $C.proAesKey : $C.devAesKey); //""中与后台一样  密码
const IV = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_MODE === 'production' ? $C.proAesIv : $C.devAesIv); //""中与后台一样



/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function Encrypt (word, keyStr, ivStr) {

  let key = KEY
  let iv = IV

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
    // iv = (ivStr);
  }

  CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(word, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  // console.log("-=-=-=-", encrypted.ciphertext)
  return CryptoJS.enc.Hex.stringify(encrypted.ciphertext);
}

/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 */
export function Decrypt (word, keyStr, ivStr) {
  let key = KEY
  let iv = IV
  // 最新加密
  if (!word || typeof word !== 'string') return
  // console.log('word->' + word);
  //如果加密返回的base64Str
  var srcs = word;
  //若上面加密返回的hexStr,需打开下面两行注释，再次处理
  var encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  var decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  var value = decryptedStr.toString();
  // console.log(value);
  var resultObj = getRealJsonData(value); //直接放要解析的json字符串
  // console.log(data);
  // var newResponseString = value.replace(/\"id\":(\d+)/g, '"id":"$1"');
  // var newResponseString = newResponseString.replace(/\"userId\":(\d+)/g, '"userId":"$1"');
  // var newResponseString = newResponseString.replace(/\"positionId\":(\d+)/g, '"positionId":"$1"');
  // var newResponseString = newResponseString.replace(/\"workWay\":(\d+)/g, '"workWay":"$1"');
  // var newResponseString = newResponseString.replace(/\"ifTax\":(\d+)/g, '"ifTax":"$1"');
  // var newResponseString = newResponseString.replace(/\"houseType\":(\d+)/g, '"houseType":"$1"');
  // var newResponseString = newResponseString.replace(/\"operatingState\":(\d+)/g, '"operatingState":"$1"');
  // var newResponseString = newResponseString.replace(/\"renovation\":(\d+)/g, '"renovation":"$1"');
  // var newResponseString = newResponseString.replace(/\"carsType\":(\d+)/g, '"carsType":"$1"');
  // var newResponseString = newResponseString.replace(/\"color\":(\d+)/g, '"color":"$1"');
  // var newResponseString = newResponseString.replace(/\"goodsType\":(\d+)/g, '"goodsType":"$1"');
  // var newResponseString = newResponseString.replace(/\"categoryId\":(\d+)/g, '"categoryId":"$1"');
  // var newResponseString = newResponseString.replace(/\"belongId\":(\d+)/g, '"belongId":"$1"');
  // var resultObj = JSON.parse(newResponseString)
  // console.log('value->' + value);
  return resultObj;



  // 最新AES加密 end

  // let key = KEY
  // let iv = IV

  // if (keyStr) {
  // 	key = CryptoJS.enc.Utf8.parse(keyStr);
  // 	iv = CryptoJS.enc.Utf8.parse(ivStr);
  // }

  // let hexStr = CryptoJS.enc.Hex.parse(word);
  // let src = CryptoJS.enc.Base64.stringify(hexStr);

  // var decrypt = CryptoJS.AES.decrypt(src, key, {
  // 	iv: iv,
  // 	mode: CryptoJS.mode.CBC,
  // 	padding: CryptoJS.pad.Pkcs7
  // });

  // // var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  // var decryptedStr = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
  // return decryptedStr;
}
//主入口
function getRealJsonData (baseStr) {
  if (!baseStr || typeof baseStr != 'string') return;
  var jsonData = null;
  try {
    jsonData = JSON.parse(baseStr);
  } catch (err) {
    return null;
  }
  var needReplaceStrs = [];
  loopFindArrOrObj(jsonData, needReplaceStrs);
  needReplaceStrs.forEach(function (replaceInfo) {
    // eslint-disable-next-line
    var matchArr = baseStr.match(eval('/"' + replaceInfo.key + '":[0-9]{15,}/'));
    if (matchArr) {
      var str = matchArr[0];
      var replaceStr = str.replace('"' + replaceInfo.key + '":', '"' + replaceInfo.key + '":"');
      replaceStr += '"';
      baseStr = baseStr.replace(str, replaceStr);
    }
  });
  var returnJson = null;
  try {
    returnJson = JSON.parse(baseStr);
  } catch (err) {
    return null;
  }
  return returnJson;

}

//遍历对象类型的
function getNeedRpStrByObj (obj, needReplaceStrs) {
  for (var key in obj) {
    var value = obj[key];
    if (typeof value == 'number' && value > 9007199254740992) {
      needReplaceStrs.push({
        key: key
      });
    }
    loopFindArrOrObj(value, needReplaceStrs);
  }
}

//遍历数组类型的
function getNeedRpStrByArr (arr, needReplaceStrs) {
  for (var i = 0; i < arr.length; i++) {
    var value = arr[i];
    loopFindArrOrObj(value, needReplaceStrs);
  }
}

//递归遍历
function loopFindArrOrObj (value, needRpStrArr) {
  var valueTypeof = Object.prototype.toString.call(value);
  if (valueTypeof === '[object Object]') {
    needRpStrArr.concat(getNeedRpStrByObj(value, needRpStrArr));
  }
  if (valueTypeof === '[object Array]') {
    needRpStrArr.concat(getNeedRpStrByArr(value, needRpStrArr));
  }
}

// //使用：
