/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
var chart=document.getElementsByClassName("aqi-chart-wrap")[0];
function renderChart() {
  var color="",s="";
  for(var item in chartData){
    color='#'+Math.round(Math.random()*0xffffff).toString(16);
    s+='<div title="'+item+":"+chartData[item]+'"'+'style="float:left;width:10px;height:'+chartData[item]+"px;background-color:"+color+';"></div>';
  }
  chart.innerHTML=s;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(timechange) {
  // 确定是否选项发生了变化
  // 设置对应数据

  switch(timechange){
    case 'day':pageState.nowGraTime='day';break;
    case 'week':pageState.nowGraTime='week';break;
    case 'month':pageState.nowGraTime='month';break;
  }


  // 调用图表渲染函数
  initAqiChartData();
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化

  if(pageState.nowSelectCity==this.value){
    return;
  }else{
    pageState.nowSelectCity=this.value;
  }
  // 设置对应数据

  // 调用图表渲染函数
  initAqiChartData();
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var forgratime=document.getElementById('form-gra-time');
  var radio=forgratime.getElementsByTagName('input');
  for(var i=0,len=radio.length;i<len;i++){
    radio[i].onclick=function(){
      graTimeChange(this.value);

    }
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var select=document.getElementsByTagName("select")[0],
      s='';
  for(var item in aqiSourceData){

    s+='<option>'+item+'</option>';

  }
  select.innerHTML=s;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  select.addEventListener('change',citySelectChange,false);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var nowCityData=aqiSourceData[pageState.nowSelectCity];

    if(pageState.nowGraTime=='day'){
      chartData=nowCityData;

    }

    if(pageState.nowGraTime=='week'){
      chartData={};
      var sum=0,daysum=0,i=1;
      for(var item in nowCityData){
        sum+=nowCityData[item];
        daysum++;

        if((new Date(item)).getDay()==6){
          chartData['第'+i+'周']=Math.round(sum/daysum);
          i++;
          sum=0;
          daysum=0;
        }

      }
      if(daysum!=0){
        chartData['第'+i+'周']=Math.round(sum/daysum);
      }
    }

    if(pageState.nowGraTime=='month'){
      chartData={};

      var sum=0,daysum=0,month=0;
      for(var item in nowCityData){

        if((new Date(item)).getMonth()==month){
          sum+=nowCityData[item];
          ++daysum;

        }
        if((new Date(item)).getMonth()!=month){
          chartData['第'+(month+1)+'月']=Math.round(sum/daysum);
          month++;
          sum=nowCityData[item];
          daysum=1;
        }
        if(daysum!=0){
          chartData['第'+month+'月']=Math.round(sum/daysum);
        }
      }


    }
  return chartData;

}

/**
 * 初始化函数
 */
function init() {

  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();

}

init();
