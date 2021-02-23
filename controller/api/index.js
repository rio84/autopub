
//////////////////////////

const ApiController={
    
    project:require('./project'),
   
    //client:require('../client/index'),
  
};

module.exports = async (ctx, next) =>{


    var params=ctx.params,
        grp=params.group||'',
        which=params.which||'';    
    var exportObj=ApiController[grp];

    var dat={
        code:0
    };
    if(!ctx.session.uid){
        ctx.body={code:1,error:'请登录'}
        return;
    }

    if(exportObj && typeof exportObj[which]=='function'){
        try{
            var ret=await exportObj[which].call(exportObj,ctx);
            ctx.type=ctx.type||'json';

           // console.log('++++++++',ctx.type,ctx.response.is('json'));
            if(ctx.response.is('json')){
                dat.data=ret;
            }else{
                dat=ret;
            }

        }catch(e){
            dat.code=1;
            dat.error=e.toString();
            //console.error(e);
        }
        
    }else{//console.log('++++++++',dat)
        dat.code=1;
        dat.error='no data';
    }
    ctx.body = dat

};

