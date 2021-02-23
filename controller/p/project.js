const path=require('path');
const fs=require('fs');

module.exports = {

    index:async function(ctx) {
        var body=ctx.request.body;
        

        var appDir=path.join(__dirname,'../../../')
        var list=fs.readdirSync(appDir);

        var applist=[];
        
        list.forEach(x=>{
        	var autopubjsonfile=path.join(appDir,x,'autopub.json');
        	if(fs.existsSync(autopubjsonfile)){
        		var json=JSON.parse(fs.readFileSync(autopubjsonfile).toString())
        		applist.push({
        			dirname:x,
        			name:json.name,
        			version:json.version,
        			"static":json.static,
        			owner:json.owner,
        			port:json.port,
        			hostcount:Array.isArray(json.server_host)?json.server_host.length:1
        		});
        		        		
        	}
        	
        })
        //console.log(applist.length);



        return {
        	list:applist,

        	dir:appDir,

        	
        }
    },
   

};