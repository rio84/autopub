/**
 * Created by wurui on 9/24/16.
 */
module.exports={
    unparm:function(s){
        var obj={};
        var splt= s.split('&');
        for(var i=0;i<splt.length;i++){
            var kv=splt[i].split('=');
            obj[kv[0]]=kv[1]
        }
        return obj;
    }
}