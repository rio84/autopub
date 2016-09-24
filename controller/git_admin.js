/**
 * Created by wurui on 9/24/16.
 */
var request=require('request');
var jsonstore=require('../lib/jsonstore')
var util=require('../lib/util')
module.exports.index=function(req,res,next){



};

module.exports.test=function(req,res,next){

    var access_token=jsonstore.r('git_token').access_token;
    var api='https://api.github.com/repos/rio84/HiStock/releases';
    console.log('api:',api)
    return request({
        url: api,
        headers: {
            "User-Agent": 'autopub',
            Authorization: "token "+access_token,
            Accept: 'application/json'
        }
    },function(err,response,body){
       // console.log(response.statusCode,body)
        res.send({code:response.statusCode,data:JSON.parse(body)})
    });

    request('http://google.com/doodle.png').pipe(fs.createWriteStream('doodle.png'))
    
}
///repos/:owner/:repo/releases