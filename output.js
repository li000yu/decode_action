//Tue Aug 13 2024 14:19:53 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("新东东农场助力");
const jdCookie = require("./jdCookie"),
  notify = require("./utils/Rebels_sendJDNotify"),
  common = require("./utils/Rebels_jdCommon"),
  {
    H5st
  } = require("./utils/Rebels_H"),
  fs = require("fs"),
  CryptoJS = require("crypto-js"),
  querystring = require("querystring"),
  shuffleShareCodes = process.env.JD_XinFarm_mode === "true",
  isNotify = (process.env.JD_XinFarm_notify || process.env.JD_XinFarm_Notify) === "true",
  helparr = (process.env.JD_XinFarm_code || "").split(/[,@\n]+/g).map(_0x52752b => _0x52752b.trim()).filter(Boolean),
  ShareCodesCacheFile = "./XinFarm_ShareCache.json";
let ShareCodesCacheData = [],
  needUpdateShareCodesCache = false;
if (fs.existsSync(ShareCodesCacheFile)) {
  try {
    const fileContent = fs.readFileSync(ShareCodesCacheFile, "utf-8");
    fileContent.trim() === "" ? console.log("缓存文件为空，初始化为空数组") : (ShareCodesCacheData = JSON.parse(fileContent), !Array.isArray(ShareCodesCacheData) && (ShareCodesCacheData = []), console.log("检测到本地缓存文件 XinFarm_ShareCache.json，加载成功"));
  } catch (_0x4e322b) {
    console.error("解析缓存文件时出错:", _0x4e322b);
    ShareCodesCacheData = [];
  }
}
let ShareCodes = [],
  ShareCodesMap = new Map(),
  cookie = "",
  cookiesArr = Object.keys(jdCookie).map(_0x3786dd => jdCookie[_0x3786dd]).filter(_0x5349ce => _0x5349ce);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  console.log("==========" + $.name + "变量开启状态==========");
  console.log("活动入口: [APP-我的-东东农场]");
  console.log("指定助力: [" + (helparr.length > 0 ? "已填写" + helparr.length + "个指定助力码" : "未填写指定助力变量") + "]");
  console.log("助力模式: [" + (shuffleShareCodes ? "随机打乱" : "顺序执行") + "]");
  console.log("代理开关: [" + common.getProxyStatus() + "]");
  console.log("通知推送: [" + (isNotify ? "开启" : "关闭") + "]");
  console.log("==========" + $.name + "变量状态结束==========");
  console.log("");
  notify.config({
    title: $.name
  });
  console.log("【开始】收集[" + cookiesArr.length + "]个账号的助力码：\n");
  $.needRemoveCookieIndex = [];
  for (let _0x403b2b = 0; _0x403b2b < cookiesArr.length; _0x403b2b++) {
    $.index = _0x403b2b + 1;
    cookie = cookiesArr[_0x403b2b];
    common.setCookie(cookie);
    $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
    $.UA = common.genUA($.UserName);
    $.message = notify.create($.index, $.UserName);
    $.nickName = "";
    $.retryTimes = 0;
    $.title = "【账号" + $.index + "】" + $.UserName + "：";
    await getShareCodes();
    common.unsetCookie();
    if ($.runEnd) {
      break;
    }
  }
  if (needUpdateShareCodesCache) {
    let _0x2b2ba4 = JSON.stringify(ShareCodesCacheData, null, 2);
    fs.writeFile(ShareCodesCacheFile, _0x2b2ba4, function (_0x290f2f) {
      _0x290f2f ? (console.log(_0x290f2f), console.log("\n【缓存文件 XinFarm_ShareCache.json 更新失败!】\n")) : console.log("\n【缓存文件 XinFarm_ShareCache.json 更新成功!】\n");
    });
  }
  $.needRemoveCookieIndex.length > 0 && (console.log("\n【检测】删除火爆或者无效账号序号: [" + $.needRemoveCookieIndex.join(", ") + "]"), cookiesArr = cookiesArr.filter((_0x404b0c, _0x8e78aa) => !$.needRemoveCookieIndex.includes(_0x8e78aa + 1)), $.needRemoveCookieIndex = []);
  console.log("\n【查询】本次可助力账号共有[" + cookiesArr.length + "]个");
  if (helparr && helparr.length > 0) {
    let _0x1e817e;
    if (shuffleShareCodes) {
      const _0x37cf51 = ShareCodes.sort(() => 0.5 - Math.random());
      _0x1e817e = [...helparr, ..._0x37cf51];
    } else {
      _0x1e817e = [...helparr, ...ShareCodes];
    }
    const _0x2c6671 = [...new Set(_0x1e817e)];
    ShareCodes = _0x2c6671;
    console.log("【模式】[" + (shuffleShareCodes ? "随机打乱" : "顺序执行") + "]，已指定[" + helparr.length + "]个助力码，共计[" + ShareCodes.length + "]个助力码\n");
    for (let _0x21aa9f = 0; _0x21aa9f < cookiesArr.length; _0x21aa9f++) {
      $.index = _0x21aa9f + 1;
      cookie = cookiesArr[_0x21aa9f];
      common.setCookie(cookie);
      $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
      $.UA = common.genUA($.UserName);
      $.message = notify.create($.index, $.UserName);
      $.nickName = "";
      $.title = "【账号" + $.index + "】" + $.UserName + "：";
      await Main();
      common.unsetCookie();
      if ($.runEnd) {
        break;
      }
      await $.wait(3000);
    }
  } else {
    let _0x18b359;
    if (shuffleShareCodes) {
      const _0x1c7562 = ShareCodes.sort(() => 0.5 - Math.random());
      _0x18b359 = _0x1c7562;
    } else {
      _0x18b359 = ShareCodes;
    }
    const _0x109017 = [...new Set(_0x18b359)];
    ShareCodes = _0x109017;
    console.log("【模式】[" + (shuffleShareCodes ? "随机打乱" : "顺序执行") + "]，共计[" + ShareCodes.length + "]个助力码\n");
    for (let _0x527f2f = 0; _0x527f2f < cookiesArr.length; _0x527f2f++) {
      $.index = _0x527f2f + 1;
      cookie = cookiesArr[_0x527f2f];
      common.setCookie(cookie);
      $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
      $.UA = common.genUA($.UserName);
      $.message = notify.create($.index, $.UserName);
      $.nickName = "";
      $.title = "【账号" + $.index + "】" + $.UserName + "：";
      await Main();
      common.unsetCookie();
      if ($.runEnd) {
        break;
      }
      await $.wait(3000);
    }
  }
  const _0x19906b = notify.getMessage();
  _0x19906b && (console.log("\n📣 运行结果\n" + _0x19906b.replace(/：/g, " ➜ ")), isNotify && (notify.appendContent("\n"), await notify.push()));
})().catch(_0x25137a => $.logErr(_0x25137a)).finally(() => $.done());
async function getShareCodes() {
  try {
    const _0x16af59 = await common.getLoginStatus(cookie);
    if (!_0x16af59 && typeof _0x16af59 === "boolean") {
      console.log($.title + "账号无效");
      $.needRemoveCookieIndex.push($.index);
      return;
    }
    let _0x504f45 = false,
      _0x181f5b = "";
    if (ShareCodesCacheData) {
      for (let _0x5f2f6a = 0; _0x5f2f6a < ShareCodesCacheData.length; _0x5f2f6a++) {
        ShareCodesCacheData[_0x5f2f6a].pt_pin == $.UserName && (_0x504f45 = true, _0x181f5b = ShareCodesCacheData[_0x5f2f6a].ShareCode);
      }
    }
    !_0x504f45 && ($.farm_home = "", await sendRequest("farm_home"), $.farm_home?.["result"]?.["farmHomeShare"]?.["inviteCode"] && (_0x181f5b = $.farm_home?.["result"]?.["farmHomeShare"]?.["inviteCode"], ShareCodesCacheData.push({
      pt_pin: $.UserName,
      ShareCode: _0x181f5b
    }), needUpdateShareCodesCache = true), await $.wait(2000));
    _0x181f5b ? (console.log($.title + "助力码[" + _0x181f5b + "]"), ShareCodesMap.set($.UserName, _0x181f5b), ShareCodes.push(_0x181f5b)) : (console.log($.title + "❌ 获取助力码失败"), $.needRemoveCookieIndex.push($.index));
  } catch (_0xdaf02d) {
    console.log("❌ 脚本运行遇到了错误\n" + _0xdaf02d);
  }
}
async function Main() {
  try {
    const _0x38b9d5 = await common.getLoginStatus(cookie);
    if (!_0x38b9d5 && typeof _0x38b9d5 === "boolean") {
      console.log($.title + "账号无效");
      return;
    }
    $.skipRun = false;
    const _0x4a2bff = [];
    let _0x233d7a = 0;
    const _0x1b4af0 = 1;
    _0x52744e: for (let _0x452990 of ShareCodes) {
      $.code = _0x452990;
      await sendRequest("farm_assist");
      const _0x40db9f = $.farm_assist?.["result"]?.["masterInfo"]?.["nickname"];
      switch ($.farm_assist?.["bizCode"]) {
        case 0:
          console.log($.title + "助力[" + _0x40db9f + "](" + _0x452990 + ")成功 ✅(" + $.farm_assist?.["result"]?.["amount"] + "g💧)");
          break;
        case -4001:
          console.log($.title + "助力[" + _0x40db9f + "](" + _0x452990 + ")失败(" + $.farm_assist?.["bizMsg"] + ")，重试1次");
          await $.wait(3000);
          await sendRequest("farm_assist");
          break;
        case -1001:
          console.log($.title + "助力(" + _0x452990 + ")失败(" + $.farm_assist?.["bizMsg"] + ")，重试");
          await $.wait(3000);
          await sendRequest("farm_assist");
          _0x233d7a++;
          if (_0x233d7a > _0x1b4af0) {
            break _0x52744e;
          }
          break;
        case 5002:
          console.log($.title + "助力失败(不能助力自己)");
          break;
        case 5003:
          console.log($.title + "助力[" + _0x40db9f + "](" + _0x452990 + ")失败(今日已给该好友助力过了)");
          break;
        case 5004:
          console.log($.title + "助力[" + _0x40db9f + "](" + _0x452990 + ")失败(今日助力次数已耗尽)");
          break _0x52744e;
        case 5005:
          console.log($.title + "助力[" + _0x40db9f + "](" + _0x452990 + ")失败(好友助力已满)");
          $.message.insert("(" + _0x452990 + ")助力已满");
          _0x4a2bff.push(_0x452990);
          break;
        default:
          {
            console.log($.title + "助力[" + _0x40db9f + "](" + _0x452990 + ")失败(未知助力结果：" + $.farm_assist?.["bizCode"] + " - " + $.farm_assist?.["bizMsg"] + ")");
            break;
          }
      }
      if ($.skipRun) {
        break;
      }
      await $.wait(2000);
    }
    if (_0x4a2bff.length > 0) {
      for (let _0x713441 of _0x4a2bff) {
        ShareCodes.includes(_0x713441) && ShareCodes.splice(ShareCodes.indexOf(_0x713441), 1);
      }
      console.log("\n【统计】当前还剩[" + ShareCodes.length + "]个助力码\n");
    }
  } catch (_0xd8d0ce) {
    console.log("❌ 脚本运行遇到了错误\n" + _0xd8d0ce);
  }
}
async function handleResponse(_0x4a01ca, _0x58e409) {
  try {
    let _0x27230e = "";
    switch (_0x4a01ca) {
      case "farm_home":
        _0x58e409.code == 0 ? _0x58e409.data?.["bizCode"] === 0 ? $.farm_home = _0x58e409.data : (_0x27230e = common.getErrorMsg(_0x58e409.data), console.log($.title + "农场首页失败：" + _0x27230e)) : (_0x27230e = common.getErrorMsg(_0x58e409), console.log($.title + "农场首页失败：" + _0x27230e));
        break;
      case "farm_assist":
        _0x58e409.code === 0 ? $.farm_assist = _0x58e409.data : (_0x27230e = common.getErrorMsg(_0x58e409), console.log($.title + "助力失败：" + _0x27230e), ["登陆", "失败"].some(_0x1345c0 => _0x27230e.includes(_0x1345c0)) && ($.skipRun = true));
        break;
    }
  } catch (_0x1ddaf4) {
    console.log("❌ 未能正确处理 " + _0x4a01ca + " 请求响应 " + (_0x1ddaf4.message || _0x1ddaf4));
  }
}
async function sendRequest(_0x2100fa) {
  if ($.runEnd) {
    return;
  }
  let _0x365495 = "",
    _0x2566ab = null,
    _0x3ca71d = null,
    _0x2b7172 = "POST",
    _0x3de865 = {},
    _0x13b3eb = {};
  switch (_0x2100fa) {
    case "farm_home":
      _0x13b3eb = {
        appId: "c57f6",
        functionId: "farm_home",
        appid: "signed_wh5",
        clientVersion: common.getLatestAppVersion(),
        client: "apple",
        body: {
          version: 3
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      _0x3de865 = await H5st2.getH5st(_0x13b3eb);
      _0x365495 = "https://api.m.jd.com/client.action";
      _0x2566ab = _0x3de865.paramsData;
      break;
    case "farm_assist":
      _0x13b3eb = {
        appId: "28981",
        functionId: "farm_assist",
        appid: "signed_wh5",
        clientVersion: common.getLatestAppVersion(),
        client: "apple",
        body: {
          version: 3,
          inviteCode: $.code,
          shareChannel: "ttt3",
          assistChannel: ""
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      _0x3de865 = await H5st2.getH5st(_0x13b3eb);
      _0x365495 = "https://api.m.jd.com/client.action";
      _0x2566ab = _0x3de865.paramsData;
      break;
    default:
      console.log("❌ 未知请求 " + _0x2100fa);
      return;
  }
  const _0x52a4ea = {
    osVersion: common.getLatestIOSVersion(),
    rfs: "0000",
    screen: "430*0",
    wqDefault: "false"
  };
  _0x2566ab && Object.assign(_0x2566ab, _0x52a4ea);
  _0x3ca71d && Object.assign(_0x3ca71d, _0x52a4ea);
  const _0x1917e8 = {
    url: _0x365495,
    method: _0x2b7172,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: cookie,
      Host: "api.m.jd.com",
      Referer: "https://h5.m.jd.com/",
      "X-Referer-Page": "https://h5.m.jd.com/pb/015686010/Bc9WX7MpCW7nW9QjZ5N3fFeJXMH/index.html",
      Origin: "https://h5.m.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    params: _0x3ca71d,
    data: _0x2566ab,
    timeout: 30000
  };
  _0x2b7172 === "GET" && (delete _0x1917e8.data, delete _0x1917e8.headers["Content-Type"]);
  const _0x3cbdd6 = 1;
  let _0x33229e = 0,
    _0x55ac19 = null,
    _0x33c08a = false;
  while (_0x33229e < _0x3cbdd6) {
    _0x33229e > 0 && (await $.wait(1000));
    const _0x3865fd = await common.request(_0x1917e8);
    if (!_0x3865fd.success) {
      _0x55ac19 = "🚫 " + _0x2100fa + " 请求失败 ➜ " + _0x3865fd.error;
      _0x33229e++;
      continue;
    }
    if (!_0x3865fd.data) {
      _0x55ac19 = "🚫 " + _0x2100fa + " 请求失败 ➜ 无响应数据";
      _0x33229e++;
      continue;
    }
    await handleResponse(_0x2100fa, _0x3865fd.data);
    _0x33c08a = false;
    break;
  }
  _0x33229e >= _0x3cbdd6 && (console.log(_0x55ac19), _0x33c08a && ($.outFlag = true, $.message && $.message.fix(_0x55ac19)));
}
class H5st42 {
  constructor() {
    this._algoKey = CryptoJS.enc.Utf8.parse("wm0!@w-s#ll1flo(");
    this._ivKey = CryptoJS.enc.Utf8.parse("0102030405060708");
    this._tokenMaps = {
      4.2: {}
    };
    this._algoMaps = {
      4.2: {}
    };
    this._fpMaps = new Map();
    this._latestAppVersionData = {
      build: common.getLatestAppBuildVersion(),
      version: common.getLatestAppVersion()
    };
    this._latestIOSVersion = common.getLatestIOSVersion();
  }
  async getH5st(_0x35a3d5) {
    let _0x484b97 = Object.assign({}, _0x35a3d5, {
      h5st: "",
      params: "",
      paramsData: {}
    });
    try {
      if (!(typeof _0x35a3d5 === "object" && _0x35a3d5 !== null)) {
        console.log("❌ getH5st 传入参数有误");
        return _0x484b97;
      } else {
        const _0x3314f0 = ["appId", "appid", "body", "functionId"],
          _0x4bcd56 = _0x3314f0.filter(_0x2c38ca => !_0x35a3d5[_0x2c38ca]);
        if (_0x4bcd56.length > 0) {
          console.log("❌ getH5st 传入参数有误，缺少必要参数：" + _0x4bcd56.join(", "));
          return _0x484b97;
        }
      }
      _0x35a3d5.version = "4.2";
      const _0x37df82 = this._initParams(_0x35a3d5),
        {
          appid: _0x30ce32,
          body: _0x4b8c77,
          client: _0x390ed0,
          clientVersion: _0x5bd05f,
          functionId: _0x3eb4b6
        } = _0x35a3d5;
      let _0x1b0a14 = "",
        _0x49aa24 = "";
      const _0x1751ee = await this._requestAlgo(_0x37df82);
      _0x1b0a14 = _0x1751ee.token;
      _0x49aa24 = _0x1751ee.algo;
      if (!_0x1b0a14 && !_0x49aa24) {
        return _0x484b97;
      }
      const _0x44d449 = {
        appid: _0x30ce32,
        body: _0x4b8c77,
        client: _0x390ed0,
        clientVersion: _0x5bd05f,
        functionId: _0x3eb4b6,
        t: _0x35a3d5.t
      };
      _0x35a3d5?.["t"] && typeof _0x35a3d5.t === "boolean" ? _0x35a3d5.t = Date.now() : _0x35a3d5.t = "";
      if (!_0x44d449.client) {
        delete _0x44d449.client;
      }
      if (!_0x44d449.clientVersion) {
        delete _0x44d449.clientVersion;
      }
      const _0x4ec815 = this._makeSign(_0x44d449, _0x1b0a14, _0x49aa24, _0x37df82),
        _0x35a405 = {
          functionId: _0x3eb4b6,
          body: JSON.stringify(_0x4b8c77),
          t: "",
          appid: _0x30ce32,
          client: "",
          clientVersion: "",
          h5st: _0x4ec815?.["h5st"] || ""
        };
      for (const _0x4e8a79 of ["t", "client", "clientVersion"]) {
        _0x35a3d5[_0x4e8a79] ? _0x35a405[_0x4e8a79] = _0x35a3d5[_0x4e8a79] : delete _0x35a405[_0x4e8a79];
      }
      Object.assign(_0x484b97, {
        h5st: _0x4ec815?.["h5st"] || "",
        params: querystring.stringify(_0x35a405),
        paramsData: _0x35a405
      });
    } catch (_0x253d1e) {
      console.log("❌ getH5st 遇到了错误 " + (_0x253d1e.message || _0x253d1e));
    }
    return _0x484b97;
  }
  _initParams(_0x5ada4b) {
    const _0x22d98f = {
      version: "",
      appId: _0x5ada4b?.["appId"] || "",
      fv: "",
      fp: "",
      ua: "",
      sua: "",
      av: "",
      url: "",
      og: "",
      referer: _0x5ada4b?.["referer"] || "",
      pin: _0x5ada4b?.["pin"] || "",
      cookie: _0x5ada4b?.["cookie"] || ""
    };
    if (_0x5ada4b?.["ua"]) {
      let _0x4beb35 = _0x5ada4b.ua,
        _0x2f5d85 = _0x4beb35.match(/^[\s\S]*?\(([\s\S]*?)\)/),
        _0x3f03af = _0x4beb35.match(/(?<=\/)[0-9]\.0[^'"\n]+/g);
      _0x2f5d85?.["length"] > 0 && _0x3f03af?.["length"] > 0 && (_0x22d98f.ua = _0x4beb35, _0x22d98f.sua = _0x2f5d85[1], _0x22d98f.av = _0x3f03af[0]);
    }
    if (!_0x22d98f.ua) {
      let _0x1302fa = this._genUA(),
        _0x13af1f = _0x1302fa.match(/^[\s\S]*?\(([\s\S]*?)\)/),
        _0x569948 = _0x1302fa.match(/(?<=\/)[0-9]\.0[^'"\n]+/g);
      _0x13af1f?.["length"] > 0 && _0x569948?.["length"] > 0 && (_0x22d98f.ua = _0x1302fa, _0x22d98f.sua = _0x13af1f[1], _0x22d98f.av = _0x569948[0]);
    }
    _0x22d98f.version = "4.2";
    _0x22d98f.fv = "h5_npm_v4.2.0";
    _0x22d98f.fp = this._fpMaps.get(_0x22d98f.ua) || "";
    !_0x22d98f.fp && (_0x22d98f.fp = this._makeFp(), _0x22d98f.ua.startsWith("jd") && this._fpMaps.set(_0x22d98f.ua, _0x22d98f.fp));
    if (_0x5ada4b?.["url"]) {
      try {
        const _0x2fd316 = new URL(_0x5ada4b.url);
        _0x22d98f.url = _0x2fd316.href;
        _0x22d98f.og = _0x2fd316.origin;
      } catch {}
    }
    return _0x22d98f;
  }
  async _requestAlgo(_0x189c00) {
    try {
      const _0x1abf9b = this._getExpandParamsData(_0x189c00);
      let _0x116fb0 = this._AESEncrypt(JSON.stringify(_0x1abf9b, null, 2), this._algoKey);
      const _0x24f202 = {
          version: _0x189c00.version,
          fp: _0x189c00.fp,
          appId: _0x189c00.appId,
          timestamp: Date.now(),
          platform: "web",
          expandParams: _0x116fb0,
          fv: _0x189c00.fv
        },
        _0xe2cc26 = {
          url: "https://cactus.jd.com/request_algo?g_ty=ajax",
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Origin: "https://cactus.jd.com",
            Host: "cactus.jd.com",
            Accept: "*/*",
            "User-Agent": _0x189c00?.["ua"] || "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/122.0.0.0"
          },
          data: _0x24f202,
          proxy: null,
          timeout: 60000,
          debug: false
        };
      let _0x1c8a51 = 0,
        _0x571f78 = null;
      const _0x2573fc = 1;
      while (_0x1c8a51 < _0x2573fc) {
        const _0xaa5644 = await common.request(_0xe2cc26);
        if (!_0xaa5644.success) {
          _0x571f78 = "❌ getH5st request_algo 请求失败 ➜ " + _0xaa5644.error;
          _0x1c8a51++;
          continue;
        }
        if (!_0xaa5644.data) {
          _0x571f78 = "🚫 getH5st request_algo 请求失败 ➜ 无响应数据";
          _0x1c8a51++;
          continue;
        }
        try {
          const _0x1e468c = _0xaa5644.data;
          if (_0x1e468c?.["data"] && _0x1e468c?.["data"]?.["result"]) {
            const _0x318e42 = _0x1e468c.data.result?.["algo"],
              _0x5daecb = _0x1e468c.data.result?.["tk"];
            if (_0x318e42 && _0x5daecb) {
              return {
                token: _0x5daecb,
                algo: _0x318e42
              };
            }
          }
          _0x571f78 = "🚫 getH5st request_algo 请求异常 ➜ " + JSON.stringify(_0x1e468c);
        } catch (_0x3da5a3) {
          _0x571f78 = "❌ getH5st request_algo 在处理接口响应时遇到了错误 ➜ " + (_0x3da5a3.message || _0x3da5a3);
        }
        _0x1c8a51++;
      }
      _0x1c8a51 >= _0x2573fc && console.log(_0x571f78);
    } catch (_0x5125d2) {
      console.log("❌ getH5st request_algo 在处理API请求时遇到了错误 " + (_0x5125d2.message || _0x5125d2));
    }
    return {
      token: "",
      algo: ""
    };
  }
  _getExpandParamsData(_0x2a303a) {
    return {
      wc: 0,
      wd: 0,
      l: "zh-CN",
      ls: "zh-CN,zh",
      ml: 0,
      pl: 0,
      av: _0x2a303a.av,
      ua: _0x2a303a.ua,
      sua: _0x2a303a.sua,
      pp: _0x2a303a.pin ? {
        p1: _0x2a303a.pin,
        p2: _0x2a303a.pin
      } : {},
      extend: {
        pm: 0,
        wd: 0,
        l: 0,
        ls: 2,
        wk: 0,
        bu1: "9.9.9"
      },
      pp1: _0x2a303a.pin ? "" : _0x2a303a.cookie,
      pm: {
        ps: "prompt",
        np: "default"
      },
      w: 400,
      h: 700,
      ow: 400,
      oh: 700,
      url: _0x2a303a.url,
      og: _0x2a303a.og,
      pr: 1.25,
      re: _0x2a303a.referer,
      random: this._makeRandomStr(10),
      referer: _0x2a303a.referer,
      v: _0x2a303a.fv,
      ai: _0x2a303a.appId,
      fp: _0x2a303a.fp
    };
  }
  _makeSign(_0x28c7b0, _0x147d4a, _0x45c180, _0x17b6f4) {
    try {
      const _0x428286 = _0x17b6f4.version,
        _0x2b9802 = Date.now(),
        _0x1b4606 = new Date(_0x2b9802),
        _0x4e40fa = "" + _0x1b4606.getFullYear() + String(_0x1b4606.getMonth() + 1).padStart(2, "0") + String(_0x1b4606.getDate()).padStart(2, "0") + String(_0x1b4606.getHours()).padStart(2, "0") + String(_0x1b4606.getMinutes()).padStart(2, "0") + String(_0x1b4606.getSeconds()).padStart(2, "0") + String(_0x1b4606.getMilliseconds()).padStart(3, "0");
      let _0x3932f1 = Object.entries(_0x28c7b0).map(([_0x25c9c5, _0x54b5c7]) => {
          _0x25c9c5 === "body" && (_0x54b5c7 = CryptoJS.SHA256(JSON.stringify(_0x54b5c7)).toString());
          return {
            key: _0x25c9c5,
            value: _0x54b5c7
          };
        }),
        _0x2d7025 = "",
        _0x349800 = "";
      const _0x49ba59 = _0x3932f1.map(_0x361af8 => _0x361af8.key + ":" + _0x361af8.value).join("&"),
        _0x2837f1 = new Function("return ".concat(_0x45c180))();
      let _0x4581ee = _0x4e40fa;
      _0x4581ee += "74";
      let _0x3c979c;
      _0x3c979c = _0x2837f1(_0x147d4a, _0x17b6f4.fp, _0x4581ee, _0x17b6f4.appId, CryptoJS).toString() || "";
      _0x2d7025 = CryptoJS.SHA256("".concat(_0x3c979c).concat(_0x49ba59).concat(_0x3c979c)).toString();
      let _0xe48726 = {};
      _0xe48726 = {
        sua: _0x17b6f4.sua,
        pp: _0x17b6f4.pin ? {
          p1: _0x17b6f4.pin,
          p2: _0x17b6f4.pin
        } : {},
        extend: {
          pm: 0,
          wd: 0,
          l: 0,
          ls: 2,
          wk: 0,
          bu1: "9.9.9"
        },
        random: this._makeRandomStr(10),
        referer: _0x17b6f4.referer,
        v: _0x17b6f4.fv,
        fp: _0x17b6f4.fp
      };
      _0x349800 = this._AESEncrypt(JSON.stringify(_0xe48726, null, 2), CryptoJS.enc.Utf8.parse("DNiHi703B0&17hh1"));
      const _0x156159 = ["".concat(_0x4e40fa), "".concat(_0x17b6f4.fp), "".concat(_0x17b6f4.appId), "".concat(_0x147d4a), "".concat(_0x2d7025), "".concat(_0x428286), "".concat(_0x2b9802), "".concat(_0x349800)].join(";");
      return {
        _stk: _0x3932f1.map(_0x1d8c2b => _0x1d8c2b.key).join(","),
        _ste: 1,
        h5st: _0x156159
      };
    } catch (_0x240762) {
      console.log("❌ getH5st 生成签名时遇到了错误 " + (_0x240762.message || _0x240762));
    }
    return {
      _stk: "",
      _ste: 0,
      h5st: ""
    };
  }
  _AESEncrypt(_0x902d60, _0x389769) {
    const _0x36e0f4 = CryptoJS.enc.Utf8.parse(_0x902d60),
      _0x150b19 = CryptoJS.AES.encrypt(_0x36e0f4, _0x389769, {
        iv: this._ivKey,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    return CryptoJS.enc.Hex.stringify(CryptoJS.enc.Base64.parse(_0x150b19.toString()));
  }
  _makeRandomStr(_0x2be57d = 32, _0x4240e7 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-") {
    const _0x381887 = _0x4240e7.length;
    let _0x2bfcf9 = "";
    for (let _0x4f235a = 0; _0x4f235a < _0x2be57d; _0x4f235a++) {
      _0x2bfcf9 += _0x4240e7.charAt(Math.floor(Math.random() * _0x381887));
    }
    return _0x2bfcf9;
  }
  _genUA() {
    function _0x39825b(_0x1b941c = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", _0x5cb6aa = "0123456789abcdef") {
      let _0x19cddf = "";
      for (let _0x343bfb of _0x1b941c) {
        if (_0x343bfb == "x") {
          _0x19cddf += _0x5cb6aa.charAt(Math.floor(Math.random() * _0x5cb6aa.length));
        } else {
          _0x343bfb == "X" ? _0x19cddf += _0x5cb6aa.charAt(Math.floor(Math.random() * _0x5cb6aa.length)).toUpperCase() : _0x19cddf += _0x343bfb;
        }
      }
      return _0x19cddf;
    }
    const _0x2166e2 = _0x39825b(),
      _0x4fc2f0 = ["jdapp", "iPhone", this._latestAppVersionData.version, "", "rn/" + _0x2166e2, "M/5.0", "appBuild/" + this._latestAppVersionData.build, "jdSupportDarkMode/0", "ef/1", "ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22DG%3D%3D%22%2C%22sv%22%3A%22CG%3D%3D%22%2C%22iad%22%3A%22%22%7D%2C%22ts%22%3A" + Math.floor(Date.now() / 1000) + "%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D", "Mozilla/5.0 (iPhone; CPU iPhone OS " + this._latestIOSVersion.replace(".", "_") + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""],
      _0x35474a = _0x4fc2f0.join(";");
    return _0x35474a;
  }
  _makeFp() {
    function _0x3252dd(_0xd03e4b, _0x33d354) {
      return _0xd03e4b + Math.floor(Math.random() * (_0x33d354 + 1 - _0xd03e4b));
    }
    function _0x52a08a(_0x39182c, _0xde5585) {
      for (var _0x37f88e = [], _0x50472f = 0; _0x50472f < _0x39182c.length; _0x50472f++) {
        var _0x834a69 = _0x39182c[_0x50472f];
        if (_0x3252dd(0, _0x39182c.length - _0x50472f - 1) < _0xde5585 - _0x37f88e.length && (_0x37f88e.push(_0x834a69), _0x37f88e.length == _0xde5585)) {
          break;
        }
      }
      for (var _0x452343 = "", _0x388f6e = 0; _0x388f6e < _0x37f88e.length; _0x388f6e += 1) {
        var _0x3f6944 = Math.random() * (_0x37f88e.length - _0x388f6e) | 0;
        _0x452343 += _0x37f88e[_0x3f6944];
        _0x37f88e[_0x3f6944] = _0x37f88e[_0x37f88e.length - _0x388f6e - 1];
      }
      return _0x452343;
    }
    function _0xfe1d08(_0x16e850, _0x261ad3) {
      for (var _0x3ce851 = 0; _0x3ce851 < _0x261ad3.length; _0x3ce851 += 1) {
        var _0x5f43e0 = _0x16e850.indexOf(_0x261ad3[_0x3ce851]);
        -1 !== _0x5f43e0 && (_0x16e850 = _0x16e850.replace(_0x261ad3[_0x3ce851], ""));
      }
      return _0x16e850;
    }
    var _0x418941 = "6d0jhqw3pa",
      _0x4ea97d = _0x52a08a(_0x418941, 4),
      _0x3e4cc1 = _0x3252dd(0, 9),
      _0x2a7b4c = _0xfe1d08(_0x418941, _0x4ea97d),
      _0x227e21 = {
        size: _0x3e4cc1,
        num: _0x2a7b4c
      };
    var _0x3252dd = this._makeRandomStr(_0x227e21.size, _0x227e21.num) + _0x4ea97d + this._makeRandomStr(12 - _0x3e4cc1 - 1, _0x2a7b4c) + _0x3e4cc1,
      _0x7f7c28 = _0x3252dd.split(""),
      _0x521279 = _0x7f7c28.slice(0, 14),
      _0x1a07c8 = _0x7f7c28.slice(14),
      _0x18036b = [];
    while (_0x521279.length > 0) {
      _0x18036b.push((35 - parseInt(_0x521279.pop(), 36)).toString(36));
    }
    _0x18036b = _0x18036b.concat(_0x1a07c8);
    return _0x18036b.join("");
  }
}
const H5st2 = new H5st42();
function Env(t, e) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      "POST" === e && (s = this.post);
      return new Promise((e, i) => {
        s.call(this, t, (t, s, r) => {
          t ? i(t) : e(s);
        });
      });
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, "POST");
    }
  }
  return new class {
    constructor(t, e) {
      this.name = t;
      this.http = new s(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, e);
      this.log("", `🔔${this.name}, 开始!`);
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      const i = this.getdata(t);
      if (i) {
        try {
          s = JSON.parse(this.getdata(t));
        } catch {}
      }
      return s;
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e);
      } catch {
        return !1;
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, i) => e(i));
      });
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20;
        r = e && e.timeout ? e.timeout : r;
        const [o, h] = i.split("@"),
          n = {
            url: `http://${h}/v1/scripting/evaluate`,
            body: {
              script_text: t,
              mock_type: "cron",
              timeout: r
            },
            headers: {
              "X-Key": o,
              Accept: "*/*"
            }
          };
        this.post(n, (t, e, i) => s(i));
      }).catch(t => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) {
          return {};
        }
        {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          r = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r);
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i) if (r = Object(r)[t], void 0 === r) {
        return s;
      }
      return r;
    }
    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t);
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
          r = s ? this.getval(s) : "";
        if (r) {
          try {
            const t = JSON.parse(r);
            e = t ? this.lodash_get(t, i, "") : e;
          } catch (t) {
            e = "";
          }
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
          o = this.getval(i),
          h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const e = JSON.parse(h);
          this.lodash_set(e, r, t);
          s = this.setval(JSON.stringify(e), i);
        } catch (e) {
          const o = {};
          this.lodash_set(o, r, t);
          s = this.setval(JSON.stringify(o), i);
        }
      } else {
        s = this.setval(t, e);
      }
      return s;
    }
    getval(t) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null;
    }
    setval(t, e) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null;
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
    }
    get(t, e = () => {}) {
      t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status);
        e(t, s, i);
      })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
        try {
          if (t.headers["set-cookie"]) {
            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            s && this.ckjar.setCookieSync(s, null);
            e.cookieJar = this.ckjar;
          }
        } catch (t) {
          this.logErr(t);
        }
      }).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => {
        const {
          message: s,
          response: i
        } = t;
        e(s, i, i && i.body);
      }));
    }
    post(t, e = () => {}) {
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) {
        this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
          "X-Surge-Skip-Scripting": !1
        }));
        $httpClient.post(t, (t, s, i) => {
          !t && s && (s.body = i, s.statusCode = s.status);
          e(t, s, i);
        });
      } else {
        if (this.isQuanX()) {
          t.method = "POST";
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            const {
              statusCode: s,
              statusCode: i,
              headers: r,
              body: o
            } = t;
            e(null, {
              status: s,
              statusCode: i,
              headers: r,
              body: o
            }, o);
          }, t => e(t));
        } else {
          if (this.isNode()) {
            this.initGotEnv(t);
            const {
              url: s,
              ...i
            } = t;
            this.got.post(s, i).then(t => {
              const {
                statusCode: s,
                statusCode: i,
                headers: r,
                body: o
              } = t;
              e(null, {
                status: s,
                statusCode: i,
                headers: r,
                body: o
              }, o);
            }, t => {
              const {
                message: s,
                response: i
              } = t;
              e(s, i, i && i.body);
            });
          }
        }
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let i = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
      return t;
    }
    msg(e = t, s = "", i = "", r) {
      const o = t => {
        if (!t) {
          return t;
        }
        if ("string" == typeof t) {
          return this.isLoon() ? t : this.isQuanX() ? {
            "open-url": t
          } : this.isSurge() ? {
            url: t
          } : void 0;
        }
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let e = t.openUrl || t.url || t["open-url"],
              s = t.mediaUrl || t["media-url"];
            return {
              openUrl: e,
              mediaUrl: s
            };
          }
          if (this.isQuanX()) {
            let e = t["open-url"] || t.url || t.openUrl,
              s = t["media-url"] || t.mediaUrl;
            return {
              "open-url": e,
              "media-url": s
            };
          }
          if (this.isSurge()) {
            let e = t.url || t.openUrl || t["open-url"];
            return {
              url: e
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
        let t = ["", "==============📣系统通知📣=============="];
        t.push(e);
        s && t.push(s);
        i && t.push(i);
        console.log(t.join("\n"));
        this.logs = this.logs.concat(t);
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]);
      console.log(t.join(this.logSeparator));
    }
    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t);
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t));
    }
    done(t = {}) {
      const e = new Date().getTime(),
        s = (e - this.startTime) / 1000;
      this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`);
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
    }
  }(t, e);
}