import { IProg } from './prog.interface';
import { IProgConsole } from './console-sim';


export class LSProg implements IProg {
    private exitCallback: () => void;
    private console: IProgConsole;

    execute = (args: string[], console: IProgConsole, exitCallback: () => void ): void => {
        this.console = console;
        this.exitCallback = exitCallback;

        if (args.indexOf('-l') !== -1 ){
            this.console.writeLine('total 1');
            this.console.writeLine('-rw-r--r--. 1 scottz0r scottz0r cats.txt');
        } else {
            this.console.writeLine('cats.txt');
        }

        this.exitCallback();
    }
}


export class CatProg implements IProg {
    execute = (args: string[], console: IProgConsole, exitCallback: () => void): void => {
        // exitCallback called in each branch because 'no args' branch will need to read input
        // from a callback.
        if (args.length > 0 && args[0] === 'cats.txt') {
            console.writeLine('Plans to take over the work:');
            console.writeLine('1. Aquire cats.');
            console.writeLine('2. Aquire boxes.');
            console.writeLine('3. Train cats to take over world with boxes.');
            console.writeLine('4. Have cats take over world with boxes.');
            exitCallback();
        } else if (args.length > 0 && args[0].indexOf('>') !== -1) {
            console.writeLine('error: write access deined.');
            exitCallback();
        } else if (args.length === 0) {
            console.readLine(input => {
                console.writeLine(input);
                exitCallback();
            });
        }
    }
}


export class ExitProg implements IProg {
    execute = (args: string[], console: IProgConsole, exitCallback: () => void): void => {
        console.writeLine('Exiting shell...');
        console.writeLine('(⌐■_■) Bye,  man.');
        window.location.href = './index.html';

        exitCallback();
    }
}


export class CopyrightProg implements IProg {
    execute = (args: string[], console: IProgConsole, exitCallback: () => void): void => {
        console.writeLine(`Copyright (c) 2017 Scott Clewell ("Scottz0r")`);
        console.writeLine(`View code at
        <a class="console-link" target="_blank"
        href="https://github.com/Scottz0r/scottz0r.github.io">https://github.com/Scottz0r/scottz0r.github.io</a>`);

        exitCallback();
    }
}


export class HelpProg implements IProg {
    execute = (args: string[], console: IProgConsole, exitCallback: () => void): void => {
        console.writeLine('Supported Commands:');
        console.writeLine('- cat');
        console.writeLine('- ls');
        console.writeLine('- copyright');
        console.writeLine('- exit');

        exitCallback();
    }
}
