import { IProgConsole } from './console-sim';

export interface IProg {
    execute: (args: string[], console: IProgConsole, exitCallback: () => void ) => void;
}
