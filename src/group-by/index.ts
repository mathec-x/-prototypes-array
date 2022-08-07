export { }
type FuncOrArgs<T> = Partial<keyof T>[] | ((current: T, next: T) => any)

/**
 * @todo
 * i need the callback of this function to be the same type as its return
 */
 declare global {
    interface Array<T> {
        GroupBy<Result = { [k: string]: any }, Res = Result>(
            getkey: FuncOrArgs<T>,
            callback: <Prev extends T, Next extends NewInstance<Res>>(
                previous: Prev, next: Next
            ) => Result
        ): Result[]
    }
}

const mountKey = (key: any, object: any) => {
    if (typeof key === 'function') {
        return key(object);
    } else {
        let res = '';
        for (const iterator of key) {
            res += object[iterator]
        }
        return res;
    }
}

type NewInstance<T> = InstanceOfGroupBy<T> & {} & { [k: string]: any }

class InstanceOfGroupBy<T = any> {
    constructor(params: T) {
        Object.assign(this, params)
    }

    Has(a: keyof T) {
        return !!(this as any)?.[a]
    }

    True<Value, Into>(a: Value, b: Into | any = undefined) {
        return !b ? a : false
    }
    ConcatArray<Value>(a: Value | undefined = undefined, b: any[] | undefined = undefined): Value[] {
        return !b ? [a] : b.concat(a) as any
    }
    AorB<Value extends any>(a: Value, b: Value | any = undefined): Value {
        if (a && a instanceof Object) {
            for (const k in a) {
                if (Object.prototype.hasOwnProperty.call(a, k)) {
                    if (!(a as any)[k]) { return b || {} }
                }
            }
        }

        return a || b
    }
    Max<Value, Into>(a: Value | any = 0, b: Into | any = 0) {
        return Number(a) > Number(b) ? Number(a) : Number(b)
    }
    Min<Value, Into>(a: Value, b: Into | any = a) {
        return Number(a) <= Number(b) ? Number(a) : Number(b)
    }
    Sum<Value, Into>(a: Value | any = 0, b: Into | any = 0) {
        return Number(a) + Number(b)
    }
}

if (!Array.prototype.GroupBy) {
    Object.defineProperty(Array.prototype, 'GroupBy', {
        value: function GroupBy<T>(
            this: Array<T>,
            getkey: FuncOrArgs<T>,
            callback: (current: T, next: any) => T) {
            let index: any, acc: any;
            return Object.values(
                this.reduce((res: any, currentValue) => {
                    index = mountKey(getkey, currentValue);
                    acc = new InstanceOfGroupBy(res[index])
                    res[index] = callback(currentValue, acc);
                    return res;
                }, {})
            );
        }
    })
}