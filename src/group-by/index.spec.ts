import './index'

const array = [
    { data: '2022-01-01', id: 1, qtde_inf: 1, qtde_pass: 1 },
    { data: '2022-01-02', id: 1, qtde_inf: 2, qtde_pass: 1 },
    { data: '2022-02-01', id: 1, qtde_inf: 4, qtde_pass: 1 },
    { data: '2022-02-02', id: 1, qtde_inf: 4, qtde_pass: 1 },
    { data: '2022-02-03', id: 1, qtde_inf: 3, qtde_pass: 1 },
    { data: '2022-02-03', id: 2, qtde_inf: 4, qtde_pass: 1 },
    { data: '2022-02-04', id: 2, qtde_inf: 4, qtde_pass: 1 },
    { data: '2022-02-05', id: 2, qtde_inf: 4, qtde_pass: 1 },
    { data: '2022-02-06', id: 2, qtde_inf: 4, qtde_pass: 1 },
];

const increment = (cur: number, acc = 0) => cur + acc;
describe('Array.GroupBy', () => {
    it('Should Gourp by date and id', () => {
        const result = array.GroupBy(
        // ['id'],
        (x) => x.data.substring(0, 7) + x.id,
        (current, next ) => {
            return {
                id: current.id,
                violation: increment(current.qtde_inf, next?.violation)
            }}
        )
        expect(result).toBeInstanceOf(Array);
    })
})