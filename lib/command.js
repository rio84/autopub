/**
 * Created by wurui on 16/4/17.
 */
var child_process=require('child_process');
module.exports={
    input:function(msg,fn){
        switch (msg){
            /*
            case 'reload':

                var filepath='/root/release'
                try{
                    child_process.exec('sh '+filepath,
                        function(error, stdout, stderr) {

                            fn(JSON.stringify({
                                error:error,
                                stdout:stdout,
                                stderr:stderr

                            }))
                        });
                }catch(e){
                    fn(JSON.stringify({
                        error: e.toString()

                    }))
                }

                break
            case 'ls':
                child_process.exec('ls .',
                    function(error, stdout, stderr) {

                        fn(JSON.stringify({
                            error:error,
                            stdout:stdout,
                            stderr:stderr

                        }))
                    });
                break
                */
            case 'release':

                var MsgBox = {
                    stdout: [],
                    stderr: []
                };
                fn({
                    type:'info',
                    data:'release running'
                })

                var cmd = child_process.spawn('sh', ['release'], {
                    cwd: '/root/'
                });

                cmd.stdout.on('data', function (data) {
                    MsgBox.stdout.push(data.toString())
                    fn({
                        type:'stdout',
                        data:data.toString()
                    })
                    //  console.log('stdout: ', data);
                });

                cmd.stderr.on('data', function (data) {
                    MsgBox.stderr.push(data.toString())
                    fn({
                        type:'stderr',
                        data:data.toString()
                    })
                    //  console.log('stderr: ', data);
                });

                cmd.on('close', function (code) {
                    MsgBox.exitCode = code;
                    MsgBox.type='close';
                    fn(MsgBox)

                });
                cmd.on('error',function(e){

                    fn({
                        type:'error',
                        data: e.message
                    })
                })
                break

            default :
                fn({
                    type:'error',
                    data:'unknown command'
                })
                break
        }

    }
}
