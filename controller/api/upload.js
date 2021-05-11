

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
        var authCode=ctx.headers['auth-code'];

        var authResult=await modelUser.checkAuthCode(authCode);
        if(!authResult){
            ctx.status=403;
            throw 'username password not match'
        }

            
        return await new Promise((resolve,reject)=>{
            var bufList=[],
            bufLen=0;

            ctx.req.on('data',(data)=>{
                //console.log('isBuffer',Buffer.isBuffer(data))
                bufList.push(data);
                bufLen+=data.length;
            }).on('end',()=>{
                //console.log('bufLen='+bufLen);
                const filepath=path.join(__dirname,`../../data/tmp${Math.random()}.tar`)
                
                fs.writeFileSync(filepath,Buffer.concat(bufList,bufLen));

                //return resolve(tagInfo);
                //暂时不动这块代码吧
                deploy.release(filepath,(err,r)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(r)
                    }

                })
                
           
                
            })

            
        })


       
        
        return 1
    }
};




