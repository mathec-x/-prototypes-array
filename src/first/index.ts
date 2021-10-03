export { }
declare global {
    interface Array<T> {
        /**
        * Return First
        */
        First($key?: number): T
    }
}

if (!Array.prototype.First) {
    Object.defineProperty(Array.prototype, 'First', {
        value: function ($key = 0) {
            return $key in this ? this[$key] : {};
        },
    });
}