var apiHost = "http://api.jx9n.com";
var appVersion = "v3.3";
apiHost = "http://39.106.62.16:8181";



var API_URL = {};
API_URL.ApiAdminSendCode = apiHost + "/api/admin/sendCode"; //发送短信接口



var WX_URL = {};
WX_URL.QRCode =  '/wx/addingCdz'  // 微信QRCode 链接


function checkNumber(theObj) {
  var reg = /^[0-9]+.?[0-9]*$/;
  if (reg.test(theObj)) {
    return true;
  }
  return false;
}


Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}


function getHeadImg(img) {
    return vaildeParam(img)?img:"../img/user_profile/app_10.png";
}

/**
 * 参数校验
 */
function vaildeParam(param) {
    if(typeof param == 'undefined'){
        return false;
    }
    if(undefined == param){
        return false
    }
    if(null == param){
        return false;
    }
    if(param.length == 0){
        return false;
    }
    return true;
}

/**
 * 发送跨域请求
 * @param {Object} url 接口地址
 * @param {Object} data 参数连接的方式
 * @param {Object} callback 回调函数
 */
function postJSON(url, data, callback){
	
	url += "?"+postDataFormat(data);
	
//	console.log("## postJSON ## url : "+url)
	var load_index = layer.load();
	var xhr = new plus.net.XMLHttpRequest();
	xhr.onreadystatechange = function () {
			console.log("## postJSON ## readyState : "+xhr.readyState)
	    switch ( xhr.readyState ) {
	        case 4:
	            if ( xhr.status == 200 ) {
	            		var responseText = xhr.responseText;
	            		console.log("## url: "+url+" #### responseText: "+responseText)
	            	 	// var json = eval("(" + responseText + ")");
	            	 	var json = JSON.parse(responseText);
	            		callback(json);
	            } else {
	            		layer.msg("请求失败");
	            }
	            layer.close(load_index);
	            break;
	        default :
	            break;
	    }
    }
	xhr.open( "POST", url ,true);
	xhr.send(null);
}

function postJSONNoIcon(url, data, callback){

    url += "?"+postDataFormat(data);

//  console.log("## postJSONNoIcon ## url : "+url)
    var xhr = new plus.net.XMLHttpRequest();
    xhr.onreadystatechange = function () {
        console.log("## postJSON ## readyState : "+xhr.readyState)
        switch ( xhr.readyState ) {
            case 4:
                if ( xhr.status == 200 ) {
                    var responseText = xhr.responseText;
                    console.log("## url: "+url+" #### responseText: "+responseText)
                    var json = eval("(" + responseText + ")");
                    console.log("## postJSON ## json : "+json)
                    callback(json);
                } else {
                    layer.msg("请求失败");
                }
                break;
            default :
                break;
        }
    }
    xhr.open( "POST", url ,true);
    xhr.send(null);
}

/**
 * 登录校验
 */
function checkLogin(page){
	
	var uuid = Storage.getItem("uuid");
	var mobile = Storage.getItem("mobile");
	var loginDate = Storage.getItem("login_date");
	
	console.log("## checkLogin ## uuid : " + uuid);
	console.log("## checkLogin ## mobile : " + mobile);
	console.log("## checkLogin ## loginDate : " + loginDate);
	
	if(!vaildeParam(uuid) || !vaildeParam(mobile) || !vaildeParam(loginDate)){
	    if(vaildeParam(page)){
            clicked(page,true,false);
        }else{
            clicked('login.html',true,false);
        }
	}

}

/**
 * 保存登入数据
 * @param {Object} userID
 * @param {Object} mobile
 */
function setLoginData(uuid,mobile){
	
	console.log("## setLoginData ## uuid : " + uuid);
	console.log("## setLoginData ## mobile : " + mobile);
	var date = formatDate(new Date(),"yyyy-mm-dd HH-mm-ss");
	console.log("## setLoginData ## date : " + date);
	
	Storage.setItem( "uuid", uuid);
	Storage.setItem( "mobile", mobile );
	Storage.setItem( "login_date", date);
	
}
/**
 * 保存登入数据New
 * @param {Object} userID
 * @param {Object} mobile
 */
function setLoginDataNew(uuid,mobile,headImage,phone,bank,bankCode,moneyAmount){

    console.log("## setLoginData ## uuid : " + uuid);
    console.log("## setLoginData ## mobile : " + mobile);
    console.log("## setLoginData ## headImage : " + headImage);
    console.log("## setLoginData ## phone : " + phone);
    console.log("## setLoginData ## bank : " + bank);
    console.log("## setLoginData ## bankCode : " + bankCode);
    console.log("## setLoginData ## moneyAmount : " + moneyAmount);
    var date = formatDate(new Date(),"yyyy-mm-dd HH-mm-ss");
    console.log("## setLoginData ## date : " + date);

    Storage.setItem( "uuid", uuid);
    Storage.setItem( "mobile", mobile );
    Storage.setItem( "headImage", headImage);
    Storage.setItem( "phone", phone);
    Storage.setItem( "bank", bank);
    Storage.setItem( "bankCode", bankCode);
    Storage.setItem( "amountMoney", moneyAmount);
    Storage.setItem( "login_date", date);

}


function clearLogin() {
    Storage.clear();
}


/**
 * 打印对象
 * @param {Object} obj
 */
function writeObj(obj){ 
	 var description = ""; 
	 for(var i in obj){ 
	 	var property=obj[i]; 
	 	description+=i+" = "+property+"\n"; 
	 } 
 	console.log(description);
}


// post请求
// 格式化 post 传递的数据
function postDataFormat(obj){
    if(typeof obj != "object" ) {
        alert("输入的参数必须是对象");
        return;
    }
    // 不支持FormData的浏览器的处理 
    var arr = new Array();
    var i = 0;
    for(var attr in obj) {
        arr[i] = encodeURIComponent(attr) + "=" + encodeURIComponent(obj[attr]);
        i++;
    }
    return arr.join("&");
}

 /** 美化时间显示*/
function jsDateDiff(publishTime){
    var d_minutes,d_hours,d_days;
    var timeNow = parseInt(new Date().getTime()/1000);
    var d;
    d = timeNow - publishTime;
    d_days = parseInt(d/86400);
    d_hours = parseInt(d/3600);
    d_minutes = parseInt(d/60);
    if(d_days>0 && d_days<4){
        return d_days+"天前";
    }else if(d_days<=0 && d_hours>0){
        return d_hours+"小时前";
    }else if(d_hours<=0 && d_minutes>0){
        return d_minutes+"分钟前";
    }else if(d_days<=0 && d_hours<=0 && d_minutes<=0){
        return parseInt(d,10)+"秒前";
    }else{
        var s = new Date(publishTime*1000);
        return s.getFullYear()+"年"+(s.getMonth()+1)+"月"+s.getDate()+"日";
    }
}

/**
 * 日期格式化
 * @param {Object} date
 * @param {Object} str
 */
function formatDate(date,str){
    var mat={};
    mat.M=date.getMonth()+1;//月份记得加1
    mat.H=date.getHours();
    mat.s=date.getSeconds();
    mat.m=date.getMinutes();
    mat.Y=date.getFullYear();
    mat.D=date.getDate();
    mat.d=date.getDay();//星期几
    mat.d=check(mat.d);
    mat.H=check(mat.H);
    mat.M=check(mat.M);
    mat.D=check(mat.D);
    mat.s=check(mat.s);
    mat.m=check(mat.m);
    console.log(typeof mat.D)
    if(str.indexOf(":")>-1){
　　　　　mat.Y=mat.Y.toString().substr(2,2);
　　　　 return mat.Y+"/"+mat.M+"/"+mat.D+" "+mat.H+":"+mat.m+":"+mat.s;
    }
    if(str.indexOf("/")>-1){
        return mat.Y+"/"+mat.M+"/"+mat.D+" "+mat.H+"/"+mat.m+"/"+mat.s;
    }
    if(str.indexOf("-")>-1){
        return mat.Y+"-"+mat.M+"-"+mat.D+" "+mat.H+"-"+mat.m+"-"+mat.s;
    }
}

/**
 * 检查是不是两位数字，不足补全
 * @param {Object} str
 */
function check(str){
    str=str.toString();
    if(str.length<2){
        str='0'+ str;
    }
    return str;
}


function getTimeDiffString(timeFiff){
	console.log("## getTimeDiffString ## timeFiff:"+timeFiff)
	
	var days=Math.floor(timeFiff/(24*3600*1000));
	//计算出小时数
	var leave1=timeFiff%(24*3600*1000)    //计算天数后剩余的毫秒数
	var hours=Math.floor(leave1/(3600*1000))
	console.log("## getTimeDiffString ## hours:"+hours)

	//计算相差分钟数
	var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
	var minutes=Math.floor(leave2/(60*1000))
	console.log("## getTimeDiffString ## minutes:"+minutes)
	
	//计算相差秒数
	var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
	var seconds=Math.round(leave3/1000)
	console.log("## getTimeDiffString ## seconds:"+seconds)

	var res = '';
	
	if(seconds > 0){
		res = seconds+" 秒" + res;
	}
	
	if(minutes > 0){
		res = minutes+"分钟 " + res 
	}
	
	if(hours > 0){
		res = hours+"小时 " + res 
	}
	
	if(days > 0){
		res = days+"天 " + res 
	}
    console.log("## getTimeDiffString ## res:"+res)


	return res;
}

function getTimeDiff(time){
	console.log("## getTimeDiff ## time:"+time)
	var date2 = new Date();
	var date3=date2.getTime()-time;
	return getTimeDiffString(date3);
}

function loadImage(url, callback) {

	console.log("## loadImage ## url:"+url)

    var img = new Image(); //创建一个Image对象，实现图片的预下载
    img.src = url;

    if(img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
        console.log("## loadImage ## complete")
        callback.call(img);
        return; // 直接返回，不用再处理onload事件
    }
    img.onload = function () { //图片下载完毕时异步调用callback函数。
        console.log("## loadImage ## onload")
        callback.call(img);//将回调函数的this替换为Image对象
    };
}


function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}


/**
 * 上传用户登入信息,并且校验是否多台设备登入
 */
function uploadLoginInfo(loginPagePath){
    checkLogin(loginPagePath);

    setInterval(function () {
        var uuid = Storage.getItem("uuid");
        if(vaildeParam(uuid)){

            var osName = plus.os.name;
            var deviceModel = plus.device.model;
            var deviceUuid = plus.device.uuid;

            var clientInfo = plus.push.getClientInfo().clientid;

            console.log("## uploadLoginInfo ## uuid:"+uuid);
            console.log("## uploadLoginInfo ## osName:"+osName);
            console.log("## uploadLoginInfo ## deviceModel:"+deviceModel);
            console.log("## uploadLoginInfo ## deviceUuid:"+deviceUuid);
            console.log("## uploadLoginInfo ## clientInfo:"+JSON.stringify(plus.push.getClientInfo()));
            console.log("## uploadLoginInfo ## clientInfo:"+clientInfo);

            var data = {
                "uuid":uuid,
                "osName":osName,
                "deviceModel":deviceModel,
                "clientInfo":clientInfo,
                "deviceUuid":deviceUuid
            }
            postJSONNoIcon(API_URL.updateLoginInfo,data,function(res){
                if("0" == res.code){
                    console.log("上传用户登录信息成功")
                }else if('6003' == res.code){
                    layer.msg('您的账号已在在另一设备登录，您强制下线,正在跳转登录页面...');
                    setTimeout(function () {
                        clearLogin();
                        checkLogin(loginPagePath);
                    },2000)
                }else{
                    layer.msg(res.msg);
                }
            })
        }

    },5000)

}



function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


/**
 * 绑定的点击事件
 * @param {Object} item 跳转路径 ， 以及存好文章名称
 * @param {Object} dataId
 */
function clickedTongYong(item,categoryName){
    console.log(item+":"+categoryName);
    Storage.setItem( "categoryName", categoryName);
    clicked(item);
}


/**
 * 获取当前月的第一天
 * @returns {Date}
 */
function getCurrentMonthFirst(){
    var date=new Date();
    date.setDate(1);
    return date;
}


/**
 * 获取当前月的最后一天
 * @returns {Date}
 */
function getCurrentMonthLast(){
    var date=new Date();
    var currentMonth=date.getMonth();
    var nextMonth=++currentMonth;
    var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
    var oneDay=1000*60*60*24;
    return new Date(nextMonthFirstDay-oneDay);
}

function getLastDay(year,month) {
    var new_year = year;    //取当前的年份
    var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）
    if(month>12) {
        new_month -=12;        //月份减
        new_year++;            //年份增
    }
    var new_date = new Date(new_year,new_month,1);                //取当年当月中的第一天
    return (new Date(new_date.getTime()-1000*60*60*24));//获取当月最后一天日期
}
/**
 * 数字转中文
 * @returns {Number}
 */
function NumberToChinese(num){
		if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(num)) return "数据非法";
    var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
    var chnUnitSection = ["","万","亿","万亿","亿亿"];
    var chnUnitChar = ["","十","百","千"];

    var strIns = '', chnStr = '';
    var unitPos = 0;
    var zero = true;
    while(num > 0){
        var v = num % 10;
        if(v === 0){
            if(!zero){
                zero = true;
                chnStr = chnNumChar[v] + chnStr;
            }
        }else{
            zero = false;
            strIns = chnNumChar[v];
            strIns += chnUnitChar[unitPos];
            chnStr = strIns + chnStr;
        }
        unitPos++;
        num = Math.floor(num / 10);
    }
    return chnStr;
}

/**
 * wgt html/css/js
 * wgtu 差量更新,需要对照appStore或应用宝中的升级
 */
function heatUpdate(appType) {
	appType = appType + "HeatUpdate";
	postJSONNoIcon(API_URL.AppVersionPartnerGetNewest, {
		'appType': appType
	}, function(res) {
		if('0' == res.code && vaildeParam(res.data)) {
			if(compareVersion(res.data.version)) {
				plus.nativeUI.confirm('检测到新版本,是否更新?', function(e) {
					if(e.index == 0) {
						console.log('检测到新版本更新');
						downloadWgt(res.data.url);
					}
				});
			}
		}
	});
}

function compareVersion(version) {
	if(!vaildeParam(version)) {
		console.log('版本号不能为空');
		return false;
	}
	if(!version.startsWith('v') || version.length == 1) {
		console.log('错误的版本号');
		return false;
	}

	var array1 = version.substr(1).split('.');
	var array2 = appVersion.substr(1).split('.');
	var len = Math.min(array1.length, array2.length);
	var index = 0,
		diff = 0;
	while(index < len &&
		(diff = parseInt(array1[index]) - parseInt(array2[index])) == 0) {
		index++;
	}
	return diff == 0 ? array1.length - array2.length : diff > 0;
}

function downloadWgt(url) {
	var showLoading = plus.nativeUI.showWaiting(' 正在下载...... ');

	var downloadTask = plus.downloader.createDownload(url, {
		filename: '_doc/update/'
	}, function(d, status) {
		plus.nativeUI.closeWaiting();
		if(status == 200) {
			installWgt(d.filename);
		} else {
			plus.nativeUI.alert('下载升级文件失败！');
		}
	});
	downloadTask.start();

	var count = 0;
	downloadTask.addEventListener('statechanged', function(task, status) {
		switch(task.state) {
			case 1:

				break;
			case 2:
				showLoading.setTitle(" 已连接到服务器 ...... ");
				break;
			case 3:
				var prg = parseInt(parseFloat(task.downloadedSize) / parseFloat(task.totalSize) * 100);
				if(count < prg) {
					count = prg;
					showLoading.setTitle(' 正在下载 ' + count + '% ...... ');
				}
				break;
			case 4:
				break;
			default:
				break;
		}
	});
}

function installWgt(path) {
	plus.nativeUI.showWaiting('正在安装...');

	plus.runtime.install(path, {
		force: true
	}, function() {
		plus.nativeUI.closeWaiting();
		console.log('安装wgt文件成功！');

		plus.nativeUI.alert('应用资源更新完成！', function() {
			plus.runtime.restart();
		});
	}, function(e) {
		plus.nativeUI.closeWaiting();
		console.log('安装wgt文件失败[' + e.code + ']：' + e.message);
		plus.nativeUI.alert('应用资源更新失败' + e.message);
	});
}
/**
 * 使用indexOf判断元素是否存在于数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
function isInArray(arr,value){
    if(arr.indexOf&&typeof(arr.indexOf)=='function'){
        var index = arr.indexOf(value);
        if(index >= 0){
            return true;
        }
    }
    return false;
}

//本地存储数据
var Storage = {
	//存储
	setItem:function(key, value) {
	  plus.storage.setItem(key, value);
	},
	//取出数据
	getItem:function(key) {
	   return plus.storage.getItem(key);
	},
	// 删除数据
	removeItem:function(key) {
	  plus.storage.removeItem(key);
	},
	clear:function(){
	  plus.storage.clear();
	}
}
/**
*获取用户uuid
*/
function getUUId(){
  return Storage.getItem("uuid");
}