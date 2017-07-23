"use strict";
var $$commands = function() {};

/* Command processor */
$$commands.prototype._process = function(cmd) {
    var args = cmd.split(" ");
    var result = "";

    if(args.length !== 0) {
        if (typeof this[args[0]] === "function") {
            result = this[args[0]](args);
        } else {
            result = "Unknown command " + args[0];
        }
    } else {
        result = "Evaluation Error - No command.";
    }

    if (result == null) {
        result = "";
    }
    result = result.replace(/\n/g, "<br />");
    return result;
}

/* Commands. Args[0] will be command. */
$$commands.prototype.ls = function (args){
    if (args.length >= 2) {
        if (args[1] == "-l") {
            return "total 1 \n"
                + "-rw-r--r--. 1 root root cats.txt";
        }
    } else {
        return "cats.txt";
    }
}

$$commands.prototype.cat = function(args){
    if (args.length >= 2) {
        if (args[1] == "cats.txt") {
            return "My cat is sitting in a box as I make this code. Too bad she hates me and will not sit on my lap...";
        } else if (args[1].indexOf(">") !== -1) {
            return "Write access denied";
        } else {
            var res = "";
            for(var i = 1; i < args.length; i++){
                res += args[i];
            }
            return res;
        }
    } else {
        return "Not supported";
    }
}

$$commands.prototype.exit = function(args){
    window.location = "./index.html";
}

$$commands.prototype.copyright = function(args){
    return "Copyright (c) 2017 Scott Clewell (\"Scottz0r\")";
}

$$commands.prototype.help = function(args) {
    return "Supported commands: \n"
        + "cat (show file only) \n"
        + "ls\n"
        + "exit\n"
        + "Code for this shell can be found at https://github.com/Scottz0r/scottz0r.github.io.\n";
}