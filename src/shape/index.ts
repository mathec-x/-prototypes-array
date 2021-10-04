export function Shape<T, P extends Object>(array: T[], columns: P) {
    if (!columns) return false;
    const Keys = Object.keys(columns), res = {};

    for (const key in array) {
        if (array.hasOwnProperty(key)) {
            /**@type {any} -- the value from current row*/
            const valueof: any = array[key], keyOfKeys = Keys[key] || key;

            if (!(keyOfKeys in columns))
                continue;

            if (columns[keyOfKeys] instanceof Array) {

                res[keyOfKeys] = [];

                for (let index = 0; index < valueof.length; index++) {
                    const element = valueof[index];

                    if (typeof element === 'object') {
                        res[keyOfKeys][index] = Shape(Object.values(element), columns[keyOfKeys][0]);
                    }
                    else {
                        res[keyOfKeys][index] = {};
                        for (const keyfromsubarray in columns[keyOfKeys][0]) {
                            if (Object.hasOwnProperty.call(columns[keyOfKeys][0], keyfromsubarray)) {
                                res[keyOfKeys][index][keyfromsubarray] = columns[keyOfKeys][0][keyfromsubarray](element);
                            }
                        }
                    }
                }


                continue;
            }

            if (typeof valueof === "object") {


                if (valueof instanceof Array) {

                    if (columns[keyOfKeys]) {
                        try {
                            res[keyOfKeys] = Shape(valueof, columns[keyOfKeys]);
                        } catch (error) {
                            console.log('[Object Shape Catch]');
                            console.log('ReShape', keyOfKeys, valueof, columns[keyOfKeys]);
                        }
                        continue;
                    }
                }

                else if (valueof instanceof Object) {

                    res[keyOfKeys] = {};
                    for (let iterator in valueof) {
                        /**@example -- res.data: {} */
                        try {
                            if (columns[keyOfKeys][iterator])
                                res[keyOfKeys][iterator] = columns[keyOfKeys][iterator](valueof[iterator]);
                        } catch (error) {
                            console.log('[instanceof Object]', 'typeof:' + typeof valueof, iterator + ":" + valueof[iterator], columns[keyOfKeys][iterator]);
                        }
                    }
                }

                else {
                    res[keyOfKeys] = valueof;
                    continue;
                }

            }
            else {
                try {
                    /**@example res.name: String(array[key] -> 'valueof' = value)*/
                    if (columns[keyOfKeys]) {
                        res[keyOfKeys] = columns[keyOfKeys](valueof);
                    }
                } catch (error) {
                    console.log('[String Shape Catch]', "\n", keyOfKeys, ": ", columns[keyOfKeys], " = ", valueof, "\nin:", res);
                    break;
                }
                continue;
            }
        }
    }
    return res;
}

type CallableIterator<P> = P extends Function ? ((prop: unknown) => never) : Object | P;

declare global {
    interface Array<T> {
        Shape<P extends Object>(columns: CallableIterator<P>): P[]
    }
    interface Object {
        Shape<P>(columns: CallableIterator<P>): P
    }
}

if (!Array.prototype.Shape) {
    Object.defineProperty(Array.prototype, 'Shape', {
        value: function (this: any[], columns: any): any[] {
            return this.map(e => Shape(e, columns));
        }
    })
}
if (!Object.prototype.Shape) {
    Object.defineProperty(Object.prototype, 'Shape', {
        value: function (this: any, columns: any): any {
            return Shape(this, columns);
        }
    })
}