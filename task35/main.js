function get(ele){
  var e=document.getElementById(ele);
  return e;
}

var odo=get('do'),
    oin=get('in'),
    codeRow=get('code-row'),
    square=get('square'),
    blue=get('blue'),
    refresh=get('refresh'),
    left=parseInt(square.offsetLeft),
    otop=parseInt(square.offsetTop),
    commandList=[],
    oli=document.getElementsByTagName('li');
// 添加事件兼容方法
function addEvent(ele,type,handler){
  if(ele.addEventListener){
    ele.addEventListener(type,handler);
  }
  else if(ele.attachEvent){
    ele.attachEvent('on'+type,handler);
  }else{
    ele['on'+type]=handler;
  }
}

// 移动操作
function step(direction){
  if(left>=41&left<=401&&otop>=41&&otop<=401){
                switch(direction){
                  case 'top':if(otop>=81){otop-=40;square.style.top=otop+'px';console.log(otop);}else{alert('撞到墙啦');};break;
                  case 'bottom':if(otop<=361){otop+=40;square.style.top=otop+'px';console.log(otop);}else{alert('撞到墙啦');};break;
                  case 'left':if(left>=81){left-=40;square.style.left=left+'px'; console.log(left);}else{alert('撞到墙啦');};break;
                  case 'right':if(left<=361){left+=40;square.style.left=left+'px'; console.log(left);}else{alert('撞到墙啦');};break;
                }
              }else{
                alert('撞到墙啦');
              }
  }

// go操作
function gostep(){
  var curdeg=parseInt((square.style.transform).match(/[-]*\d+/g)[0]);
  switch(curdeg){
    case 0:step('left');break;
    case 90:step('top');break;
    case 180:step('right');break;
    case -90:step('bottom');break;
  }
}

// 方块方法
var squareMethod={
  TraTop:function(){step('top');},
  TraLef:function(){step('left')},
  TraRig:function(){step('right')},
  TraBot:function(){step('bottom')},
  MovLef:function(){square.style.transform='rotateZ(0deg)';step('left');},
  MovRig:function(){square.style.transform='rotateZ(180deg)';step('right');},
  MovTop:function(){square.style.transform='rotateZ(90deg)';step('top');},
  MovBot:function(){square.style.transform='rotateZ(-90deg)';step('bottom');}
};

// 同步显示行值
function lineShow(n){
  var s='';
  for(var i=1;i<=n;i++){
     s+='<li>'+i+'</li>';
  }
  codeRow.innerHTML=s;
  codeRow.firstElementChild.style.marginTop=-oin.scrollTop+'px';
  // codeRow.children[0].style.marginTop=-oin.scrollTop+'px';
}

//  命令执行函数
function docommand(command,m,ali){
  while(m>0){
   switch(command){
      case 'tra top':squareMethod.TraTop();break;
      case 'tra lef':squareMethod.TraLef();break;
      case 'tra bot':squareMethod.TraBot();break;
      case 'tra rig':squareMethod.TraRig();break;
      case 'mov top':squareMethod.MovTop();break;
      case 'mov bot':squareMethod.MovBot();break;
      case 'mov lef':squareMethod.MovLef();break;
      case 'mov rig':squareMethod.MovRig();break;
      case 'go':gostep();break;
      default :ali.style.color='red';break;
    }
   m--;
  }
}


// 读取textarea中的指令,检测是否正确
function commandRead(){
  commandList=oin.value.toLowerCase().split(/\n/);
  for(var i=0,len=commandList.length;i<len;i++){
    commandList[i]=commandList[i].trim();
    if(/ \d+$/.test(commandList[i])){
      var z=parseInt(commandList[i].match(/\d+/g));
      commandList[i]=commandList[i].replace(/([a-z]{2,6}) (\d+)/g,'$1');
      docommand(commandList[i],z,oli[i]);
    }else{
      docommand(commandList[i],1,oli[i]);
    }

    }
  }

// 清空输入框数据
function empty(){
  oin.value='';
  codeRow.innerHTML='';
}

// 主函数
function init(){
  square.style.transform="rotateZ(0deg)";
  addEvent(oin,'keydown',function(){
    setTimeout(function(){
      if(oin.value.match(/\n/g)){
        var n=oin.value.match(/\n/g).length+1;
        lineShow(n);}
      else{var n=1;lineShow(n);}
        }, 0)
  });
  addEvent(odo,'click',commandRead);
  addEvent(refresh,'click',empty);
}

init();
