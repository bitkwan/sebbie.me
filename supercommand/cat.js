
_cmd = localStorage.previousCmd;
cmd_arr = _cmd.split(" ");
filename = cmd_arr[1];


if(filename=="*"){
	$.getJSON("public/map.json","",function(data){
		localStorage.tmp="";
		_i = 0;
		$.each(data.public, function(i, item){
			
			$.get("public/"+item.filename,function(text){
				_i = _i+1;
				if(item.filename.includes("json")){
					text=JSON.stringify(text)
				}
				if(_i>1){
					updateScreen(_cmd,text,1);
				}else{
					updateScreen(_cmd,text);
				}
			});
		});
	});
}else{
	$.get("/public/"+filename,function(text){
		//exist
		updateScreen(_cmd,text);
	}).fail(function(){
		result="cat: "+filename+": No such file";
		updateScreen(_cmd,result);
	});
}