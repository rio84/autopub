/**
 * Created by wurui on 9/24/16.
 */
var request=require('request');
var jsonstore=require('../lib/jsonstore')
var util=require('../lib/util')
module.exports.index=function(req,res,next){

    var q=req.body,

        client_id= q.client_id,
        client_secret= q.client_secret,
        state= q.state,
        host=req.headers.host;

    if(!(client_id && client_secret && state)){
        return res.send('required: client_id/client_secret/state');
    }
    var redirect_uri=encodeURIComponent( 'http://'+host+'/oauth/callback/'+client_id+client_secret+state);



    //return res.send('ok')
    var link='https://github.com/login/oauth/authorize?scope=repo&client_id='+client_id+'&state='+state+'&redirect_uri='+redirect_uri;
    console.log(link)
    res.redirect(link);

}

module.exports.callback=function(req,res,next){


    var q=req.query,
        param=req.params,
        key= param.key||'',
        code= q.code,
        host=req.headers.host;


    var client_id=key.substr(0,20);
    var client_secret=key.substr(20,40);
    var state=key.substr(60);

    if(q.error){
        return res.send(q)
    }

    if(q.code){

        var redirect_uri='http://'+host+'/oauth/callback/'+client_id+client_secret+state;
        var link='/codegot.html?client_id='+client_id
            +'&client_secret='+client_secret
            +'&code='+code
            +'&state='+state
            +'&redirect_uri='+( redirect_uri)

        request.post('https://github.com/login/oauth/access_token',{
            form:{
                client_id:client_id,
                client_secret:client_secret,
                code:code,
                state:state,
                redirect_uri:redirect_uri
            }
        },function(err,httpResponse,body){
            //access_token=4efff1694f2599b88e48a28b9bf1aab835d5f067&scope=repo&token_type=bearer

            if(err){
                res.send('err')
            }else{
                var json=util.unparm(body);
                jsonstore.w('git_token_'+client_id,json)
                res.send({code:'ok!',body:body})
            }
            //console.log(err,body);
        })
        //res.redirect(link);

    }else if(q.access_token){
        var token_type= q.token_type,
            access_token=q.access_token;

        // access_token=e72e16c7e42f292c6912e7710c838347ae178b4a&scope=user%2Cgist&token_type=bearer
        var json=util.unparm(util)

        var json={
            key:key,
            token_type:token_type,
            access_token:access_token
        };

        jsonstore.w('git_token',json)

        return res.send(json);
    }else{
        res.send(q)
    }

}
///repos/:owner/:repo/releases