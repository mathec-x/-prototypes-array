import { FilterByProp } from "../utils";

declare global {
    interface Array<T> {
        /**
        * checks whether objects and values ​​contain within the array
        */
         Has<P extends any>(key: Partial<T> | ((item: T) => Boolean) | P ): Boolean
    }
}

if (!Array.prototype.Has) {
    Object.defineProperty(Array.prototype, 'Has', {
        value: function<T>(key?: Partial<T>|((f:T) => Boolean)|any) {
            return typeof key === 'function' 
                    ? this.some(key)
                    : typeof key === 'object' 
                    ? this.some((e) => FilterByProp(key, e) ) 
                    : this.indexOf(key) !== -1
        },
    });
}