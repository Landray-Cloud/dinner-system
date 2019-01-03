const jsonWebToken = require('jsonWebToken')
const SECRET = 'Leonardo'

let Util = {
  ajaxHost: '//test.ywork.me/node/dinner/',
  // ajaxHost: 'http://localhost:3001/node/dinner/',
  // 转码
  setToken: userName => {
    return jsonWebToken.sign({ userName }, SECRET)
  },
  // 解码
  getToken: token => {
    if (!token) return false
    return jsonWebToken.verify(token, SECRET)
  },
  // 转换日期
  Format: (timeObj, fmt) => {
    var o = {
      'M+': timeObj.getMonth() + 1, //月份
      'd+': timeObj.getDate(), //日
      'h+': timeObj.getHours(), //小时
      'm+': timeObj.getMinutes(), //分
      's+': timeObj.getSeconds(), //秒
      'q+': Math.floor((timeObj.getMonth() + 3) / 3), //季度
      'S': timeObj.getMilliseconds() //毫秒
    }

    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (timeObj.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    return fmt;
  },
  // 转换星期
  getWeek: (val) => {
    let text = '获取数据失败';
    switch (val) {
      case 1:
        text = '星期一';
        break;
      case 2:
        text = '星期二';
        break;
      case 3:
        text = '星期三';
        break;
      case 4:
        text = '星期四';
        break;
      case 5:
        text = '星期五';
        break;
      case 6:
        text = '星期六';
        break;
      case 7:
        text = '星期日';
        break;
      default:
        text = '获取数据失败';
        break;
    }
    return text;
  },
  // 转换日期格式
  getDate: (val, fm) => {
    val = Number(val);
    if (val) {
      return Util.Format(new Date(val), fm);
    }
  },
  // 统一成功回调验证(不检查data)
  commAjaxNoDataCB: res => {
    if (typeof res === 'undefined' || res === null) {
      VM.$message.error('集合返回失败，请联系管理员');
      return false;
    }

    let auth = res.auth;
    if (typeof auth !== 'undefined' && Number(auth) == 0) {
      VM.$router.push({ name: 'Login' });
      return false;
    }

    let errcode = res.errcode;
    if (typeof errcode === 'undefined' || errcode === null || errcode !== 0) {
      let toastMsg = '系统繁忙',
        errmsg = res.errmsg;

      if (typeof errmsg !== 'undefined' && errmsg !== null && errmsg !== '') {
        toastMsg = errmsg;
      }

      if (typeof errcode === 'number') {
        toastMsg += '，返回码：' + errcode;
      }

      VM.$message.error(toastMsg);
      return false;
    }
    return true;
  },

  // 统一成功回调验证
  commAjaxCB: res => {
    if (!Util.commAjaxNoDataCB(res)) return false;

    let data = res.data;
    if (typeof data === 'undefined' || data === null) {
      VM.$message.error('返回数据有误');
      return false;
    }
    return true;
  },
  // 转换点餐状态码
  filterOrderStatus: orderStatus => {
    let text = '返回数据失败'
    switch (orderStatus) {
      case 1:
        text = '加班订餐';
        break;
      case 2:
        text = "加班不订餐";
        break;
      case 3:
        text = "不加班不订餐";
        break;
      case 4:
        text = "不加班订餐";
        break;
      case '':
        text = "获取失败";
        break;
      default:
        text = "获取失败"
        break;
    }
    return text
  },
  // 正则 不能输入字母和数字
  checkNum(val) {
    var regx = /^[A-Za-z0-9]*$/;
    if (regx.test(val)) {
      return true;
    } else {
      return false;
    }
  },
  // 判断姓名是否合法
  showUserForm: userName => {
    let msg = '乖！输入你的真实姓名好不好?'
    if (userName === '' || userName === null) {
      VM.$message.error(msg)
      return false
    }

    if (Util.checkNum(userName)) {
      VM.$message.error(msg)
      return false
    }

    if (userName.length > 4) {
      VM.$message.error(msg)
      return false
    }
    return true
  }

}
export default Util;
