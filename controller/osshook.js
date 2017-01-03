/**
 * Created by wurui on 9/24/16.
 */

var deploy=require('../lib/deploy')
var fs=require('fs');
var path=require('path');
var tarDir=path.join(__dirname,'../data/tar')

var subscriber=require('../lib/subscriber')

var logger=require('../lib/logger')


module.exports.index=function(req,res,next){
    logger('query',req.query)
    logger('body',req.body)
    res.status('ok').send(req.query)

/*
    var json=req.body;

    var tagInfo={
        owner:owner,
        repos:repo,
        version:version
    }
    var targzPath=tarDir+'/'+[owner,repo,version].join('-')+'.tar.gz';
    deploy.release(tagInfo,function(err,r){

        subscriber.callAll(tagInfo,function(result){
            logger(result.join('\n'))
            fn(err,r)
        });

    })

    fs.createWriteStream(
        targzPath
    )
*/

}