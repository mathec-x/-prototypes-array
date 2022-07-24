export { }
type FuncOrArgs<T> = ((data: T) => number) | Partial<keyof T>

declare global {
    interface Array<T> {
        /**
        * Return Max
        */
        Max(callback: FuncOrArgs<T>): number
    }
}

if (!Array.prototype.Max) {
    Object.defineProperty(Array.prototype, 'Max', {
        value: function Max<T>(this: T[], callback: FuncOrArgs<T>) {
            let t: number, num: number;
            for (let i = this.length - 1; i >= 0; --i) {
                num = typeof callback === 'function'
                    ? callback(this[i])
                    : Number(this[i][callback]) || 0;

                if (num > t) {
                    t = num;
                    continue;
                };
                if (!t) {
                    t = num;
                    continue;
                };
            }
            return t;
        }
    });
}