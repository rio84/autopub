/**
 * Created by wurui on 9/28/16.
 */
module.exports=function(){
    var args=[].slice.call(arguments,0);
    var now=new Date();
    var nowStr=[now.getFullYear(),now.getMonth()+1,now.getDate()].join('/') +' '
        + [now.getHours(),now.getMinutes(),now.getSeconds()*1000+now.getMilliseconds()].join(':');
    args.unshift('['+nowStr+']')
    console.log.apply(console,args)
}