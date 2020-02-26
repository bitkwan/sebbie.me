_cmd = localStorage.previousCmd;
cmd_arr = _cmd.split(" ");
text="<iframe src=\""+cmd_arr[1]+"\" style=\"border:1px solid #ccc; width:70%; height:30%;\"></iframe>";
updateScreen(_cmd,text);