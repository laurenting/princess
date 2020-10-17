function addEvent(node, eventType, funcName){
    if(node.addEventListener){
        node.addEventListener(eventType, funcName, false);
    }else{
        //click  onclick
        node.attachEvent("on" + eventType, funcName);
    }
}

//删除事件
function removeEvent(node, eventType, funcName){
    if(node.removeEventListener){
        node.removeEventListener(eventType, funcName);
    }else{
        node.detachEvent("on" + eventType, funcName);
    }
}

function randomColor(){
    var str = "rgba(" + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + ",1)";
    return str;

}
function preDef(ev){
    if(ev.preventDefault){
        ev.preventDefault();
    }else{
        window.event.returnValue = false;
    }
}


//阻止事件冒泡的跨浏览器兼容
function stopBubble(ev){
    if(ev.stopPropagation){
        ev.stopPropagation();
    }else{
        ev.cancelBubble = true;
    }
}

function drag(node){
    //1、添加mousedown，记录相对距离
    node.onmousedown = function(ev){
        var e = ev || window.event;
        var offsetX = e.clientX - node.offsetLeft;
        var offsetY = e.clientY - node.offsetTop;

        //2、mousemove，保持相对距离跟随鼠标移动
        document.onmousemove = function(ev){
            var e = ev || window.event;

            node.style.left = e.clientX - offsetX + 'px';
            node.style.top = e.clientY - offsetY + 'px';
        }
    }

    //3、取消拖拽
    document.onmouseup = function(){
        document.onmousemove = null;
    }
}

function limitDrag(node){
    //1、添加mousedown，记录相对距离
    node.onmousedown = function(ev){
        var e = ev || window.event;
        var offsetX = e.clientX - node.offsetLeft;
        var offsetY = e.clientY - node.offsetTop;

        //2、mousemove，保持相对距离跟随鼠标移动
        document.onmousemove = function(ev){
            var e = ev || window.event;
            var l = e.clientX - offsetX;
            var t = e.clientY - offsetY;

            var windowWidth = document.body.clientWidth || document.documentElement.clientWidth;
            var windowHeight = document.body.clientHeight || document.documentElement.clientHeight;

            //限制出界

            if(l <= 0){
                l = 0;
            }
            if(l >= windowWidth - node.offsetWidth){
                l = windowWidth - node.offsetWidth;
            }

            if(t <= 0){
                t = 0;
            }
            if(t >= windowHeight - node.offsetHeight){
                t = windowHeight - node.offsetHeight;
            }

            node.style.left = l + 'px';
            node.style.top = t + 'px';
        }
    }

    //3、取消拖拽
    document.onmouseup = function(){
        document.onmousemove = null;
    }
}