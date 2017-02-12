
function getc(ele) {
  var dom = document;
  return dom.getElementsByClassName(ele);
}
function geti(ele) {
  return document.getElementById(ele);
}

/**
 * 登录页面
 */

var loginPage = getc('login')[0],
    close = getc('close-btn')[0],
    login = geti('login1'),
    title = getc('otitle')[0],
    mask = geti('omask');

function show() {
    loginPage.className = 'login show';
    mask.className = 'mask';
}

function hidden() {
    loginPage.className = 'login hidden';
    mask.className = '';
}


// 添加事件
function addEvent(ele,type,fn) {
    if(ele.addEventListener) {
      ele.addEventListener(type,fn,false);
    }
    else if(ele.attachEvent) {
      ele.attachEvent('on'+type,fn);
    }
    else {
      ele['on'+type] = fn;
    }
}



// 确定鼠标与面板之间的距离
function dragDown() {
  xPanel = event.clientX - loginPage.offsetLeft;
  yPanel = event.clientY - loginPage.offsetTop;
  var dom =document;
  dom.onmousemove = function(event) {
    dragPanel(event,xPanel,yPanel);
  }
  dom.onmouseup = function(event) {
    document.onmousemove = null;
    document.onmouseup = null;
  }
}

function dragPanel(event,xPanel,yPanel) {
  var x = event.clientX - xPanel,
      y = event.clientY - yPanel;
  if(x < 10){x = 10;}
  if(y < 10){y = 10;}
  if(x > 890){x = 890;}
  if(y > 330){y = 330;}
  loginPage.style.left = x + 'px';
  loginPage.style.top = y + 'px';
}

function initLogin() {
  addEvent(close,'click',hidden);
  addEvent(login,'click',show);
  title.onmousedown=dragDown;
}

initLogin();

/**
 * 日历
 */
var startDay = new Date(1970,0,1),
    endDay = new Date(2020,11,31),
    year = geti('year'),
    month = geti('month'),
    yLeft = getc('y-left')[0],
    mLeft = getc('m-left')[0],
    yRight = getc('y-right')[0],
    mRight = getc('m-right')[0],
    date = geti('showDay'),
    myDate = new Date();



// 年份显示
function showYear() {
  var len = endDay.getYear() - startDay.getYear()+1,
      s = '';
  for(var i=0;i<len;i++) {
    s+='<option>'+(startDay.getFullYear() + i)+ '</option>';
  }
  year.innerHTML = s;
  year.value = myDate.getFullYear();
}

// 月份显示
function showMonth() {
  var len = 12,
      s = '';
  for(var i=1;i<=len;i++) {
    s+='<option>' + i + '</option>';
  }
  month.innerHTML = s;
  month.value = myDate.getMonth()+1;
}

// 前一年
function lastYear() {
  var index = year.selectedIndex;
  if(index != 0) {
    year.value = year.options[--index].text;
  }
}

// 下一年
function nextYear() {
  var index = year.selectedIndex;
  if(index != year.options.length-1) {
    year.value = year.options[++index].text;
  }
}

// 前一月
function lastMonth() {
  var index = month.selectedIndex;
  if(index != 0) {
    month.value = month.options[--index].text;
  }
}

// 下一月
function nextMonth() {
  var index = month.selectedIndex;
  if(index != month.options.length-1) {
    month.value = month.options[++index].text;
  }
}

// 显示日期
function showDays() {
  var curYear = year.value,
      curMonth = month.value,
      nowDate = new Date(curYear,curMonth-1,1),
      len=0;
  if (curMonth == 12){
    len = new Date(curYear+1,0,1).getTime() - new Date(curYear,curMonth-1,1).getTime();
  }

  else {
    len = new Date(curYear,curMonth,1).getTime() - new Date(curYear,curMonth-1,1).getTime();
  }
  var days = len/1000/60/60/24,
      nowWeek = nowDate.getDay(),
      s = '',sr='';
  var divDay = days + nowWeek,
      weeks = Math.ceil(divDay/7);
  for(var n=0;n<weeks;n++){
      sr+='<div class="day"></div>';
  }
  date.innerHTML = sr;

  var divDay = getc('day'),
      l=0,iday=0;

  if(nowWeek!=0){
      l=1;
      iday = 7-nowWeek + 1;
      var s='',d=1;
      for(var j=0;j<nowWeek;j++){
        s+='<p class="day-text" style="visibility:hidden;">'+1+'</p>';
      }
      for(var j=nowWeek;j<7;j++){
        s+='<p class="day-text">'+d+ '</p>' ;
        d++;
      }
      divDay[0].innerHTML = s;
    }
  else{
    l=0;
    iday=1;
  }

  for(l;l<weeks;l++) {
    console.log(l);
    var s='';
    for(var i=0;i<7;i++){
      s+='<p class="day-text">'+iday+ '</p>';

      if(iday == days){
        break;
      }
      iday++;
    }
    divDay[l].innerHTML = s;
  }
}

function initKalendar() {
  showYear();
  showMonth();
  showDays();
  addEvent(yLeft,'click',function(){
    lastYear();
    showDays();
  });
  addEvent(yRight,'click',function(){
    nextYear();
    showDays();
  });
  addEvent(mLeft,'click',function(){
    lastMonth();
    showDays();
  });
  addEvent(mRight,'click',function(){
    nextMonth();
    showDays();
  });
  addEvent(year,'change',showDays);
  addEvent(month,'change',showDays);
}

initKalendar();