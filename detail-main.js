require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "detail":"detail"
    },
    shim:{
        "jquery-cookie":["jquery"]
    }
})

require(["detail"],function(detail){
    // console.log(transform);
    // detail.download();//ajax 导入商品列表
    detail.download();
})
