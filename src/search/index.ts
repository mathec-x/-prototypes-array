import { MakeDeepSearch, Normalized } from './../utils';

export { }

declare global {
    interface Array<T> {
        /**
        * Provides a deep text search within array and array objects within array and arrays...
        */
        Search(query?: String): T[]
    }
}


if (!Array.prototype.Search) {
    Object.defineProperty(Array.prototype, 'Search', {
        enumerable: false,
        value: function<T>(this: T[], query: String){
            if (!query) return this;
        
            const keys = Object.keys(this[0]), parts = query && Normalized(query).split(/\s+/);
        
            if (!parts || !parts.length) return this || [];
        
            return this.filter( (obj) => parts.every( (part) => MakeDeepSearch(part, keys, obj) ))
        }
    });
}
