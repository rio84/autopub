/**
 * Created by wurui on 9/24/16.
 */
var request=require('request');
var jsonstore=require('../lib/jsonstore')
var util=require('../lib/util');
var deploy=require('../lib/deploy')
var fs=require('fs');
var path=require('path');
var tarDir=path.join(__dirname,'../data/tar')
module.exports.index=function(req,res,next){



};
var release=function(){

};

module.exports.test=function(req,res,next){

    var access_token=jsonstore.r('git_token').access_token;
    var headers={
        "User-Agent": 'autopub',
        Authorization: "token "+access_token,
        Accept: 'application/json'
    };
    var owner='rio84',
        port='8000',
        repo='HiStock';
    var api='https://api.github.com/repos/'+owner+'/'+repo+'/tags';

    console.log('api:',api)
    return request({
        url: api,
        headers: headers
    },function(err,response,body){
       // console.log(response.statusCode,body)
        var json=JSON.parse(body);
        console.log('tag got!')

        var tag0=json[0];
        var matchName;//=tag0.name.match(/^rls\/((\d\.)*\d)$/)

        if(tag0 && (matchName=tag0.name.match(/^rls\/((\d\.)*\d)$/))){
            console.log('getting tarbll '+tag0.name)
            request({
                url:tag0.tarball_url,
                headers:headers
            }).pipe(fs.createWriteStream(tarDir+'/'+[owner,repo,matchName[1]].join('-')+'.tar.gz')).on('error',function(err){



                res.send({
                    code:500,
                    error:err
                })
            }).on('close',function(err,result){
                console.log('deploying')
                deploy.release({
                    owner:owner,
                    repos:repo,
                    port:port,
                    tag:matchName[1]
                },function(err,r){
                    res.send({
                        error:err,
                        result:r
                    })
                })

            })
        }else{
            res.send({code:response.statusCode,msg:'no tag'})
        }


       // res.send({code:response.statusCode,data:JSON.parse(body)})
    });


    
}
///repos/:owner/:repo/releases