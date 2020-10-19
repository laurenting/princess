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
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                console.log(cookieArr);
                
                var str = ` <tr class="thead">
                <th>商品</th>
                <th>单价</th>
                <th>数量</th>
                <th>总价</th>
                <th>操作</th>
            </tr>`;
            var money = 0;
                for(var j =0; j<cookieArr.length;j++){
                    for(var i =0;i<result.length;i++){
                        if ((result[i].type == "goods" )&&(result[i].data.goods_id == cookieArr[j].id )) {
                            console.log(result[i].data);
                            str += `
                <tr>
                    <td><img  src="${result[i].data.img_small}" alt="">${result[i].data.goods_name}</td>
                    <td>${result[i].data.final_price}</td>
                    <td><div class="goods-count-con">
                    <span class="btn-count minus" id="${cookieArr[j].id}">-</span>
                    <span class="goods-count-num">${cookieArr[j].num}</span>
                    <span class="btn-count plus" id="${cookieArr[j].id}">+</span>
                </div></td>
                    <td>${cookieArr[j].num * result[i].data.final_price}</td>
                    <td><div class="delete" id="${cookieArr[j].id}">delete</div></td>
                </tr>`;
                            money += cookieArr[j].num * result[i].data.final_price;
                continue;
                }
                        }
                    }
                    
                $(".goodscar").html(str);
                $("#pay").html(`<div class="finalprice pay">支付 </div>
                <div class="finalprice">合计：${money}元 </div>`);

                $(".plus").on("click",function(){
                    var cookieStr = $.cookie("goods");
                    var cookieArr = JSON.parse(cookieStr);
                    for(var i = 0 ;i <cookieArr.length;i++){
                        if(this.id == cookieArr[i].id){
                            cookieArr[i].num++;
                            console.log(cookieArr);
                            $.cookie("goods",JSON.stringify(cookieArr));
                            download();
                        }
                    }
                })

                $(".minus").on("click",function(){
                    var cookieStr = $.cookie("goods");
                    var cookieArr = JSON.parse(cookieStr);
                    for(var i = 0 ;i <cookieArr.length;i++){
                        if(this.id == cookieArr[i].id){
                            cookieArr[i].num = (cookieArr[i].num-1)>=1?cookieArr[i].num-1:cookieArr.splice(i,1);
                            console.log(cookieArr);
                            $.cookie("goods",JSON.stringify(cookieArr));
                            download();
                        }
                    }
                })

                $(".delete").on("click",function deletegoods(){
                    var cookieStr = $.cookie("goods");
                    var cookieArr = JSON.parse(cookieStr);
                    for(var i = 0 ;i <cookieArr.length;i++){
                        if(this.id == cookieArr[i].id){
                            cookieArr.splice(i,1);
                            console.log(cookieArr);
                            $.cookie("goods",JSON.stringify(cookieArr));
                            download();
                        }
                    }
                })
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