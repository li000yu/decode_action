//Fri Aug 23 2024 14:30:00 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("带图评价晒单");
const _0x17264d = $.isNode() ? require("./sendNotify") : "",
  _0x509252 = $.isNode() ? require("./jdCookie.js") : "",
  _0x130ea4 = require("./function/dylanx"),
  _0x199084 = require("./USER_AGENTS"),
  _0x2f40a0 = require("got");
console.log("老青龙版本，sharp依赖请安装0.32.6之前版本\n");
const _0x366199 = require("sharp");
if (process.env.DY_PROXY) {
  try {
    require("https-proxy-agent");
    ccc = require("./function/proxy.js");
    $.dget = ccc.intoRequest($.get.bind($));
    $.dpost = ccc.intoRequest($.post.bind($));
  } catch {
    $.log("未安装https-proxy-agent依赖，无法启用代理");
    $.dget = $.get;
    $.dpost = $.post;
  }
} else {
  $.dpost = $.post;
  $.dget = $.get;
}
let _0x2242a9 = [],
  _0x12536a = "";
if ($.isNode()) {
  var _0x873c30 = new Buffer.from("64796C616E", "Hex").toString("utf8");
  Object.keys(_0x509252).forEach(_0x576a51 => {
    _0x2242a9.push(_0x509252[_0x576a51]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  let _0x209825 = $.getdata("CookiesJD") || "[]";
  _0x209825 = jsonParse(_0x209825);
  _0x2242a9 = _0x209825.map(_0x12560b => _0x12560b.cookie);
  _0x2242a9.reverse();
  _0x2242a9.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
  _0x2242a9.reverse();
  _0x2242a9 = _0x2242a9.filter(_0xfec000 => _0xfec000 !== "" && _0xfec000 !== null && _0xfec000 !== undefined);
}
if (process.env.DY_PROXY) {
  const _0x49d8c4 = require("./function/proxy.js");
  $.get = _0x49d8c4.intoRequest($.get.bind($));
  $.post = _0x49d8c4.intoRequest($.post.bind($));
}
const _0x14382a = process.env.EVALNUM ? process.env.EVALNUM : undefined;
let _0x491f76 = process.env.EVAL_WORD_COUNT ?? 10,
  _0x207998 = process.env.ONEVAL ?? false,
  _0x45d030 = process.env.EVAL_CPKEY ? process.env.EVAL_CPKEY : "",
  _0x102bb3 = ["垃圾", "质量差", "差评", "好差", "欺骗"],
  _0xbd92e6 = ["非常满意的购物体验！商品质量很好，价格实惠。物流迅速，包装严密。非常感谢商家的耐心解答和及时发货，给予8分好评。", "商品质量非常好，价格实惠，物流速度很快。包装完好，没有损坏。非常感谢商家的耐心解答和热情服务，下次还会再来购买。", "这是一次愉快的购物体验，商品质量非常好，价格也很实惠。物流速度快，包装严密。非常感谢商家的耐心服务和及时回复，给予8分好评。", "商品收到了，非常满意！质量可以，价格也还合理。感谢商家客服的热情服务和及时发货，好的话会推荐给朋友们。", "这次购物真是太棒了！商品质量很好，与描述一致。包装仔细，没有损坏。非常感谢商家的认真态度和及时发货，下次还会再来购买。", "质量非常好,与卖家描述的完全一致,真的很喜欢,完全超出期望值,发货速度非常快,物流公司服务态度很好,运送速度很快,店主态度特好,很好很好!质量好而价低廉，很热情的客服，下次还来祝你生意兴隆质量非常好，出乎我的意料包装非常仔细。", "我为什么喜欢在京东买东西，因为今天买明天就可以送到。我为什么每个商品的评价都一样，因为在京东买的东西太多太多了，导致积累了很多未评价的订单，所以我统一用段话作为评价内容。京东购物这么久，有买到很好的产品，也有买到比较坑的产品，如果我用这段话来评价，说明这款产品没问题，至少85分以上，而比较垃圾的产品，我绝对不会偷懒到复制粘贴评价，我绝对会用心的差评，这样其他消费者在购买的时候会作为参考，会影响该商品销量，而商家也会因此改进商品质量。", "感觉物超所值 服务态度还是可以的，没什么太多可挑剔的，再接再厉，祝老板生意兴隆", "这是一条好评段子，花钱的评价，麻烦你们认真点!先说商品质量：产品总体不错，包装严实。再说商家服务：点赞啦。最后点评快递：发货很快。其他就是感谢店家打折送券活动，毕竟便宜好货更实在。希望店家多多优惠，及时通知老客户，促成回购。祝生意兴隆。", "滴滴滴，我来汇报了，东西还行，客服节能有待提高哈，一贯好评啦，快递是真的快，后面再来追评吧，就这样"],
  _0x421fa5 = ["赠品", "权益", "非实物", "非卖品", "增值服务", "服务", "券包", "只换不修"],
  _0x4817e3 = ["送的没花钱哈哈", "东西还还不错", "现在的购物体验越来越好", "以前还没有这么多贴心的赠品、增值服务、权益等服务", "给赞", "算不算白嫖"],
  _0x405946 = ["以上是我购物感受和体验，仅供参考，也不要只看好评，适合我的不一定适合你。。。。", "总的来说，还可以，我的评价供大家参考借鉴，根据自己情况。。。。", "总之还行，买不了吃亏，买的了上当，嘿嘿！！！！", "就这样，一惯好评啦，不是非常烂一般不会差评", "最后，希望京东越来越好，感恩"],
  _0x31e615 = [],
  _0x553931 = "",
  _0x4ae431 = true;
!__filename.includes(_0x873c30) && (_0x4ae431 = false);
!(async () => {
  if (!_0x2242a9[0]) {
    const _0x9327ff = {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    };
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x9327ff);
    return;
  }
  console.log("当前版本：20240822 fix");
  console.log("每次运行最多20个账号(变量EVALNUM调整)，每个账号最多评价10个商品");
  console.log("差评关键词变量 EVAL_CPKEY='xxx&yyy' 多个&连接");
  console.log("问题反馈：https://t.me/dylan_jdpro");
  if (_0x207998 === false) {
    console.log("\n\n默认不执行, 请设置变量 ONEVAL='true'");
    return;
  }
  if (_0x45d030 != "") {
    console.log("\n合并自定义差评内容关键词");
    _0x45d030.includes("&") ? _0x102bb3 = _0x102bb3.concat(_0x45d030.split("&")) : _0x102bb3.push(_0x45d030);
    _0x102bb3 = [...new Set(_0x102bb3)];
  }
  console.log("\n屏蔽差评内容关键词：" + JSON.stringify(_0x102bb3));
  let _0x2f6a76 = 0;
  _0x2242a9.length > 20 ? _0x2f6a76 = _0x14382a ?? 20 : _0x2f6a76 = _0x2242a9.length;
  await _0x2f212e();
  _0x553931 == "" && (_0x553931 = "getbody4");
  for (let _0x463af1 = 0; _0x463af1 < _0x2f6a76; _0x463af1++) {
    if (_0x2242a9[_0x463af1]) {
      _0x12536a = _0x2242a9[_0x463af1];
      $.UserName = decodeURIComponent(_0x12536a.match(/pt_pin=([^; ]+)(?=;?)/) && _0x12536a.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x463af1 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.commentWareList = "";
      $.commentInfoList = "";
      $.level = "3";
      $.score = "1555";
      $.UA = _0x199084.UARAM ? _0x199084.UARAM(1) : _0x199084.USER_AGENT;
      $.UA = "okhttp/3.12.16;jdmall;android;version/12.4.2;build/99108;";
      await _0x3f4144();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0x17264d.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await _0x5e5716();
      console.log("\n等待5秒...");
      await $.wait(5000);
    }
  }
})().catch(_0x431ebc => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x431ebc + "!", "");
}).finally(() => {
  $.done();
});
async function _0x5e5716() {
  try {
    $.commentWareList = [];
    $.caidanList = [];
    await _0x546cc6();
    if (!$.maxPage) {
      console.log("获取待评价数据失败");
      return;
    }
    $.maxPage > 1 && (await $.wait(2000), await _0x546cc6($.maxPage), $.commentWareList.length == 0 && (await _0x546cc6($.maxPage - 1)));
    await $.wait(1000);
    console.log("当前有" + Number($.sdnum) + "个待评价晒单，开始评价最后一页的" + $.commentWareList.length + "个商品...");
    for (let _0x1fa44a of $.commentWareList.reverse()) {
      let _0x174149 = [],
        _0x45aa5b = [],
        _0x4d48bb = "",
        _0x1eef50 = [],
        _0x49a420 = [];
      _0x31e615 = [];
      $.log("\n去评价 👉 " + _0x1fa44a.wname);
      if (_0x1fa44a.commentRewardStatus == "1") {
        await _0x53c680(_0x1fa44a.orderId, _0x1fa44a.wareId);
        console.log($.rewardInfo);
        console.log("要求至少" + $.wnezi + "字," + $.saitu + "图");
      } else {
        _0x1fa44a.estJingBean > 0 && $.log("评价完成最多可得 " + _0x1fa44a.estJingBean + " 豆 🥔");
      }
      if (_0x421fa5.filter(_0x22d624 => _0x1fa44a.wname.includes(_0x22d624)).length == 0) {
        console.log("\n开始获取商品好评和图片...");
        await $.wait(2000);
        $.maxPage = 0;
        try {
          await _0x4d8893(_0x1fa44a.wareId);
          $.maxPage > 1 && (await $.wait(1000), await _0x4d8893(_0x1fa44a.wareId, Math.floor(Math.random() * Math.min.apply(null, [$.maxPage, 10]) + 2)));
        } catch {
          console.log("获取商品评价信息失败！！！");
        }
        for (const _0x1cede4 of _0x31e615) {
          if (_0x1cede4.commentInfo.pictureInfoList) {
            for (const _0x24a3a3 of _0x1cede4.commentInfo.pictureInfoList || {}) {
              if (_0x24a3a3.mediaType != "2") {
                let _0x4f2f69 = "";
                if (_0x24a3a3.picURL.indexOf("dpg") !== -1) {
                  _0x4f2f69 = _0x24a3a3.picURL.replace(/s[0-9]{3}x[0-9]{3}_(.*).dpg/g, "$1");
                } else {
                  if (_0x24a3a3.picURL.indexOf("webp") !== -1) {
                    _0x4f2f69 = _0x24a3a3.picURL.replace(/s[0-9]{3}x[0-9]{3}_(.*).webp/g, "$1");
                  } else {
                    if (_0x24a3a3.picURL.indexOf("avif") !== -1) {
                      _0x4f2f69 = _0x24a3a3.picURL.replace(/s[0-9]{3}x[0-9]{3}_(.*).avif/g, "$1");
                    }
                  }
                }
                _0x4f2f69 != "" && _0x174149.push(_0x4f2f69);
              }
            }
          }
          if (_0x1cede4.commentInfo.commentScore === "5" && _0x1cede4.commentInfo.commentData.length > _0x491f76) {
            _0x45aa5b.push(_0x1cede4.commentInfo.commentData);
          }
        }
        for (let _0x561854 of _0x102bb3) {
          _0x45aa5b = _0x45aa5b.filter(_0x37a42e => !_0x37a42e.includes(_0x561854));
        }
        if (_0x45aa5b.length > 2) {
          _0x4d48bb = _0xa4d17a(_0x45aa5b);
        } else {
          _0x4d48bb = _0xa4d17a(_0xbd92e6);
        }
        if (_0x174149.length >= 2) {
          let _0xa62c07 = _0x56415d(_0x174149, 2);
          _0x1eef50 = _0xa62c07.slice(0, _0xa62c07.length).map(_0x5a645e => ({
            picUrl: _0x5a645e
          }));
        }
      } else {
        console.log("赠品权益，只发布文字评价");
        _0x4d48bb += _0x1ec314(_0x4817e3);
      }
      _0x4d48bb = _0x4d48bb.replace(/\*/gi, "");
      _0x4d48bb.length < 60 && (_0x4d48bb += " " + _0xa4d17a(_0x405946));
      if (_0x1fa44a.commentRewardStatus == "1") {
        _0x4d48bb.length < Number($.wnezi) && (_0x4d48bb += " " + _0xa4d17a(_0x405946));
        _0x4d48bb.length < Number($.wnezi) && (_0x4d48bb += " 好评了，好评了，好评了，好评了，好评了，好评了，好评了，好评了，好评了，好评了，好评了，好评了，好评了，好评了");
        let _0x1d1da2 = _0x56415d(_0x174149, Math.max(2, Number($.saitu)));
        _0x1eef50 = _0x1d1da2.slice(0, _0x1d1da2.length).map(_0x316d77 => ({
          picUrl: _0x316d77
        }));
      }
      if (_0x1eef50.length > 0) {
        for (let _0x3ea344 of _0x1eef50) {
          let _0x4cad71 = await _0x5e4881(_0x3ea344.picUrl);
          _0x4cad71 = await _0x54089a(_0x4cad71);
          _0x4cad71.code == 0 ? _0x49a420.push({
            picUrl: _0x4cad71.url.replace(/.*shaidan\/(.*)/g, "$1")
          }) : console.log("图片获取失败！");
          await $.wait(2000);
        }
      }
      if (_0x49a420.length != 0 && _0x45aa5b.length > 2) {
        console.log("成功获取到图片和好评内容，去发布✍️✍️✍️...\n");
        const _0x3f7611 = {
          mediasExt: "[{\"VideoIsEditCover\":\"0\",\"ImagePropId\":\"0\",\"ImageTakePhotoFilterId\":\"0\",\"ImageIsCrop\":\"0\",\"VideoIsEditCrop\":\"0\",\"VideoEditFilterId\":\"0\",\"VideoMusicId\":\"0\",\"ImageEditFilterId\":\"0\",\"VideoPropId\":\"0\",\"TakeRate\":\"0\",\"VideoRecordIsMakup\":\"0\",\"ImageTakePhotoIsMakup\":\"0\",\"VideoRecordFilterId\":\"0\",\"ImageFontId\":\"0\",\"FromType\":\"1\",\"ImageStrickId\":\"0\"},{\"VideoIsEditCover\":\"0\",\"ImagePropId\":\"0\",\"ImageTakePhotoFilterId\":\"0\",\"ImageIsCrop\":\"0\",\"VideoIsEditCrop\":\"0\",\"VideoEditFilterId\":\"0\",\"VideoMusicId\":\"0\",\"ImageEditFilterId\":\"0\",\"VideoPropId\":\"0\",\"TakeRate\":\"0\",\"VideoRecordIsMakup\":\"0\",\"ImageTakePhotoIsMakup\":\"0\",\"VideoRecordFilterId\":\"0\",\"ImageFontId\":\"0\",\"FromType\":\"1\",\"ImageStrickId\":\"0\"}]"
        };
        const _0x24fc25 = {
          productId: _0x1fa44a.wareId,
          kocSynFlag: "0",
          categoryList: _0x1fa44a.categoryList,
          voucherStatus: "0",
          extInfo: _0x3f7611,
          officerScore: $.score,
          anonymousFlag: "1",
          commentScore: "5",
          shopType: "0",
          orderId: _0x1fa44a.orderId,
          shopId: _0x1fa44a.shopId,
          addPictureFlag: "0",
          commentData: _0x4d48bb,
          pictureInfoList: _0x49a420,
          officerLevel: $.level,
          isCommentTagContent: "0"
        };
        await _0x24520b("pubComment", _0x24fc25);
      } else {
        if (_0x49a420.length != 0 && _0x45aa5b.length <= 2) {
          console.log("成功获取到图片，但没有获取到评价内容，使用内置评价，去发布✍️✍️✍️...\n");
          const _0x3e1df8 = {
            mediasExt: "[{\"VideoIsEditCover\":\"0\",\"ImagePropId\":\"0\",\"ImageTakePhotoFilterId\":\"0\",\"ImageIsCrop\":\"0\",\"VideoIsEditCrop\":\"0\",\"VideoEditFilterId\":\"0\",\"VideoMusicId\":\"0\",\"ImageEditFilterId\":\"0\",\"VideoPropId\":\"0\",\"TakeRate\":\"0\",\"VideoRecordIsMakup\":\"0\",\"ImageTakePhotoIsMakup\":\"0\",\"VideoRecordFilterId\":\"0\",\"ImageFontId\":\"0\",\"FromType\":\"1\",\"ImageStrickId\":\"0\"},{\"VideoIsEditCover\":\"0\",\"ImagePropId\":\"0\",\"ImageTakePhotoFilterId\":\"0\",\"ImageIsCrop\":\"0\",\"VideoIsEditCrop\":\"0\",\"VideoEditFilterId\":\"0\",\"VideoMusicId\":\"0\",\"ImageEditFilterId\":\"0\",\"VideoPropId\":\"0\",\"TakeRate\":\"0\",\"VideoRecordIsMakup\":\"0\",\"ImageTakePhotoIsMakup\":\"0\",\"VideoRecordFilterId\":\"0\",\"ImageFontId\":\"0\",\"FromType\":\"1\",\"ImageStrickId\":\"0\"}]"
          };
          const _0x4a7308 = {
            productId: _0x1fa44a.wareId,
            kocSynFlag: "0",
            categoryList: _0x1fa44a.categoryList,
            voucherStatus: "0",
            extInfo: _0x3e1df8,
            officerScore: $.score,
            anonymousFlag: "1",
            commentScore: "5",
            shopType: "0",
            orderId: _0x1fa44a.orderId,
            shopId: _0x1fa44a.shopId,
            addPictureFlag: "0",
            commentData: _0x4d48bb,
            pictureInfoList: _0x49a420,
            officerLevel: $.level,
            isCommentTagContent: "0"
          };
          await _0x24520b("pubComment", _0x4a7308);
        } else {
          if (_0x49a420.length == 0 && _0x45aa5b.length > 2) {
            console.log("没有获取到图片，但获取到评价内容，去发布✍️✍️✍️...\n");
            const _0x328444 = {
              productId: _0x1fa44a.wareId,
              kocSynFlag: "0",
              categoryList: _0x1fa44a.ategoryList,
              voucherStatus: "0",
              officerScore: $.score,
              anonymousFlag: "1",
              commentScore: "5",
              shopType: "0",
              orderId: _0x1fa44a.orderId,
              shopId: _0x1fa44a.shopId,
              addPictureFlag: "0",
              commentData: _0x4d48bb,
              pictureInfoList: "",
              officerLevel: $.level,
              isCommentTagContent: "0"
            };
            await _0x24520b("pubComment", _0x328444);
          } else {
            if (_0x31e615.length <= 1) {
              console.log("没有获取到评价和图片,使用内置文字评价，去发布✍️✍️✍️...\n");
              const _0x5dd796 = {
                productId: _0x1fa44a.wareId,
                kocSynFlag: "0",
                categoryList: _0x1fa44a.ategoryList,
                voucherStatus: "0",
                officerScore: $.score,
                anonymousFlag: "1",
                commentScore: "5",
                shopType: "0",
                orderId: _0x1fa44a.orderId,
                shopId: _0x1fa44a.shopId,
                addPictureFlag: "0",
                commentData: _0x4d48bb,
                pictureInfoList: "",
                officerLevel: $.level,
                isCommentTagContent: "0"
              };
              await _0x24520b("pubComment", _0x5dd796);
            }
          }
        }
      }
      console.log("评价内容(" + _0x4d48bb.length + "字) ：" + _0x4d48bb);
      _0x49a420.length != 0 && (console.log("晒图详情："), _0x49a420.forEach(_0x3af3f => console.log("https://img30.360buyimg.com/shaidan/" + _0x3af3f.picUrl)));
      await $.wait(1000);
    }
  } catch (_0x585afe) {
    console.log(_0x585afe);
  }
}
switch ($.type) {
  case "nb":
    const _0x3ff6c6 = {
      nb: nb
    };
    _0xf1f6le = _0x3ff6c6;
    break;
}
async function _0x4d8893(_0x27193f, _0x521e3f = 1) {
  const _0x28a7d7 = {
    sortType: "5",
    isCurrentSku: false,
    sku: "" + _0x27193f,
    pictureCommentType: "A",
    shieldCurrentComment: "1",
    shopType: "0",
    type: "4",
    shadowMainSku: "0",
    num: "10",
    offset: "" + _0x521e3f,
    pageNum: "" + _0x521e3f,
    pageSize: "10"
  };
  s = await _0x24520b("getCommentListWithCard", _0x28a7d7);
  _0x31e615 = _0x31e615.concat(s.commentInfoList);
  $.maxPage = s.maxPage;
}
async function _0xd36b69(_0x21c430, _0x2e04de = 1) {
  const _0x10943d = {
    bbtf: ""
  };
  const _0x2acf75 = {
    category: "",
    extInfo: _0x10943d,
    isCurrentSku: true,
    num: "21",
    offset: "" + _0x2e04de,
    shadowMainSku: "0",
    shopType: "0",
    sku: "" + _0x21c430
  };
  s = await _0x24520b("getShowPictures", _0x2acf75);
  $.commentInfoList = s.commentShowPicInfoList;
  $.maxPage = s.maxPage;
}
async function _0x16843f(_0x54af4f, _0x3e0bc = 1) {
  const _0x5dfc82 = {
    bbtf: ""
  };
  const _0x24bb61 = {
    category: "",
    extInfo: _0x5dfc82,
    isCurrentSku: false,
    num: "10",
    offset: "" + _0x3e0bc,
    shopType: "0",
    sku: "" + _0x54af4f,
    type: "4"
  };
  s = await _0x24520b("getFoldCommentList", _0x24bb61);
  _0x31e615 = _0x31e615.concat(s.commentInfoList);
  $.maxPage = s.maxPage;
}
async function _0x54089a(_0x1d0a42) {
  const _0x97e5ac = {
    imgData: _0x1d0a42
  };
  s = await _0x24520b("getShaidanUploadUrl", _0x97e5ac);
  return s;
}
async function _0x53c680(_0x568b5d, _0x52c916) {
  s = await _0x24520b("commentEditInfo", {
    allFloorsFlag: null,
    business: "1",
    evaAuraVersion: "120602",
    lowSaleQuantity: null,
    orderId: _0x568b5d,
    qrType: "1",
    sku: _0x52c916
  });
  $.rewardInfo = s.commentFloorList[0].productCommentFloor.newCommentRewardMap?.["bannerInfo"] || "评价有礼";
  $.wnezi = JSON.stringify(s).match(new RegExp("(\\d+)字")) ? JSON.stringify(s).match(new RegExp("(\\d+)字"))[1] : 60;
  $.saitu = JSON.stringify(s).match(new RegExp("(\\d+)晒图")) ? JSON.stringify(s).match(new RegExp("(\\d+)晒图"))[1] : 2;
}
async function _0x546cc6(_0x1e84d0 = "1", _0x16ca27 = "1") {
  const _0x4f7671 = {
    pageIndex: _0x1e84d0,
    pageSize: "10",
    planType: "1",
    status: _0x16ca27
  };
  s = await _0x24520b("getCommentWareList", _0x4f7671, "12.5.0");
  $.maxPage = s.commentWareListInfo?.["maxPage"];
  $.sdnum = s.commentWareListInfo?.["wait4CommentCount"];
  $.level = s.newCommentOfficerInfo?.["officerLevelInfo"]?.["officerLevel"] + "" || "3";
  $.score = s.newCommentOfficerInfo?.["officerLevelInfo"]?.["growthScore"] + "" || "1555";
  _0x16ca27 == "4" ? $.caidanList = s.commentWareListInfo?.["commentWareList"] : $.commentWareList = s.commentWareListInfo?.["commentWareList"] || [];
}
async function _0x5e4881(_0x27f290, _0xccb633 = 0.9) {
  const _0xe871b = {
    responseType: "buffer"
  };
  const _0x30747d = await _0x2f40a0(_0x27f290, _0xe871b),
    _0x29758f = _0x366199(_0x30747d.body),
    _0x515644 = await _0x29758f.metadata(),
    _0x6203b4 = Math.round(_0x515644.width * _0xccb633);
  const _0x452d1e = Math.round(_0x515644.height * _0xccb633),
    _0x4ea27c = await _0x29758f.resize(_0x6203b4, _0x452d1e).toBuffer();
  return _0x4ea27c.toString("base64");
}
async function _0x24520b(_0x480f3c, _0x151bca) {
  const _0x1aea0f = {
    fn: _0x480f3c,
    body: _0x151bca,
    ver: "11.2.2",
    user: $.UserName
  };
  let _0x587d3b = await _0x130ea4[_0x553931](_0x1aea0f),
    _0x3a7ccf = {
      url: "https://api.m.jd.com/client.action?functionId=" + _0x480f3c,
      body: "fuctionId=" + _0x480f3c + "&" + _0x587d3b,
      headers: {
        Host: "api.m.jd.com",
        accept: "*/*",
        "user-agent": $.UA,
        "accept-language": "zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6",
        Cookie: _0x12536a
      },
      ciphers: "TLS_AES_256_GCM_SHA384:TLS_AES_128_GCM_SHA256"
    };
  return new Promise(_0x3bfaa0 => {
    $.dpost(_0x3a7ccf, (_0x3c238c, _0x3c9376, _0xa85640) => {
      try {
        _0x3c238c ? console.log(_0x3c238c) : _0xa85640 = JSON.parse(_0xa85640);
        switch (_0x480f3c) {
          case "pubComment":
            _0xa85640.message && console.log(_0xa85640.message);
            break;
          default:
            break;
        }
      } catch (_0x2afed9) {
        console.log(_0x2afed9);
      } finally {
        _0x3bfaa0(_0xa85640);
      }
    });
  });
}
function _0x5a89e8() {
  return Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10);
}
function _0xa4d17a(_0x45d693) {
  return _0x45d693[Math.floor(Math.random() * _0x45d693.length)] || "";
}
function _0x56415d(_0x5859cd, _0x1e23b4) {
  const _0x27a7a2 = _0x5859cd.slice();
  let _0x3bdc00 = _0x5859cd.length,
    _0xb6bf20,
    _0x20fb71;
  while (_0x3bdc00--) {
    _0x20fb71 = Math.floor((_0x3bdc00 + 1) * Math.random());
    _0xb6bf20 = _0x27a7a2[_0x20fb71];
    _0x27a7a2[_0x20fb71] = _0x27a7a2[_0x3bdc00];
    _0x27a7a2[_0x3bdc00] = _0xb6bf20;
  }
  return _0x27a7a2.slice(0, _0x1e23b4);
}
function _0x2f212e() {
  const _0x16eac8 = {
    url: "https://verify-dy-server-hchdzuwrsu.cn-hangzhou.fcapp.run/pingjia",
    timeout: 30000
  };
  return new Promise(_0x7495aa => {
    $.post(_0x16eac8, async (_0x4df65d, _0x457acc, _0x20f595) => {
      try {
        if (!_0x4df65d) {
          if (_0x20f595) {
            _0x20f595 = JSON.parse(_0x20f595);
            if (_0x20f595.status === 200) {
              _0x553931 = _0x20f595.method;
            }
          }
        }
      } catch (_0xa8972e) {} finally {
        _0x7495aa(_0x20f595);
      }
    });
  });
}
function _0x20dc1c(_0x52702c) {
  const _0x383fec = [],
    _0xc6c339 = /[\u4e00-\u9fa5]/;
  for (let _0x3a2d8d = 0; _0x3a2d8d < _0x52702c.length; _0x3a2d8d++) {
    const _0x2d4493 = _0x52702c[_0x3a2d8d];
    _0xc6c339.test(_0x2d4493) && !_0x383fec.includes(_0x2d4493) && _0x383fec.push(_0x2d4493);
  }
  return _0x383fec.length;
}
function _0x1ec314(_0x50e086) {
  for (let _0x4ceead = _0x50e086.length - 1; _0x4ceead > 0; _0x4ceead--) {
    const _0x2050a6 = Math.floor(Math.random() * (_0x4ceead + 1));
    [_0x50e086[_0x4ceead], _0x50e086[_0x2050a6]] = [_0x50e086[_0x2050a6], _0x50e086[_0x4ceead]];
  }
  return _0x50e086.join(",");
}
function _0x3f4144() {
  return new Promise(_0x55c391 => {
    const _0x4ac099 = {
      Cookie: _0x12536a,
      referer: "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x40f4ad = {
      url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      headers: _0x4ac099,
      timeout: 10000
    };
    $.get(_0x40f4ad, (_0x2bcf73, _0x1df0e3, _0x117c15) => {
      try {
        if (_0x117c15) {
          _0x117c15 = JSON.parse(_0x117c15);
          if (!(_0x117c15.islogin === "1")) {
            _0x117c15.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0x5e7979) {
        console.log(_0x5e7979);
      } finally {
        _0x55c391();
      }
    });
  });
}
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