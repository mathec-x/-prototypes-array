export function Typedef<T>(this: T[] ) {
    return this;
}

declare global {
    interface Array<T> {
        Typedef<P>(columns: P): P[]
    }
    interface Object {
        Typedef<P>(columns: P): P
    }
}

if (!Array.prototype.Typedef) {
    Object.defineProperty(Array.prototype, 'Typedef', {
        value: Typedef
    })
}

if (!Object.prototype.Typedef) {
    Object.defineProperty(Object.prototype, 'Typedef', {
        value: Typedef
    })
}