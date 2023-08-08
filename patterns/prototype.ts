class Button {
    constructor (
        private text: string        = '',
        private onClick: () => void = () => {
        },
    ) {
    }

    public render (selector: string): void {
        console.log('[Button] Render to', selector, 'text:', this.text);
        this.onClick();
    }

    public setText (text: string) {
        this.text = text;
        return this;
    }

    public setOnClick (callback: () => void) {
        this.onClick = callback;
        return this;
    }

    public clone (): Button {
        return new Button(this.text, this.onClick);
    }
}

const clearButton: Button   = new Button(
    'text',
    () => console.log('[Clear] Click'),
);
const changedButton: Button = clearButton
    .clone();

clearButton.render('footer');
changedButton
    .setText('Second')
    .setOnClick(() => console.log('[Second] Click'))
    .render('header');

