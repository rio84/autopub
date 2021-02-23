define(function(){
	return {
		getPortStatus:function(port,cb){
			return $.getJSON('/api/project/portstatus',{port:port},cb)
		},
		postProjectAction:function(data,cb){
			return $.post('/api/project/action',data,cb)
		},
		
	}
})