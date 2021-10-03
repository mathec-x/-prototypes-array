export { }
declare global {
    interface Array<T> {
        /**
        * Return Sum
        */
        Sum(Callback: keyof T | ((callable: T) => number) ): number
    }
}

if (!Array.prototype.Sum) {
    Object.defineProperty(Array.prototype, 'Sum', {
        value: function Sum<T>(this: T[], Callback: keyof T | ((callable: T) => number)) {
            let t : number = 0;
            for (let i = this.length - 1; i >= 0; --i) {
                const num: number = (typeof Callback !== 'function') ? Number(this[i][Callback]) || 0 : Callback(this[i]);
                t = t + num;
            }
            return t;
        }
    });
}