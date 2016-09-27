/**
 * Created by wurui on 9/24/16.
 */
var fs=require('fs');

var dataDir='/var/local/autopub';
if(!fs.existsSync(dataDir)){
    fs.mkdirSync(dataDir)
}
module.exports={
    r:function(key){
        var result=fs.readFileSync(dataDir+'/'+key+'.json')||'null'
        return JSON.parse(result);
    },
    w:function(key,v){

        return fs.writeFileSync(dataDir+'/'+key+'.json',JSON.stringify(v))
    }
};