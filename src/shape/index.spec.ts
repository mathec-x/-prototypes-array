import './index'

describe('Shape', () => {

    test('Array only', () => {
        const input = [['1', ['2021-10-01 00:00:000', '00']]];
        const result = input.Shape({ id: Number, query: [{ created: (x) => new Date(x) }] });
        expect(result).toEqual([
            { id: 1, query: [
                { created: new Date("2021-10-01T03:00:00.000Z")}, { created: new Date("2000-01-01T02:00:00.000Z") }
            ] 
        }])

        // const result: {
        //     id: NumberConstructor;
        //     query: {
        //         created: (x: any) => Date;
        //     }[];
        // }[]
    })

    test('Object with Array', () => {
        const input = { id: '1', query: [{ created: '2021-10-01 00:00:000' }] };
        const result = input.Shape({ id: Number, query: [{ created: (x) => new Date(x) }] });
        expect(result).toEqual({ id: 1, query: [{ created: new Date("2021-10-01T03:00:00.000Z") }] })

        // const result: {
        //     id: NumberConstructor;
        //     query: {
        //         created: (x: any) => Date;
        //     }[];
        // }
    })

    test('Object with Object', () => {
        const input = { id: '1', query: { created: '2021-10-01 00:00:000' } }
        const result = input.Shape({ id: Number, query: { created: (x) => new Date(x) } });
        expect(result).toEqual({ id: 1, query: { created: new Date("2021-10-01T03:00:00.000Z") } })

        // const result: {
        //     id: NumberConstructor;
        //     query: {
        //         created: (x: any) => Date;
        //     };
        // }
    })
})