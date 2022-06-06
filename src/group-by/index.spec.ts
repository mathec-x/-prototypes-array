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

describe('Array.GroupBy', () => {
    it('Should Gourp by date and id', () => {
        const result = array.GroupBy(
        // ['id'],
        (x) => x.data.substring(0, 7) + x.id,
        (current, next ) => {
            if(next){
                return {
                    id: current.id,
                    violation: current.qtde_inf + Number(next.violation),
                    passages: current.qtde_pass + Number(next.passages)
                }
            }

            return {
                id: current.id,
                violation: current.qtde_inf,
                passages: current.qtde_pass
            }}
        )
        expect(result).toBeInstanceOf(Array);
    })
})