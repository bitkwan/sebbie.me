
_cmd = localStorage.previousCmd;
cmd_arr = _cmd.split(" ");
filename = cmd_arr[1];

if(filename=="*" || !filename){
	$.getJSON("/public/map.json","",function(data){
		_html="";
		$.each(data.public, function(i, item){
			_html=_html+item.filename+" ";
		});
		updateScreen(_cmd,_html);
	});
}else{
	$.get("/public/"+filename,function(text){
		//exist
		updateScreen(_cmd,filename);
	}).fail(function(){
		result="ls: "+filename+": No such file or directory";
		updateScreen(_cmd,result);
	});
}