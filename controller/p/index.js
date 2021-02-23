
//////////////////////////
const jsontoxml=require('../../lib/jsontoxml');
const assetversion=Date.now();
const PageController={
    root:require('./root'),
    user:require('./user'),
    project:require('./project'),
   
    //client:require('../client/index'),
  
};

const getFullXML=function(data,mainxsl){
    var xslLink;
    var xsl_dir='/xsl';
    
    
    xslLink=mainxsl?xsl_dir+'/'+mainxsl+'.xsl?v'+assetversion:null
    
    return jsontoxml(
        {
            root:data

        },{//尽量用缓存吧，不强刷
            xslLink:xslLink//mainxsl?mainxsl+'.xsl?v'+assetVersion.get(env):null
        })
};

module.exports =async function(ctx, next) {

    var params=ctx.params,
        grp=params.group||'',
        page=params.page||'index',
        ext=params.ext,
        query=ctx.query,
        userAgent=ctx.get('User-Agent');

    
    var controller=grp?PageController[grp]:PageController.root;
    var mainxsl='404';

    var arr=[];
    if(grp){
        arr.push(grp)
    }
    if(params.source_type){
        arr.push(params.source_type)
    }
    if(params.action){
        arr.push(params.action)
    }else{
        arr.push(page)
    }
    mainxsl= arr.join('/')//grp?grp+'/'+page:page;

    var qs={};
 

    for(var k in query){
        
        qs[k]=query[k];
        
    }
    var now=new Date();
    var dat={

        assetversion:assetversion,
        
        q:qs,
        
        h:{
            origin:ctx.origin,
            referer:ctx.get('Referer'),
            path:ctx.path,
            xslpath:mainxsl,
            pathserial:(()=>{
                var a=[];
                a.push(params.group)
                a.push(params.group_id?'d':'p')
                if(params.source_type){
                    a.push(params.source_type)
                    a.push(params.source_id?'d':'p')
                }
                
                return a.join('-')
            })(),
            /*
            group:params.group,
            group_id:params.group_id,
            source_type:params.source_type,
            source_id:params.source_id,
            action:params.action,*/
        },
        sys:{
            
            time:{
                y:now.getFullYear(),
                M:now.getMonth()+1,
                d:now.getDate(),
                h:now.getHours(),
                m:now.getMinutes(),
                s:now.getSeconds(),
                ms:now.getMilliseconds(),
                ts:now.getTime()
            },
            ts_q:now.getTime(),
        },
        //target:target,
        
    };

    
    if(controller && typeof controller[page]=='function'){
        try{
            dat.data= await controller[page].call(controller,ctx)
        }catch(e){
            dat.error=e.toString()
        }
    }
    var session=ctx.session;
    if(session && session.uid){
        dat.login={
            uid:session.uid,
            
            nick:session.nick,
            name:session.name,
        }
    }
    dat.sys.ts_r=Date.now();

    ctx.type='text/xml';
    
    ctx.body = getFullXML(dat,mainxsl);
    

    

};

