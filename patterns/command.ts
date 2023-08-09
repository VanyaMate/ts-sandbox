class Track {
    public value: string = '';
}

abstract class Command {
    constructor (protected readonly track: Track) {
    }

    abstract exec (value?: string): void;

    abstract undo (): void;
}


class Cut extends Command {
    private _previousValue: string = '';
    private _canceled: boolean     = false;

    exec (): void {
        this._canceled      = false;
        this._previousValue = this.track.value;
        this.track.value    = this.track.value.slice(0, this.track.value.length - 1);
    }

    undo (): void {
        this._canceled   = true;
        this.track.value = this._previousValue;
    }
}

class Add extends Command {
    private _previousValue: string = '';
    private _canceled: boolean     = false;

    exec (value: string): void {
        this._canceled      = false;
        this._previousValue = this.track.value;
        this.track.value += value;
    }

    undo (): void {
        this._canceled   = true;
        this.track.value = this._previousValue;
    }
}


class MusicEditor {
    private readonly _executedCommands: Command[] = [];

    constructor (public readonly track: Track) {
    }

    executeCommand (command: Command, value?: string) {
        this._executedCommands.push(command);
        command.exec(value);
    }

    undoLastCommand () {
        const lastCommand: Command | undefined = this._executedCommands.pop();
        lastCommand && lastCommand.undo();
    }
}

const track: Track             = new Track();
const musicEditor: MusicEditor = new MusicEditor(track);

console.log(musicEditor.track.value);
musicEditor.executeCommand(new Add(musicEditor.track), 'music');
console.log(musicEditor.track.value);
musicEditor.executeCommand(new Add(musicEditor.track), '|');
console.log(musicEditor.track.value);
musicEditor.executeCommand(new Add(musicEditor.track), 'second');
console.log(musicEditor.track.value);
musicEditor.executeCommand(new Add(musicEditor.track), '123');
console.log(musicEditor.track.value);
musicEditor.executeCommand(new Cut(musicEditor.track));
console.log(musicEditor.track.value);
musicEditor.executeCommand(new Cut(musicEditor.track));
console.log(musicEditor.track.value);
musicEditor.executeCommand(new Add(musicEditor.track), '11');
console.log(musicEditor.track.value);

musicEditor.undoLastCommand();
console.log(musicEditor.track.value);
musicEditor.undoLastCommand();
console.log(musicEditor.track.value);
musicEditor.undoLastCommand();
console.log(musicEditor.track.value);
musicEditor.undoLastCommand();
console.log(musicEditor.track.value);
musicEditor.undoLastCommand();
console.log(musicEditor.track.value);
