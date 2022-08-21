import { JoinNestedObjects, ObjectByString, Replace } from "../utils"

export { }
type PluralizedKeys<T> = string & keyof T | JoinNestedObjects<T> | `${string & keyof T}[s]`

type ResultPicker<T, K> = K extends keyof T ? Pick<T, K> : never
type PluralPicker<T, K> = { [key in Replace<string & K, '[s]', 's'>]: any[] }

type PickResult<T, K, I> = PluralPicker<T, K> & I

declare global {
    interface Array<T> {
        /**
         * distict by first property order by last to first
         * 
         * @example
         * object.Distinct(['uuid'],['name', 'query'], {'observations': ''}) 
         * - "uuid ´s the key"
         * - "ids will group id in [1,2 ...]"
         * - "query will bring as object"
         * - "name will be included"
         * - "observations will be included with default value"
         */
        Distinct<S extends keyof T>(props: S | S[]): T[]
        Distinct<
            S extends Partial<keyof T>,
            K extends PluralizedKeys<Partial<T>>,
            I extends any,
            R extends PickResult<T, K, I>>(
                props: S | S[],
                select?: K[],
                include?: I): R[]
    }
}


function Distinct(this, props, select, include) {
    const distinct = [];
    const unique_sets: any = {};


    let key: string, indexOfDot = -1, indexOfArray = -1, pushData: any = {};

    if (!select || select.length === 0) {
        select = Object.keys(this[0]) as any;
    }

    if (!include) {
        include = {} as any
    }

    const arrayIncrementalProp = select.findIndex(e => e.indexOf('[s]') !== -1)
    const thisLen = this.length - 1;
    for (let i = thisLen; i >= 0; --i) {
        const elmnt = this[i];
        const count = select.length - 1;
        const this_unique_fk = props instanceof Array ? props.map(x => elmnt[x]).join('') : elmnt[props];

        if (!unique_sets[this_unique_fk]) {
            pushData = { ...include as any };
            pushData['constructor']['key'] = this_unique_fk;

            for (let index = count; index >= 0; --index) {
                indexOfDot = select[index].indexOf('.');
                indexOfArray = select[index].indexOf('[s]');

                if (indexOfArray > -1) {
                    key = select[index].replace('[s]', 's')
                    pushData[key] = [elmnt[select[index].replace('[s]', '')]];
                }
                else if (indexOfDot > -1) {                   
                    pushData[select[index]] = ObjectByString(elmnt, select[index]);
                } else {
                    key = select[index] as string
                    pushData[key] = elmnt[select[index]] || ''
                }
            }

            distinct.push(pushData);
            unique_sets[this_unique_fk] = 1;

        } else {
            if (arrayIncrementalProp !== -1) {
                distinct
                    .find(e => e['constructor']['key'] === this_unique_fk)
                [select[arrayIncrementalProp].replace('[s]', 's')]
                    .push(elmnt[select[arrayIncrementalProp].replace('[s]', '')])
            }
            ++unique_sets[this_unique_fk]
        };
    }

    return distinct;
}

if (!Array.prototype.Distinct) {
    Object.defineProperty(Array.prototype, 'Distinct', {
        value: Distinct
    })
}