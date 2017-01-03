/**
 * Created by wurui on 9/24/16.
 */
var formidable=require('formidable');
var deploy=require('../lib/deploy-upload')
var fs=require('fs');
var path=require('path');
var tarDir=path.join(__dirname,'../data/tar')

var subscriber=require('../lib/subscriber')

var logger=require('../lib/logger')


module.exports.index=function(req,res,next){

    //console.log('body',req.headers['user-agent'])
    if(req.headers.vcode!='20170103' || req.headers['user-agent']!='autopub' ){
        return res.status(404).send('')

    }


    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = tarDir; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 50 * 1024 * 1024; //文件大小
    form.type = true;

    form.parse(req, function(err, fields, files) {
        if (err) {
            res.send(err);
            return;
        }
        var tempPath=files && files.file && files.file.path;

        logger(fields)
        logger(files.file.type)
        var tagInfo=JSON.parse(fields.json);
        tagInfo.repos=tagInfo.name;
        tagInfo.tarPath=tempPath;

        switch (files.file && files.file.type){
            case 'application/x-tar':
                deploy.release(tagInfo,function(err,r){

                    res.send({code:0,error:err})

                    subscriber.callAll(tagInfo,function(result){
                        logger(result.join('\n'))
                    });

                })

                break
            default :
                fs.unlinkSync(tempPath);
                res.send({code:1,error:'not a *.tar file'})
                break
        }

    });

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