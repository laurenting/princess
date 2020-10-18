define(["jquery","jquery-cookie"], function ($){
    function valueByName(search,name){
        //http://localhost:2333/goodsdetail.html?goods_id=211304.html
        var start = search.indexOf(name + "=" );
        if(start == -1){
            return null
        }else{
            var end = search.length;
        }
        var str = search.substring(start,end);
        var arr =  str.split("=");
        return arr[1];
    }
    function download(){
        var goodsid = valueByName(location.search,"goods_id");
        // alert(goodsid);

        $.ajax({
            url: "../data/data.json",
            success: function (result) {
                for(var k =0;k<result[1].length;k++){
                    $(`<div class="nav-left-item">
                    <div class="nav-left-kind">${result[1][k].head}</div>
                    <div class="nav-left-content"><span>${result[1][k].content[0]}</span>|<span>${result[1][k].content[1]}</span>|<span>${result[1][k].content[2]}</span></div>
                </div>`).appendTo(".nav-left");
                }
                
            },
            error: function (msg) {
                console.log(msg);
            }
        })
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
    return {download
    ,signup
    ,close
    ,login
    ,gotop}
})