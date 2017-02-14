/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = [];
var ocity=document.getElementById("aqi-city-input"),
    oaqi=document.getElementById("aqi-value-input"),
    oaqiTable=document.getElementById("aqi-table");
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var aqi=oaqi.value.trim(),
      city=ocity.value.trim();
  aqiData[city]=aqi;//city为key值，aqi为value

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

  var s="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
  for(var city in aqiData){
    s+="<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button class='btn'>删除</button></td></tr>";
  }

  document.getElementById("aqi-table").innerHTML=s;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  // do sth.

  var tr=target.parentNode.parentNode;
  var city=tr.childNodes[0].innerHTML;
  delete aqiData[city];//为什么删除这个就可以删除一整行了？？？？
  renderAqiList();
}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  renderAqiList();
  var addBtn=document.getElementById("add-btn");
  var obtn=document.getElementsByTagName("button");
  addBtn.addEventListener('click',addBtnHandle,false);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  oaqiTable.onclick=function(event){
    var event=event||window.event;
    var target=event.target||event.srcElement;

    if(target.nodeName.toLowerCase()=='button'){
      delBtnHandle(target);
    }

  }
}

  init();


