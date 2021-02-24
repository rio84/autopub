define(function(){
	return {
		getPortStatus:function(port,cb){
			return $.getJSON('/api/project/portstatus',{port:port},cb)
		},
		postProjectAction:function(data,cb){
			return $.post('/api/project/action',data,cb)
		},
		getLogs:function(data,cb){
			return $.getJSON('/api/logs/getlog',data,cb)
		}
		
	}
})