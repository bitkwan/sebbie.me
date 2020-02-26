function goToBottom(){
	$('html,body').animate({ scrollTop: 9999 }, 0);
}
function load(_cmd,init=0){
	_cmd = _cmd.split(" ");
	_cmd = _cmd[0];
	_full_cmd="<font color=\"green\">guest</font>@<font color=\"red\">sebbie.me</font>:~$ "+_cmd+"<br/>";
	$.getScript("/supercommand/"+_cmd+".js",function(data, textStatus, jqxhr){
		//print to console
		console.log("Supercommand was performed.");
	}).fail(function(){
		//not super command
		$.get("/command/"+_cmd+".html",function(text){
			//fetch prev conv
			_content = 	$(".screen").html();

			if(init){
				//only for motd
				_full_cmd="";
			}
			_new_screen=_content+"<p>"+_full_cmd+text+"</p>";
			$(".screen").html(_new_screen);
			localStorage.previousCon = btoa(_new_screen);

		}).fail(function(){
			// not exsit
			_content = 	$(".screen").html();
			text = "bash: "+_cmd+": command not found";
			_new_screen=_content+"<p>"+_full_cmd+text+"</p>";
			$(".screen").html(_new_screen);
			localStorage.previousCon = btoa(_new_screen);

		});
	});
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