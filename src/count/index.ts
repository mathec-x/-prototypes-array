import { FilterByProp } from './../utils';
type Callback<T, Fn> =  Fn extends string ? Fn | keyof T : { [P in keyof T]?: T[P] } | ((call: T) => Boolean) 
type Result<T> = Array<{ [P in keyof T]?: T[P] } & { _count: number }>

declare global {
    interface Array<T> {
        /**
        * Count by element equality from an array by property returns total found by aggregation or number
        */
        Count<Fn>(KeyCall?: Callback<T, Fn>): Fn extends String ? Result<T> : number
    }
}

if (!Array.prototype.Count) {
    Object.defineProperty(Array.prototype, 'Count', {
        value: function Count<T, Fn>(this: T[], KeyCall: Callback<T, Fn>) {
            if(typeof KeyCall === 'undefined') return this.length;

            const byObject = typeof KeyCall === 'object';
            const byString = typeof KeyCall === 'string';
            const byFunction = typeof KeyCall === 'function';

            let a = [];
            let b = 0;

            for (let i = this.length - 1; i >= 0; --i) {
                const next: any = this[i];

                if (byString) {
                    var ix = a.findIndex(x => x[KeyCall] === next[KeyCall]);

                    if (ix >= 0) {
                        a[ix]._count++;
                    } else {
                        a.push({ [KeyCall]: next[KeyCall], _count: 1 });
                    };
                }
                else if (byObject) {
                    b = FilterByProp(KeyCall, next) ? b + 1 : b + 0;
                } 
                else if (byFunction) {
                    b = KeyCall(next) ? b + 1 : b + 0;

                } else {
                    throw Error("[Array.Count] T expect object|string|function args)");
                }
                
            }

            return byObject || byFunction ? b : a;
        }
    });
}