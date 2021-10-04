import './index'

const array = [
    { id: 1, name: 'teste 001', query: { date: '00100101010' }},
    { id: 2, name: 'teste 002', query: { date: '00100101010' }},
    { id: 3, name: 'teste 002', query: { date: '00100101010' }},
    { id: 4, name: 'teste 002', query: { date: '00100101010' }}
];

describe('Array.Has', () => {
    it('Should return true containing object', () => {
        const test = array.Has({id: 1});
        expect(test).toBe(true)
    })
    it('Should return false containing object', () => {
        const test = array.Has({name: 'teste 000'});
        expect(test).toBe(false)
    })
    it('Should return true containing in array', () => {
        const test = [0,1,2,3].Has(2);
        expect(test).toBe(true)
    })
})