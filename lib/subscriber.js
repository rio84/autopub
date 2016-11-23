/**
 * Created by wurui on 9/24/16.
 */
var request=require('request');
var jsonstore=require('../lib/jsonstore')
var key='subscribelist'

module.exports.callAll=function(data,fn){
    var arr=jsonstore.r(key)||[];
    var json=JSON.stringify(data);
    var result=[];
    for(var i= 0,n;n=arr[i];i++){
        var url= n.url;
        request({
            url:url,
            headers:{
                "User-Agent": 'autopub',
                Accept: 'application/json'
            },
            qs:{
                json:json
            },
            timeout:2000
        }).on('response',function(response){

        }).on('data', function(data) {
            result.push('#subscriber#'+data);

            if(result.length==arr.length){
                fn && fn(result);
            }
        }).on('error', function(data) {
            result.push('#subscriber#'+data);

            if(result.length==arr.length){
                fn && fn(result);
            }
        })
    }

}
