define(["jquery"], function ($) {
    function download() {
        $.ajax({
            url: "../data/data.json",
            success: function (result) {
                // console.log(result[0][2].img);
                for(var k =0;k<result[1].length;k++){
                    $(`<div class="nav-left-item">
                    <div class="nav-left-kind">${result[1][k].head}</div>
                    <div class="nav-left-content"><span>${result[1][k].content[0]}</span>|<span>${result[1][k].content[1]}</span>|<span>${result[1][k].content[2]}</span></div>
                </div>`).appendTo(".nav-left");
                }

                for(var j= 0;j<result[0].length;j++){
                    console.log(result[0][j].img);
                    $(`<li ><img src="${result[0][j].img}" alt=""></li>
                    `).appendTo(".imgBox");
                }
                $(`<li ><img src="${result[0][result[0].length-1].img}" alt=""></li>`).prependTo(".imgBox");
                $(`<li ><img src="${result[0][0].img}" alt=""></li>`).appendTo(".imgBox");
                
                for (var i = 0; i < result.length; i++) {
                    if (result[i].type == "goods") {
                        var name = result[i].data.goods_name;
                        // console.log(name);
                        $(`<a href="http://localhost:2333/goodsdetail.html?goods_id=${result[i].data.goods_id}"><div class="goods-item" goods-id=“${result[i].data.goods_id}”>
                        <img class="goods-img" src="${result[i].data.img_small}" alt="">
                        <h5>${result[i].data.slogan}</h5>
                        <p>${result[i].data.goods_name}</p>
                        <div class="goods-price">¥${result[i].data.market_price}</div>
                    </div></a>`).appendTo(".goods");
                    } else {
                        continue
                    }

                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }
    function banner() {
        const oBanner = document.querySelector(".banner");
        const oUl = document.querySelector(".banner .imgBox");
        const aBtns = document.querySelectorAll(".banner .pointBox li");
        const LeftANDRightBtn = document.querySelectorAll(".leftRightTabs a");
        let iNow = 1; //代表当前显示的图片的下标
        let timer = null;
        let isRunning = false; //代表当前动画是否在执行。

        //一开始就要调用一次
        timerInner();

        //点击按钮的时候，进行小圆点切换和轮播图的切换
        for (var i = 0; i < aBtns.length; i++) {
            aBtns[i].index = i;
            aBtns[i].onclick = function () {
                iNow = this.index + 1;
                tab();
            };
        }

        //自动轮播
        function timerInner() {
            timer = setInterval(function () {
                iNow++;
                tab();
            }, 2000);
        }

        //实现轮播效果
        function tab() {

            // console.log(iNow);
            for (var i = 0; i < aBtns.length; i++) {
                aBtns[i].className = "";
            }
            if (iNow == aBtns.length + 1) {
                aBtns[0].className = "active";
            } else if (iNow == 0) {
                aBtns[aBtns.length - 1].className = "active";
            } else {
                aBtns[iNow - 1].className = "active";
            }

            //开始动画
            isRunning = true;
            startMove(oUl, { left: iNow * -932 }, function () {
                //判断最后一张图片结束的时候
                if (iNow == aBtns.length + 1) {
                    iNow = 1;
                    oUl.style.left = "-932px";

                    //判断第一张图片的时候
                } else if (iNow == 0) {
                    iNow = 5;
                    oUl.style.left = iNow * -932 + "px";
                }
                //这里动画结束
                isRunning = false;
            });
        }

        //给banner添加鼠标的移入和移出
        oBanner.onmouseenter = function () {
            clearInterval(timer);
        };
        oBanner.onmouseleave = function () {
            //重新启动动画
            timerInner();
        };

        //添加左右按钮的点击
        LeftANDRightBtn[0].onclick = function () {
            if (!isRunning) {
                iNow--;
                tab();
            }
            return false;
        };

        LeftANDRightBtn[1].onclick = function () {
            if (!isRunning) {
                iNow++;
                tab();
            }
            return false;
        };

        
        //多物体多样式的运动   startMove(this, "width", 300);

}
function gotop(){
    $("#gotop").on("click",function(){
        // document.body.scrollTop=0;
        clearInterval(timer);
        var timer = setInterval(function(){
            var now = document.documentElement.scrollTop;
            // var distance = null;
            var speed = (0-now)  / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            now = now + speed;
            document.documentElement.scrollTop = now;
            // console.log(now);
            if(now == 0){
                clearInterval(timer);;
            }
        },20)
        

    })
}

function startMove(node, cssObj, complete){ //complete = show;
    clearInterval(node.timer);
    node.timer = setInterval(function(){
        
        var isEnd = true; //假设所有动画都都到达目的值

        for(var attr in cssObj){
            //取出当前css样式的目的值
            var iTarget = cssObj[attr];
            //1、获取当前值
            var iCur = null;

            if(attr == "opacity"){
                iCur = parseInt(parseFloat(getStyle(node, "opacity")) * 100);
            }else{
                iCur = parseInt(getStyle(node, attr))
            }
            //2、计算速度
            var speed = (iTarget - iCur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if(attr == "opacity"){
                iCur += speed;
                node.style.opacity = iCur / 100;
                node.style.filter = `alpha(opacity=${iCur})`;

            }else{
                node.style[attr] = iCur + speed + 'px';
            }
            
            //当前值是否瞪目目的值
            if(iCur != iTarget){
                isEnd = false;
            }
        }
        

        if(isEnd){
            //说明都到达目的值
            clearInterval(node.timer);
           
            if(complete){
                complete.call(node);
            }
        }
    }, 30);
/*
    node  元素节点
    cssStyle  获取css样式类型
*/
function getStyle(node, cssStyle){
    if(node.currentStyle){
        return node.currentStyle[cssStyle];
    }else{
        return getComputedStyle(node)[cssStyle];
    }
}
    }
    function transform(){
        var arr=[{img:"https://oss4.wandougongzhu.cn/7fcc6eb757c852ebe089c3858c3da3ea.png?x-oss-process=image/resize,w_1242,h_666/format,webp"},
        {img:"https://oss3.wandougongzhu.cn/b0c6ec4e078ff17d4b6a6fe694ad4a2c.png?x-oss-process=image/resize,w_1242,h_666/format,webp"},
        {img:"https://oss4.wandougongzhu.cn/ce0d54c9af7a6f761dd4f181a7900040.png?x-oss-process=image/resize,w_1242,h_666/format,webp"},
        {img:"https://oss3.wandougongzhu.cn/b0c6ec4e078ff17d4b6a6fe694ad4a2c.png?x-oss-process=image/resize,w_1242,h_666/format,webp"},
        {img:"https://oss4.wandougongzhu.cn/ce0d54c9af7a6f761dd4f181a7900040.png?x-oss-process=image/resize,w_1242,h_666/format,webp"}]
        return console.log(JSON.stringify(arr));
    }
    function killtime(){
        setInterval(function(){
            var d = new Date();
            var min = 59-d.getMinutes();
            var sec = 59-d.getSeconds();
            var minleft = min<10?"0"+min:min;
            var secleft = sec<10?"0"+sec:sec;
            $(".lasttime").text(`${minleft} : ${secleft}`);
            // console.log(minleft,secleft);
        },1000)
    }
    function killbar(){
        var progress = Number($(".progress-num").text());
        var wide = 1.26*progress;
        $(".id1 .bar-inner").css("width",`${wide}`).css("background-color","orangered");
    }
    function login(){
        $("#login").on("click",function(){
            $(".login").css("display","block");
        })
    }
    function signup(){
        $("#signup").on("click",function(){
            $(".signup").css("display","block");
        })
    }
    function close(){
        $(".close").on("click",function(){
            $(".login").css("display","none");
            $(".signup").css("display","none");
        })
    }
    function tocar(){
        $("#car").on("click",function(){
            window.location.href = 'http://localhost:2333/car.html'
        })
    }
    return {
        download,
        banner,
        transform,
        killtime,
        killbar,
        login,
        signup,
        close,
        gotop,
        tocar
    }
})