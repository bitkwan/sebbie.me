function goToBottom(){
	$('html,body').animate({ scrollTop: 9999 }, 0);
}
function updateScreen(cmd,text,hide=0){
	_content = 	$(".screen").html();
	if(hide==1){
		//if hide the command line
		_full_cmd="";
	}else{
		_full_cmd="<font color=\"green\">guest</font>@<font color=\"red\">sebbie.me</font>:~$ "+cmd+"<br/>";
	}
	_new_screen=_content+"<p>"+_full_cmd+text+"</p>";
	$(".screen").html(_new_screen);
	localStorage.previousCon = btoa(_new_screen);
}
function load(_cmd,init=0){
	localStorage.previousCmd=_cmd;
	_cmd = _cmd.split(" ");
	_cmd = _cmd[0];
	_full_cmd="<font color=\"green\">guest</font>@<font color=\"red\">sebbie.me</font>:~$ "+_cmd+"<br/>";
	if(_cmd){
		$.getScript("/supercommand/"+_cmd+".js",function(data, textStatus, jqxhr){
			//print to console
			console.log("Supercommand was performed.");
		}).fail(function(){
			//not super command
			$.get("/command/"+_cmd+".html",function(text){
				//fetch prev conv
				if(init){
					//The first command(welcome message) won't print the command line
					hide=1;
				}else{
					hide=0;
				}
				updateScreen(_cmd,text,hide);

			}).fail(function(){
				// not exsit
				text = "bash: "+_cmd+": command not found";
				updateScreen(_cmd,text);

			});
		});
	}else{
		_content = 	$(".screen").html();
		_new_screen=_content+"<p>"+_full_cmd+"</p>";
		$(".screen").html(_new_screen);
		localStorage.previousCon = btoa(_new_screen);
	}
	goToBottom();

}
goToBottom();
//load welcome msg
if(localStorage.previousCon){
	$(".screen").html(atob(localStorage.previousCon));
}else{
	load("motd",1);
}

//auto focus on command-line
$(".command-line").focus();
$('.command-line').focusout(function(){
	$('.command-line').focus();
});
//process
$(".command-form").submit(function(){
	event.preventDefault();
	_cmd = $(".command-line").val();
	load(_cmd);
	//reset the input
	$(".command-line").val("");
	goToBottom();
});