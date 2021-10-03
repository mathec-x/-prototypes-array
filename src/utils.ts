
const ReplaceGexp = new RegExp(/[\u0300-\u036f]/, 'g');
export const Normalized = (text: String) : string => text && String(text).trim().normalize("NFD").replace(ReplaceGexp, "").toLowerCase();

export const MakeDeepSearch = (part : string, keys: string[], obj: any) => keys.some( 
    (key) => typeof obj === 'string' ? Normalized(obj).indexOf( Normalized(part) ) > -1
            : typeof obj[key] === 'object' ? MakeDeepSearch(part, Object.keys(obj[key]), obj[key])
            : typeof obj[key] === 'number' ? MakeDeepSearch(part, keys, String(obj[key])) 
            : typeof obj[key] === 'string' ? MakeDeepSearch(part, keys, String(obj[key]))
            : false
)

export const FilterByProp = (propsToFilter: Object, objectMatch: Object) => Object.keys(propsToFilter).every((key) => objectMatch[key] === propsToFilter[key]);