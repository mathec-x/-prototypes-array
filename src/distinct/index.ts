export { }

declare global {
    interface Array<T> {
        /**
         * distict by first property order by last to first
         * 
         * @example
         * object.Distinct(['uuid'],['name', 'query.date'], {'observations': ''}) 
         * -- uuid ´s the key, rest is silence
         * -- query will bring date as object
         * -- name will be included
         * -- observations will be included with default value
         */
        Distinct<S extends Partial<keyof T>,K extends Partial<keyof T>, I extends any>(props: S|S[], select: K[], include?: I): [Pick<T, K> & I]
    }
}

// const teste1 = [
//     { id: 1, name: 'teste 001', query: { date: '00100101010' }},
//     { id: 2, name: 'teste 002', query: { date: '00100101010' }},
//     { id: 3, name: 'teste 003', query: { date: '00100101010' }},
//     { id: 4, name: 'teste 002', query: { date: '00100101010' }}
// ];

// const res = teste1.Distinct("id", ['id', 'name', 'query' ], { observations: '' });
// res[0]

if (!Array.prototype.Distinct) {
    Object.defineProperty(Array.prototype, 'Distinct', {
        value: function(props, select, include) {
            const distinct = [];
            const unique_sets = {};

            const len = this.length - 1;
            for (let i=len; i>=0; --i) {    
                const elmnt = this[i];
                const count = select.length - 1;
                
                const unique_fk = props instanceof Array ? props.map(x => elmnt[x]).join('') : elmnt[props];

                if (!unique_sets[unique_fk]) {
                    const pushData = {...include};
                    
                    for (let index=count; index>= 0; --index) {
                        if (typeof select[index] === 'object') {
                            const key = Object.keys(select[index])[0];
                            pushData[key] = select[index][key];
                        }
                        else{
                            pushData[select[index]] = elmnt[select[index]] || ''
                        }
                    }
    
                    distinct.push(pushData);
                    unique_sets[unique_fk] = 1;

                } else ++unique_sets[unique_fk];
            }

            return distinct;
        }
    })
}