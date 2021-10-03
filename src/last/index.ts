export { }
declare global {
    interface Array<T> {
        /**
        * Return Last Element from array
        */
        Last(): T
    }
}

if (!Array.prototype.Last) {
    Object.defineProperty(Array.prototype, 'Last', {
        value: function () {
            return this[this.length - 1] || { };
        },
    });
}