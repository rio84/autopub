/**
 * Created by wurui on 9/24/16.
 */
var fs=require('fs');
var path=require('path');
var dataDir=path.join(__dirname,'../data');
module.exports={
    r:function(key){
        var result=fs.readFileSync(dataDir+'/'+key+'.json')||'null'
        return JSON.parse(result);
    },
    w:function(key,v){

        return fs.writeFileSync(dataDir+'/'+key+'.json',JSON.stringify(v))
    }
};