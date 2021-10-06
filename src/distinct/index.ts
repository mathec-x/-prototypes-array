export {}
declare global {
    interface Array<T> {
        /**
         * distict by first property order by last to first
         * 
         * @example
         * object.Distinct(['uuid'],['name', 'query'], {'observations': ''}) 
         * -- uuid ´s the key, rest is silence
         * -- query will bring as object
         * -- name will be included
         * -- observations will be included with default value
         */
        Distinct<S extends Partial<keyof T>, K extends Partial<keyof T>, I extends any>(props: S | S[], select?: K[], include?: I): [Pick<T, K> & I]
    }
}

if (!Array.prototype.Distinct) {
    Object.defineProperty(Array.prototype, 'Distinct', {
        value: function Distinct(props, select = [], include = {}) {
            const distinct = [];
            const unique_sets = {};

            if (select.length === 0) {
                select = Object.keys(this[0]);
            }

            const thisLen = this.length - 1;
            for (let i = thisLen; i >= 0; --i) {
                const elmnt = this[i];
                const count = select.length - 1;
                const this_unique_fk = props instanceof Array ? props.map(x => elmnt[x]).join('') : elmnt[props];

                if (!unique_sets[this_unique_fk]) {
                    const pushData = { ...include };
                    // pushData['__id'] = this_unique_fk;

                    for (let index = count; index >= 0; --index) {
                        const indexOfDot = select[index].indexOf('.');

                        if (indexOfDot > -1) {
                            pushData[select[index].substring(0, indexOfDot) ] = elmnt[select[index]];
                        } else {
                            pushData[select[index]] = elmnt[select[index]] || ''
                        }
                    }

                    distinct.push(pushData);
                    unique_sets[this_unique_fk] = 1;

                } else ++unique_sets[this_unique_fk];
            }

            return distinct;
        }
    })
}