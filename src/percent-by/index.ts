import { FilterByProp } from "../utils";

const PercentBy = function<T>(this: T[], PesoKeyContainsValue: keyof T[], condiction: Partial<T>, rounds = 2) {

    const topicosTotal = this.length;
    let calcule_soma = 0;
    let peso_total = 0;

    for (let i = topicosTotal - 1; i >= 0; i--) {
        peso_total += this[i][PesoKeyContainsValue];
    }

    for (let i = topicosTotal - 1; i >= 0; i--) {
        if (!condiction || FilterByProp(condiction, this[i]) ) {
            calcule_soma += this[i][PesoKeyContainsValue] * 100 / peso_total;
        }
    }
    return (Math.round(calcule_soma) || 0).toFixed(rounds);
}

declare global {
    interface Array<T> {
        /**
        * Return Boolean if key PercentBy value
        */
        PercentBy(PesoKeyContainsValue: keyof T, condiction?: Partial<T>, rounds?: Number): String
    }
}

if (!Array.prototype.PercentBy) {
    Object.defineProperty(Array.prototype, 'PercentBy', {
        value: PercentBy,
    });
}