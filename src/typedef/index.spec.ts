import './index'


const obj = { email: "active@email.com", date: '2020-02-10T00:00:00.000Z' }

const type = {
    id: Number,
    name: String,
    query: [{
        id: Number,
        querydate: Date
    }],
    info: {
        email: String,
        date: String
    },
}
const array = [
    [50, "Maculinho", ["jack@email.com", "2020-02-10T00:00:00.000Z"], [[1, "2021-01-25T00:00:00.000Z"], [2, "2021-02-25T00:00:00.000Z"]]],
    [55, "Jão silva", obj, [{ id: 1, querydate: "2021-01-25T00:00:00.000Z" }, { id: 2, querydate: "2021-02-25T00:00:00.000Z" }]],
];


describe('Array.Typedef', () => {
    it("Should have different declaration but no changes original", () => {
        const result = array.Typedef(type);
        expect(result).toEqual(array);
    })
})


// const teste = array.Typedef(type);
// teste[0].query[0] // (property) query: { id: NumberConstructor; querydate: (x: any) => Date; }[]