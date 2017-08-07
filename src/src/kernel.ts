import { ConsoleSim, IProgConsole } from './console-sim';
import { IProg } from './prog.interface';

export class Kernel {
    private consoleSim: ConsoleSim;
    private programs = {};

    addProg = (name: string, prog: Object): void => {
        this.programs[name] = prog;
    }

    execute = (): void => {
        this.consoleSim = new ConsoleSim();
        this.consoleSim.commandExecutedCallback = this.onCommandExecuted;
    }

    private onCommandExecuted = (cmd: string): void => {
        // Return on empty command, do not switch context or attempt to execute prog.
        if(cmd === '') {
            return;
        }

        let progName = cmd.split(' ')[0];
        let progInstance = this.activateProg(progName);

        if(progInstance !== false) {
            this.consoleSim.switchToProgContext();
            let args = this.parseArguments(cmd);
            (<IProg>progInstance).execute(args, this.consoleSim, this.onProgramExit);
        } else {
            this.consoleSim.writeLine(`fatal: unrecognized command '${cmd}'`);
        }
    }

    private onProgramExit = (): void => {
        this.consoleSim.exitProgContext();
    }

    private activateProg = (name: string): IProg | boolean => {
        if (this.programs.hasOwnProperty(name)) {
            let instance = new this.programs[name];
            return <IProg>instance;
        } else {
            return false;
        }
    }

    private parseArguments = (cmd: string): string[] => {
        if (cmd != null && cmd !== '') {
            let components = cmd.split(' ');
            return components.slice(1);
        } else {
            return [];
        }
    }
}