
export { }

declare global {
    interface Array<T> {
        /**
        * Removes the element from an array by property and returns Number pulled items.
        */
        Pull(args: { [P in keyof T]?: T[P] }): Number
    }
}

if (!Array.prototype.Pull) {
    Object.defineProperty(Array.prototype, 'Pull', {
        value: function Pull<T>(this: T[], elem: T): Number {
            let ix = this.findIndex((x: T) => Object.keys(elem).every((key) => x[key] === elem[key]));
            let count = 0;
            while (ix !== -1) {
                this.splice(ix, 1);
                ++count;
                ix = this.findIndex((x: T) => Object.keys(elem).every((key) => x[key] === elem[key]));
            }
            return count;
        }
    });
}
