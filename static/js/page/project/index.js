define(['../../api'],function(Api){

	var portNodes=$('.J_port');
	
	var createAction=function(port_on){
		if(port_on){
			return '<b data-action="restart" class="linklike">重启</b><b data-action="stop" class="linklike">停机</b>'
		}else{
			return '<b data-action="start" class="linklike">启动</b>'
		}
		
	  									
	};
	var loop_do=function(index){

		index=index||0;
		var portNode=portNodes[index];
		if(!portNode){
			return
		}
		var port=portNode.getAttribute('data-value');
		portNode.setAttribute('data-status','')
		Api.getPortStatus(port,function(r){
			portNode.setAttribute('data-status',r.data?'on':'off');

			$(portNode).closest('tr').find('.J_action').html(createAction(r.data));

			loop_do(index+1);
		});

	};
	loop_do();

	setInterval(loop_do,3000);

	
	$('.J_action').on('click','[data-action]',function(e){
		var action=this.getAttribute('data-action'),
			//port=this.parentNode.getAttribute('data-value'),
			dirname=this.parentNode.getAttribute('data-dir');
			
		if(confirm('确认对项目('+dirname+')进行操作('+action+')?')){
			Api.postProjectAction({
				//port:port,
				action:action,
				dir:dirname
			},function(r){

			})
		}
		
	})
})