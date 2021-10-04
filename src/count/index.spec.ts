import './index'

const array = [
    { id: 1, name: 'teste 001', query: { date: '00100101010' }},
    { id: 2, name: 'teste 002', query: { date: '00100101010' }},
    { id: 3, name: 'teste 002', query: { date: '00100101010' }},
    { id: 4, name: 'teste 002', query: { date: '00100101010' }}
];

describe('Array.Counter', () => {
    it('Should return object when count by prop', () => {
        const test = array.Count('name');
        expect(test).toEqual([
            { name: 'teste 002', _count: 3 },
            { name: 'teste 001', _count: 1 }
        ]);
    })

    it('Should return number when count by function', () => {
        const test = array.Count(e => e.id === 0);
        expect(test).toBe(0);
    })

    it('Should return number when count by property', () => {
        const test = array.Count({id: 1});
        expect(test).toBe(1);
    })

    it('Should return length of array', () => {
        const test = array.Count();
        expect(test).toBe(4);
    })
})