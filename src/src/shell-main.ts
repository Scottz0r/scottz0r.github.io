import { Kernel } from './kernel';
import { LSProg, ExitProg, HelpProg, CopyrightProg, CatProg } from './programs';

// Hack to allow webpack to pickup css.
declare const require;
const _style = require('style-loader!./site.css');

let kernel = new Kernel();
kernel.addProg('ls', LSProg);
kernel.addProg('exit', ExitProg);
kernel.addProg('help', HelpProg);
kernel.addProg('copyright', CopyrightProg);
kernel.addProg('cat', CatProg);
kernel.execute();

// Load page stuff...
$(document).ready(() => {
    $("body").show();
});

// Mobile warning. This shell requires a keyboard, and a mobile browser
// is not going to open it. Sad face.
if (/Mobi/.test(navigator.userAgent)) {
    $("#mobileWarn").show();
} else {
    $("#mobileWarn").hide();
}
