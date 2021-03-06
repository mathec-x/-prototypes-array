import './index'

const array = [
    { id: 1, name: 'teste 001', code: 'abc', query: { createdAt: '00100101010', updatedAt: '00100101010' } },
    { id: 2, name: 'teste 002', code: 'bcd', query: { createdAt: '00100101010', updatedAt: '00100101010' } },
    { id: 3, name: 'teste 002', code: 'cde', query: { createdAt: '00100101010', updatedAt: '00100101010' } },
    { id: 4, name: 'teste 002', code: 'cde', query: { createdAt: '00100101010', updatedAt: '00100101010' } }
];

describe('Array.Distinct', () => {
    it('Should return object when count by prop with additional property observations', () => {
        const test = array.Distinct("name", ['id', 'name', 'query'], { observations: 'default value' });
        expect(test.length).toBe(2);
        expect(test).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: 4,
                    name: 'teste 002',
                    query: { createdAt: '00100101010', updatedAt: '00100101010' }
                }),
                expect.objectContaining({
                    id: 1,
                    name: 'teste 001',
                    query: { createdAt: '00100101010', updatedAt: '00100101010' }
                })
            ])
        )
    })

    it('Should return fully object distinct by multiple keys', () => {
        const test = array.Distinct(["name", "code"]);
        expect(test.length).toBe(3);
        expect(test).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    code: 'abc',
                    name: 'teste 001'
                }),
                expect.objectContaining({
                    code: 'bcd',
                    name: 'teste 002'
                }),
                expect.objectContaining({
                    code: 'cde',
                })
            ])
        )
    })
})