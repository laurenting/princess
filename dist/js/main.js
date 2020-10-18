console.log("加载成功");
// var arr = [{
//     head:"护肤美妆",
//     content:["面膜","妆前隔离","化妆棉"]      
// },
// {
//     head:"个人洗护",
//     content:["洗发水","沐浴露/皂","牙膏"]      
// },
// {
//     head:"日式美食",
//     content:["茶饮料","方便拉面","饼干糕点"]      
// },
// {
//     head:"营养健康",
//     content:["胶原蛋白","日抛美瞳","维矿物质"]      
// },
// {
//     head:"家居清洁",
//     content:["洗衣液","驱蚊器","湿巾"]      
// },
// {
//     head:"家居生活",
//     content:["餐具","家用饰品","床上用品"]      
// },
// {
//     head:"母婴儿童",
//     content:["纸尿裤","洗发沐浴","奶瓶奶嘴"]      
// },
// {
//     head:"时尚服饰",
//     content:["T恤","休闲裤","文胸"]      
// }
// ];
// console.log(JSON.stringify(arr));
require.config({
    paths:{
        jquery:"jquery-1.11.3",
        jquerycookie:"jquery.cookie",
        nav:"transformjson",
    }
})

require(["nav"],function(nav){
    // console.log(transform);
    nav.download();//ajax 导入商品列表
    nav.banner();
    // nav.transform();
    nav.killtime();
    nav.killbar();
    nav.login();
    nav.signup();
    nav.close();
    //signup 
    //login
})
