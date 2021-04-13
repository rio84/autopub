
const deployOXApp=require('../../lib/deploy-oxapp')
const path=require('path');
const fs=require('fs');

const formidable=require('formidable');

var errorCounter=10;
module.exports = {
    deploy:async function(ctx){
        if(!errorCounter){
            ctx.status=401;
            throw 'try enough';
            
        }
        var code=ctx.headers['auth-code'];
        
        if(code!='20999iafsaf'){
            ctx.status=403;
            throw 'Error'
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


        if (result.files.file && result.files.file.type == 'application/x-tar'){
            //return await cmd.deploy();
            
            return await new Promise((resolve,reject)=>{
                //暂时不动这块代码吧
                deployOXApp.release(result.files.file.path,(err,r)=>{

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

    },
    set_domain:async function(ctx){
        var code=ctx.headers['auth-code'];
        
        if(code!='20999iafsaf'){
            ctx.status=403;
            throw 'Error'
        }
        var q=ctx.request.body;
        return await deployOXApp.nginx_set_domain(q.port,q.domain);
    },
    undeploy:async function(ctx){
        var code=ctx.headers['auth-code'];
        
        if(code!='20999iafsaf'){
            ctx.status=403;
            throw 'Error'
        }
        var q=ctx.request.body;
        return await deployOXApp.undeploy(q.port,q.pjid);
    }
};




