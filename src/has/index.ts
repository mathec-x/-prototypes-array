import { FilterByProp } from "../utils";

declare global {
    interface Array<T> {
        /**
        * checks whether objects and values ​​contain within the array
        */
         Has<P extends any>(iterator: Partial<T> | ((item: T) => Boolean) | P ): Boolean
    }
}

if (!Array.prototype.Has) {
    Object.defineProperty(Array.prototype, 'Has', {
        value: function(iterator): Boolean {
            return typeof iterator === 'function' 
                    ? this.some(iterator)
                    : typeof iterator === 'object' 
                    ? this.some((e) => FilterByProp(iterator, e) ) 
                    : this.indexOf(iterator) !== -1
        },
    });
}