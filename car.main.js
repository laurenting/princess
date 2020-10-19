require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "car":"car"
    },
    shim:{
        "jquery-cookie":["jquery"]
    }
})

require(["car"],function(car){
    // console.log(transform);
    // detail.download();//ajax 导入商品列表
    car.download();
    car.login();
    car.signup();
    car.close();
    car.gotop();
    // car.drop();
})
