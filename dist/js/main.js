console.log("加载成功");

require.config({
    paths:{
        jquery:"jquery-1.11.3",
        jquerycookie:"jquery.cookie",
        nav:"transformjson"
    }
})

require(["nav"],function(nav){
    // console.log(transform);
    nav.download()
    
})
