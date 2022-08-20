
const ReplaceGexp = new RegExp(/[\u0300-\u036f]/, 'g');
export const Normalized = (text: String): string => text && String(text).trim().normalize("NFD").replace(ReplaceGexp, "").toLowerCase();

export const MakeDeepSearch = (part: string, keys: string[], obj: any) => keys.some(
    (key) => obj && typeof obj === 'string' ? Normalized(obj).indexOf(Normalized(part)) > -1
        : obj && obj[key] && typeof obj[key] === 'object' ? MakeDeepSearch(part, Object.keys(obj[key]), obj[key])
            : obj && obj[key] && typeof obj[key] === 'number' ? MakeDeepSearch(part, keys, String(obj[key]))
                : obj && obj[key] && typeof obj[key] === 'string' ? MakeDeepSearch(part, keys, String(obj[key]))
                    : false
)

// DestrureByDots({query: {created: '123'}}, 'query.created'));
export const DestrureByDots = (element: any, property: string): string => {
    // 'a.0.b.c'
    const p = property.split('.');
    for (let index = 0; index < p.length; ++index) {
        if (element[p[index]])
            element = element[p[index]];
        else {
            element = undefined
            break;
        }
    }
    return element;
}


export const FilterByProp = (propsToFilter: Object, objectMatch: Object) => Object.keys(propsToFilter).every((key) => objectMatch[key] === propsToFilter[key]);

export type Replace<
    T extends string,
    S extends string,
    D extends string,
    A extends string = ""> = T extends `${infer L}${S}${infer R}` ? Replace<R, S, D, `${A}${L}${D}`> : `${A}${T}`