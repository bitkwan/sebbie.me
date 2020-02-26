_cmd = localStorage.previousCmd;
cmd_arr = _cmd.split(" ");
value_arr = cmd_arr[1].split("=");
if(value_arr[0] == "mouse"){
	//modify mouse mode
	if(value_arr[1] == "v" || value_arr[1] == "view"){
		$(".command-line").data("always-focus",0);
		localStorage.tmp = "Mouse view mode = Enabled";
	}else {
		$(".command-line").data("always-focus",1);
		localStorage.tmp = "Mouse view mode = Disabled";
	}

}else{
	localStorage.tmp = "Unknown configuration section '"+value_arr+"'";
}

updateScreen(_cmd,localStorage.tmp);