console.log("加载成功");

require.config({
    paths:{
        transform:"transformjson"
    }
})

require(["transform"],function(transform){
    console.log(transform);
    
})
