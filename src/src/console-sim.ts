const enum ConsoleState {
    CmdInput,
    ProgExecution
}

export interface IProgConsole {
    readLine: (callback: (cmd: string) => void) => void;
    writeLine: (text: string) => void;
}

export class ConsoleSim implements IProgConsole {
    private readonly NEWLINE = "<br />";
    private readonly prefixText = "haxz0r@scottz0r-site:~$ ";

    private state: ConsoleState = 0;
    private buffer: string = "";
    private readLineCallback: ((input: string) => void) = null;
    public commandExecutedCallback: ((cmd: string) => void) = null;

    // JQuery elements
    private $caret = $("#caret");
    private $input = $("#input");
    private $output = $("#output");
    private $inputPrefix = $("#inputPrefix");

    constructor(){
        $(document).on('keypress', this.handleInput);
        $(document).on("keydown", this.handleKeyDown);
        this.blinkCursor();
    }

    readLine = (callback: (cmd: string) => void): void => {
        this.readLineCallback = callback;
    }

    writeLine = (text: string): void => {
        this.$output.append(text + this.NEWLINE);
    }

    switchToProgContext = (): void => {
        this.$inputPrefix.text("");
        this.state = ConsoleState.ProgExecution;
    }

    exitProgContext = (): void => {
        this.$inputPrefix.text(this.prefixText);
        this.state = ConsoleState.CmdInput;
    }

    // Handle input from the keyboard.
    private handleInput = (evt: any): void => {
        let key: number = evt.which;
        
        if(key === 13) { // Enter Key
            let tmpBuffer = this.buffer;
            this.buffer = "";
            this.processEnterKey(tmpBuffer);
        } else if (key === 8) { // Backspace
            if (this.buffer.length > 0){
                let subbed = this.buffer.substr(0, this.buffer.length - 1);
                this.buffer = subbed;
                this.$input.text(this.buffer);
            }
        } else { // Other
            let chr = String.fromCharCode(key);
            this.buffer += chr;
            this.$input.append(chr);
        }
    }

    private processEnterKey = (cmd: string) => {
        // Cleanup "window"
        let inputText = this.state === ConsoleState.CmdInput ? (this.prefixText + cmd) : cmd;
        this.$output.append(inputText + this.NEWLINE);
        this.$input.text("");

        // If state is CmdInput, then let the "kernel" know that 
        // a program needs to be run.
        if (this.state === ConsoleState.CmdInput) {
            if (this.commandExecutedCallback != null) {
                this.commandExecutedCallback(cmd);
            }
        } else { // Else notify that readline has read a line from input.
            if(this.readLineCallback != null) {
                this.readLineCallback(cmd);
            }
        }
    }

    private handleKeyDown = (evt: any): void => {
        if (evt.keyCode == 8) {
            evt.preventDefault();
            this.handleInput({which: 8});
        }
    }

    // Other init stuff
    private blinkCursor(): void {
        setInterval(() => this.$caret.toggle(), 500);
    }
}
