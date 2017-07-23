"use strict";

$(function(){
    var $caret = $("#caret"),
        $output = $("#output"),
        $input = $("#input"),
        $dir = $("#dir");

    var cmdProcessor = new $$commands();

    var dir = "~";
    var userSrv = "haxz0r@scottz0r-site:";

    var processCommand = function(cmd){
        var result = "";

        var inputText = userSrv + dir + "$ " + cmd;

        // Not nothing.
        if (cmd !== "" && cmd != null) {
            result = cmdProcessor._process(cmd);
            result = result + "<br />";
        }

        $output.append(inputText + "<br />");
        $output.append(result);
        $input.text("");
    };

    var handleInput = function(evt){
        var key = evt.which;

        if (key === 13){
            processCommand($input.text());
        } else if(key === 8) {
            var text = $input.text();
            var backed = text.substring(text, text.length - 1);
            $input.text(backed);
        } else {
            $input.append(String.fromCharCode(key));
        }
    };

    $(document).on("keypress", handleInput);
    // Need to capture backspace differently.
    $(document).on("keydown", function(e){
        if (e.keyCode == 8) {
            e.preventDefault();
            handleInput({which: 8});
        }
    });

    setInterval(function(){
        $caret.toggle();
    }, 500);
});