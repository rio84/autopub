/**
 * Created by wurui on 9/28/16.
 */
module.exports=function(){
    var args=[].slice.call(arguments,0);
    var now=new Date();
    var nowStr=[now.getFullYear(),now.getMonth()+1,now.getDate()].join('/') +' '
        + [now.getHours(),now.getMinutes(),now.getSeconds() + (now.getMilliseconds()/1000).toFixed(3)].join(':');
    args.unshift('['+nowStr+']')
    console.log.apply(console,args)
}