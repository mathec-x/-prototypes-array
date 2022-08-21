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
         * - "observations will be default with default value empty"
         */
        Distinct<S extends keyof T>(props: S | S[]): T[]
        Distinct<
            S extends Partial<keyof T>,
            K extends PluralizedKeys<Partial<T>>,
            I extends any,
            R extends PickResult<T, K, I>>(
                props: S | S[],
                select?: K[],
                defaults?: I): R[]
    }
}


function Distinct(this, props, select, defaults) {
    let key: string, indexOfDot = -1, indexOfArray = -1, pushData: any = {};

    if (!select || select.length === 0) {
        select = Object.keys(this[0]) as any;
    }

    if (!defaults) {
        defaults = {} as any
    }

    for (let i = 0; i < this.length; ++i) {
        const elmnt = this[i];
        const this_unique_fk = props instanceof Array ? props.map(x => elmnt[x]).join('') : elmnt[props];

        if (!pushData[this_unique_fk]) {
            pushData[this_unique_fk] = { ...defaults };
        }

        for (let index = select.length - 1; index >= 0; --index) {
            indexOfDot = select[index].indexOf('.');
            indexOfArray = select[index].indexOf('[s]');

            if (indexOfArray > -1) {
                key = select[index].replace('[s]', 's')
                if (!pushData[this_unique_fk][key]) {
                    pushData[this_unique_fk][key] = []
                }
                const sinKey = select[index].replace('[s]', '')
                if (pushData[this_unique_fk][key].indexOf(elmnt[sinKey]) === -1) {
                    pushData[this_unique_fk][key].push(elmnt[sinKey]);
                }

            } else if (indexOfDot > -1) {
                key = select[index]
                pushData[this_unique_fk][key] = ObjectByString(elmnt, key);
            } else {
                key = select[index]
                pushData[this_unique_fk][key] = elmnt[key] || pushData[this_unique_fk][key] || null
            }
        }
    }

    return Object.values(pushData);
}

if (!Array.prototype.Distinct) {
    Object.defineProperty(Array.prototype, 'Distinct', {
        value: Distinct
    })
}