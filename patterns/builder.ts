class PopIn {
    constructor (
        private title: string    = '',
        private text: string[]   = [],
        private duration: number = 1000) {
    }

    public show () {
        console.log('[PopIn] Show.', this.title, this.text, this.duration);
    }

    public hide () {
        console.log('[PopIn] Hide.', this.title, this.text, this.duration);
    }
}

class PopInBuilder {
    private title: string    = '';
    private text: string[]   = [];
    private duration: number = 1000;

    constructor () {
    }

    setTitle (title: string) {
        this.title = title;
        return this;
    }

    addText (text: string) {
        this.text.push(text);
        return this;
    }

    setDuration (duration: number) {
        this.duration = duration;
        return this;
    }

    create (): PopIn {
        return new PopIn(this.title, this.text, this.duration);
    };
}

const popIn: PopIn = new PopInBuilder()
    .setTitle('PopIn Title')
    .addText('First row')
    .addText('Second row')
    .setDuration(2000)
    .create();

popIn.show();