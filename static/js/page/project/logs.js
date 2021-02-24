define(['../../api'],function(Api){
	var showLog=function(){
        Api.getLogs({
            limit:$('#J_Limit').val()
        },function(r){
            if(r && r.data && r.data.length){
                var html='';
                r.data.reverse();
                for(var i= 0;i< r.data.length;i++){
                    var n= r.data[i];
                    html+='<p class="log">'+n+'</p>'
                }
                $('#J_Container').html(html);
            }

            var delay=$('#J_Refresh').val() -0;

            if(delay){
                setTimeout(showLog,delay)
            }else{
                showLog();

            }

        })
    };
    showLog();
})