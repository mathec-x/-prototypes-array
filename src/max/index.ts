export { }
declare global {
    interface Array<T> {
        /**
        * Return Max
        */
        Max(KeyCall: keyof T): number
    }
}

if (!Array.prototype.Max) {
    Object.defineProperty(Array.prototype, 'Max', {
        value: function Max<T>(this: T[], KeyCall: keyof T) {
            let t : number;
            for (let i = this.length - 1; i >= 0; --i) {
                const num: number = Number(this[i][KeyCall]) || 0;
                if(num > t){
                    t = num;
                    continue;
                };
                if(!t) {
                    t = num;
                    continue;
                };            
            }
            return t;
        }
    });
}