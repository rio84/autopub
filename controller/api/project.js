
const cmd=require('../../lib/cmd');

const path=require('path');
const fs=require('fs');

module.exports = {

    portstatus:async function(ctx) {
        
        return !!(await cmd.lsof(ctx.query.port))
    },
   
    action:async function(ctx){
        var body=ctx.request.body,
            action=body.action,
            dir=body.dir;

        var autopubjsonfile=path.join(__dirname,'../../../',dir,'autopub.json');
        
        if(!fs.existsSync(autopubjsonfile)){
            
            throw '找不到项目目录'
        }
        var json=JSON.parse(fs.readFileSync(autopubjsonfile).toString())
        /*
        applist.push({
            dirname:x,
            name:json.name,
            version:json.version,
            "static":json.static,
            owner:json.owner,
            port:json.port,
            hostcount:Array.isArray(json.server_host)?json.server_host.length:1
        });
        */

        switch(body.action){
            case 'restart':
            await cmd.killPort(json.port);
            await cmd.startApp(json);
            break
            case 'stop':
            await cmd.killPort(json.port);
            break

            case 'start':
            await cmd.startApp(json);
            break
        }
        return 1;
    },

/*
    requireport:async function(ctx){
        
        for(var i=0;i<10;i++){
            var port=20000 +Math.floor( 10000*Math.random() );
            var checkresult=!!(await cmd.lsof(port))
            if(!checkresult){
                return port;
            }
            continue
        }
        throw 'No idle port found'
        
    }*/

};