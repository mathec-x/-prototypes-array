import { FilterByProp } from "../utils";

declare global {
    interface Array<T> {
        /**
        * Return Boolean if key has value
        */
        Has<P>(key: P extends Partial<T> ? Partial<T> :any): Boolean
    }
}

if (!Array.prototype.Has) {
    Object.defineProperty(Array.prototype, 'Has', {
        value: function<T>(key?: Partial<T>|any) {
            return key 
                ? this.some((e) => FilterByProp(key, e) ) 
                : this.indexOf(key) !== -1
        },
    });
}