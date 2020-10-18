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
                for (var i = 0; i < result.length; i++) {
                    if ((result[i].type == "goods" )&&(result[i].data.goods_id == goodsid )) {
                       console.log(result[i].data);
                       $(`<div class="product">
                       <div class="product-left">
                           <div class="productimg">
                           <div class="bigimg">
                               <img src="${result[i].data.img_small}" alt="">
                           </div> 
                           <div class="imgbox">
                               <div class="imgcontainer">
                                   <ul>
                                       <li><img src="${result[i].data.img_small}" alt=""></li>
        
                                   </ul>
                               </div>
                           </div>
                           </div>
                       </div>
                       <div class="product-right">
                           <h5>${result[i].data.short_title}</h5>
                           <div class="goods-name"><h3>${result[i].data.goods_name}</h3></div>
                           <div class="goods-point">${result[i].data.slogan}</div>
                           <a class="goods-extend-info" href="https://m.wandougongzhu.cn/product/goodsTagsDesc?tag_key=23,8,11,34&amp;mtag_ids=&amp;bar=&amp;color=">
                               <div class="goods-extend-intro " style="color: #9E9E9E">
                   <i>✔︎</i>假一赔十
               </div>
                               <div class="goods-extend-intro " style="color: #9E9E9E">
                   <i>✔︎</i>包税
               </div>
                               <div class="goods-extend-intro " style="color: #9E9E9E">
                   <i>✔︎</i>保税仓发货
               </div>
                               <div class="goods-extend-intro " style="color: #9E9E9E">
                   <i>✔︎</i>跨境商品
               </div>
                           </a>
                           <div class="goods-price">
                               <span>价格</span>
                               <span>¥</span>
                               <span>${result[i].data.final_price}</span>
                               <span>参考价${result[i].data.market_price}元</span>
                           </div>
                           <div class="goods-count">
                               <div class="goods-count-text">数量</div>
                               <div class="goods-count-con">
                                   <span class="btn-count minus">-</span>
                                   <span class="goods-count-num">1</span>
                                   <span class="btn-count plus">+</span>
                               </div>
                           </div>
                           <div class="goods-btns">
                               <div class="btn-purchase">
                                   <div class="sell-btn"><img src="https://s.wandougongzhu.cn/s/ba/2x_f39585.png" alt="">加入购物车</div>
                               </div>
                               <div class="btn-collect">
                                   <div class="collect-btn"><img src="https://s4.wandougongzhu.cn/s/e6/123_9153b3.png" alt="">收藏</div>
                               </div>
                           </div>
                       </div>
                    </div>`).appendTo(".mainbody");
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