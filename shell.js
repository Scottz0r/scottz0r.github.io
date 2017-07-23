"use strict";

// Wait for the window to load before showing shell. This prevents
// flicker of the shell warning.
$(window).on("load", function(){
    $("body").show();
});

$(function(){
    // Mobile warning. This shell requires a keyboard, and a mobile browser
    // is not going to open it. Sad face.
    if (/Mobi/.test(navigator.userAgent)) {
        $("#mobileWarn").show();
    } else {
        $("#mobileWarn").hide();
    }

    var $caret = $("#caret"),
        $output = $("#output"),
        $input = $("#input"),
        $dir = $("#dir");

    var cmdProcessor = new $$commands();

    var dir = "~";
    var userSrv = "haxz0r@scottz0r-site:";

    // Process a command (using $$commands processor) for the 
    // given input string.
    var processCommand = function(cmd){
        var result = "";

        var inputText = userSrv + dir + "$ " + cmd;

        // Not nothing.
        if (cmd !== "" && cmd != null) {
            result = cmdProcessor._process(cmd);
            result = result + "<br />";
        }

        // Copy the stuff in input to the output, then reset input.
        $output.append(inputText + "<br />");
        $output.append(result);
        $input.text("");
    };

    // Handles things when user presses keys.
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

    // Event Init
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