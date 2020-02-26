
_cmd = localStorage.previousCmd;
cmd_arr = _cmd.split(" ");
text=
"Connecting to "+cmd_arr[1]+"... connected.<br/>"+
"Request sent         100%[===================>]     --.-KB/s    in 0s<br/>"+
"If it's a downloadable file, it should be started in few seconds.";
window.open(cmd_arr[1],'_blank')
updateScreen(_cmd,text);