
const cmd=require('../../lib/cmd');
const deploy=require('../../lib/deploy-upload')

const modelUser=require('../../model/user')

const path=require('path');
const fs=require('fs');

const formidable=require('formidable');


var errorCounter=10;
module.exports = {

    deploy:async function(ctx) {
        
        if(!errorCounter){
            ctx.status=401;
            throw 'try enough';
            
        }
        var name=ctx.headers['auth-user'],
            pwd=ctx.headers['auth-pass'];

        var authResult=await modelUser.check(name,pwd);
        if(!authResult || !authResult.id){
            ctx.status=403;
            throw 'username password not match'
        }


        var form = new formidable.IncomingForm(); //创建上传表单
        form.encoding = 'utf-8'; //设置编辑
        form.uploadDir = path.join(__dirname,'../../data/tar'); //设置上传目录
        form.keepExtensions = true; //保留后缀
        form.maxFieldsSize = 50 * 1024 * 1024; //文件大小
        form.type = true;

        var result=await new Promise((resolve,reject)=>{
            form.parse(ctx.req, (err, fields, files)=>{
                if(err){
                    return reject(err)
                }
                resolve({
                    fields:fields,
                    files:files
                });
            });

        });

        var tempPath=result.files && result.files.file && result.files.file.path;

            
        var tagInfo=JSON.parse(result.fields.json);
        tagInfo.repos=tagInfo.name;
        tagInfo.tarPath=tempPath;

        if (result.files.file && result.files.file.type == 'application/x-tar'){
            //return await cmd.deploy();
            //return tagInfo
            return await new Promise((resolve,reject)=>{
                //暂时不动这块代码吧
                deploy.release(tagInfo,(err,r)=>{

                    if(err){
                        reject(err)
                    }else{
                        resolve(r)
                    }

                })
            })

        }else{
            throw 'not a *.tar file'
        }

        
        return 1
    }
};




