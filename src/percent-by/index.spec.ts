import './index'

const array = [
    { id: 1, peso: 4, done: false, task: 'task 001'},
    { id: 2, peso: 5, done: true, task: 'task 002'},
    { id: 3, peso: 10, done: true, task: 'task 002'},
    { id: 4, peso: 1, done: true, task: 'task 002'}
];

describe('Array.PercentBy', () => {
    it('Should return percentual done by peso', () => {
        const test = array.PercentBy('peso', { done: true }, 2);
        expect(test).toBe('80.00')
    })
    it('Should return percentual done by peso', () => {
        const test = array.PercentBy('peso', { done: false }, 0);
        expect(test).toBe('20')
    })
})