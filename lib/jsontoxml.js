/**
20181105
原jsontoxml比较通用，考虑的东西比较多
在这里重写了一个
*/
const cdata=function(str){
    if(str) return '<![CDATA['+ str +']]>';
    return "";
};

const makeNode=function(tagName,content){

	switch(content){
		case null:
		case undefined:
		case false:
		case NaN:
			return ''
		
	}
	
	if(!tagName){
		return content;
	}
	return '<'+tagName+'>'+ content +'</'+tagName+'>'

};
const jsontoxml=function(json,key){
	
	var s='';
	
	switch((json || json===0 || json==='') && json.constructor){
		case String:
			s=json;
			if(/&|<|>/g.test(s) ){
				
				//s=cdata(s);//CDATA 不能嵌套，这是个问题;但转义可以多次
				s=s.replace(/&/g, '&amp;')
	        	.replace(/</g, '&lt;')
	        	.replace(/>/g, '&gt;');
			}
			break

		case Number:

			s=json;
			//console.log(s)
			break

		case Array:
			json.forEach(x=>{
				s+=jsontoxml(x,'i')
			})
			break

		case Date:
			s=json.toString()
			break

		case Function:
			s=json.toString()
			break

		case Boolean:
			s=json?'T':false;
			break
		case Object:
			for(var k in json){
				s+=jsontoxml(json[k],k)
			}
			break

		default:
			s=json && json.toString && json.toString() || null;
			break
	}

	
	return makeNode(key,s);
};
module.exports=function(json,options){
	options=options||{}
	//console.log(json)
	var s='';
	if(options.xslLink){
        options.xmlHeader=true;
        s='<?xml version="1.0" encoding="utf-8" ?><?xml-stylesheet type="text/xsl" href="'+options.xslLink+'"?>'
    }else if(options.xmlHeader) {
        // the user wants an xml header
        s = '<?xml version="1.0" encoding="utf-8" ?>'

    }
    //console.log(s+jsontoxml(json))

	return s+jsontoxml(json)
};