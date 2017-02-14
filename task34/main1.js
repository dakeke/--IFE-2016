function get(ele){
  var e=document.getElementById(ele);
  return e;
}

var odo=get('do'),
    go=get('go'),
    tl=get('tl'),
    tr=get('tr'),
    tt=get('tt'),
    tb=get('tb'),
    oin=get('in'),
    square=get('square'),
    blue=get('blue'),
    ml=get('ml'),
    mr=get('mr'),
    mt=get('mt'),
    mb=get('mb'),
    left=parseInt(square.offsetLeft),
    otop=parseInt(square.offsetTop);
//添加事件兼容方法
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
//命令函数
function traStep(command){
  var ocommand=command.split('-')[1];
  if(left>=41&left<=401&&otop>=41&&otop<=401){
    switch(ocommand){
      case 'top':if(otop>=81){otop-=40;square.style.top=otop+'px';console.log(otop);}else{alert('撞到墙啦');};break;
      case 'bottom':if(otop<=361){otop+=40;square.style.top=otop+'px';console.log(otop);}else{alert('撞到墙啦');};break;
      case 'left':if(left>=81){left-=40;square.style.left=left+'px'; console.log(left);}else{alert('撞到墙啦');};break;
      case 'right':if(left<=361){left+=40;square.style.left=left+'px'; console.log(left);}else{alert('撞到墙啦');};break;
    }
  }else{
    alert('撞到墙啦');
   }
}

function order(){
  var command=oin.value||this.value;
  switch(command){
    case 'tra-left':traStep(command);break;
    case 'tra-right':traStep(command);break;
    case 'tra-top':traStep(command);break;
    case 'tra-bottom':traStep(command);break;
    case 'mov-left':blue.className='left';traStep(command);break;
    case 'mov-right':blue.className='right';traStep(command);break;
    case 'mov-top':blue.className='top';traStep(command);break;
    case 'mov-bottom':blue.className='bottom';traStep(command);break;
  }
}
//主函数
function init(){
  addEvent(tl,'click',order);
  addEvent(tr,'click',order);
  addEvent(tt,'click',order);
  addEvent(tb,'click',order);
  addEvent(ml,'click',order);
  addEvent(mr,'click',order);
  addEvent(mt,'click',order);
  addEvent(mb,'click',order);
  addEvent(odo,'click',order);
}

init();