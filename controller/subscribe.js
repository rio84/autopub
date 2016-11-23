/**
 * Created by wurui on 9/24/16.
 */

var jsonstore=require('../lib/jsonstore')
var key='subscribelist'
module.exports.post=function(req,res,next){


    var action=req.query.action;
    var url=req.body.url;
    var arr=jsonstore.r(key)||[];
    switch (action){
        case 'del':
            for(var i= 0,n;n=arr[i];i++){
                if(n.url==url) {
                    arr.splice(i, 1);
                    break
                }
            }
            break
        case 'add':
            arr.push({
                url:url
            })
            break
    }
    jsonstore.w(key,arr);

    res.redirect('subscribe.html')

}

module.exports.get=function(req,res,next){

    res.send({
        data:jsonstore.r(key)
    })
}
