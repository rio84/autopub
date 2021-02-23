const modelUser=require('../../model/user')
module.exports = {

    login:async function(ctx) {
        var body=ctx.request.body;
        var result={};
        if(body.name){
	        var r=await modelUser.check(body.name,body.pwd);
	        //console.log(JSON.stringify(body),r)
	        result.submit=body;
	        

	        if(r && r.id){
		        ctx.session={
		        	uid:r.id,
		        	name:body.name,
		        	nick:body.name
		        };
		        result.result=1;
		    }else{
		    	result.result=0;
		    }
	    }
        
        return result
    },
    logout:async function(ctx){
    	ctx.session=null;
    	ctx.redirect('login')
    	return 1;
    },

    register:async function(ctx) {
        var body=ctx.request.body;
        var result={};


        var isempty=await modelUser.isempty();
        var allow=isempty || ctx.session.uid;
        result.allow=!!allow;

        if(body.name && allow){

        	result.submit=body;
	        var r=await modelUser.insert(body.name,body.pwd);
	        //console.log(JSON.stringify(body),r);
	        result.result=r;
	    }
	    return result
    }

};