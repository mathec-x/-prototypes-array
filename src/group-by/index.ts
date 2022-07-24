export { }
type FuncOrArgs<T> = Partial<keyof T>[] | ((current: T, next: T) => any)

declare global {
  interface Array<T> {
      GroupBy<Result>(
          getkey: FuncOrArgs<T>,
          callback: <Next = { [P in keyof Result]: Result[P] } >(previous: T, next?: Next) => Result
      ): Result[]
  }
}

const mountKey = (key: any, object: any) => {
    if(typeof key === 'function'){
        return key(object);
    } else {
        let res = '';
        for (const iterator of key) {
            res += object[iterator]
        }
        return res;
    }
}

if (!Array.prototype.GroupBy) {
    Object.defineProperty(Array.prototype, 'GroupBy', {
        value: function GroupBy<T>(
            this: Array<T>, 
            getkey: FuncOrArgs<T>, 
            callback: <Next = Partial<T>>(current: T, next?: Next) => T) {
            const result = this.reduce((res: any, currentValue: T) => {
                const index = mountKey(getkey, currentValue);
                if(!res[index]){
                    res[index] = callback(currentValue, res[index]);
                } else {
                    res[index] = callback(currentValue, res[index]);
                }
                return res;
            }, {});

            return Object.values(result);
        }
    })
}