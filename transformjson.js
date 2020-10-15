define(["jquery"],function($){
    function download(){
        $.ajax({
            url:"../data/data.json",
            success:function(result){
                console.log(result);
                for(var i=0;i<result.length;i++){
                    if(result[i].type=="goods"){
                        var name = result[i].data.goods_name;
                        console.log(name);
                        $(`<a href="https://m.wandougongzhu.cn/product/${result[i].data.goods_id}.html"><div class="goods-item" goods-id=“${result[i].data.goods_id}”>
                        <img class="goods-img" src="${result[i].data.img_small}" alt="">
                        <h5>${result[i].data.slogan}</h5>
                        <p>${result[i].data.goods_name}</p>
                        <div class="goods-price">¥${result[i].data.market_price}</div>
                    </div></a>`).appendTo(".goods");
                    }else{
                        continue
                    }
                    
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    return {
        download
    }
})