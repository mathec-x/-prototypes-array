# prototypes-array

- a way to implement some extensions to help with array manipulation

## Note
 
 - all extensions are strongly typed and included globally.
 - ensure the least risk of collision and lack of understanding.
 - in order not to risk future implementations of es, all functions start with a capital letter
 - You don't need to extend all the functions in this library


``` bash
npm install prototypes-array
```

## index 

 - [Array Count](#array-count)
 - [Array Distinct](#array-distinct)
 - [Array First](#array-first)
 - [Array Has](#array-has)
 - [Array Last](#array-last)
 - [Array Max](#array-max)
 - [Array Min](#array-min)
 - [Array PercentBy](#array-percentby)
 - [Array Pull](#array-pull)
 - [Array Search](#array-search)
 - [Array Sum](#array-sum)
 - [Array Shape](#array-shape)
### [Prototypes for Strings](https://github.com/mathec-x/-prototypes-string)

## usage

 - just require in root for a full implementation

``` js
    require('prototypes-array')
```

- I just want to implement some array function:

``` js
    require('prototypes-array/lib/count')
    require('prototypes-array/lib/distinct')
    require('prototypes-array/lib/first')
    require('prototypes-array/lib/last')
    require('prototypes-array/lib/max')
    require('prototypes-array/lib/min')
    require('prototypes-array/lib/pull')
    require('prototypes-array/lib/search')
    require('prototypes-array/lib/shape')
    require('prototypes-array/lib/sum')
``` 

# examples

``` js
const teste1 = [
  { id: 1, name: 'Matheus', code: '013' },
  { id: 2, name: 'Thiffani', code: '313' },
  { id: 3, name: 'Janaina', code: '243' },
  { id: 4, name: 'Juliana', code: '034' },
  { id: 5, name: 'Karine', code: '645' },
  { id: 6, name: 'Thais', code: '423' },
  { id: 7, name: 'Thiffani', code: '033' }
];
```

## Array Count

- Count by element equality from an array by property 
- if string returns total found by aggregation
- if by object/function returns number of total found

``` js
teste1.Count((e) => e.code.includes('3') ); // 6
teste1.Count({ name: 'Thiffani' }); // 2

teste1.Count('name'); // [{ name: 'Thiffani', _count: 2 }, {...}]
```

## Array Distinct(pk, props?, includes?)

- pk: the key does the group => string|string[]
- props: select as array the output properties => string[]
- includes: object, add objects to output => Object

``` js
teste1.Distinct('name', ['name']); // [{ name: 'Thiffani' }, {...}]
teste1.Distinct(['name', 'code'], ['id', 'name'], { observations: null })); // [{ id: 2, name: 'Thiffani',  observations: null  }, {...}]
```

## Array First

- Return First Element from array

``` js
teste1.First() // { id: 1, name: 'Matheus', code: '013' }
{}.First() // { }
```

## Array Has (iterator)

- checks whether objects and values ​​contain within the array
- iterator: number|string|function|object

``` js
 'Should return true containing with function'
    const test = array.Has(e => e.name === 'teste 001');
    expect(test).toBe(true);

 'Should return true containing object'
    const test = array.Has({id: 1});
    expect(test).toBe(true);

 'Should return false containing object'
    const test = array.Has({name: 'teste 000'});
    expect(test).toBe(false);

 'Should return true containing in array'
    const test = [0,1,2,3].Has(2);
    expect(test).toBe(true);

 'Should return false not containing in array'
    const test = [0,1,2,3].Has(4);
    expect(test).toBe(false);
```

## Array Last

- Return Last Element from array

``` js
teste1.Last() // { id: 7, name: 'Thiffani', code: '033' }
```

## Array Max

- Return Max By Property

``` js
teste1.Max('code') // 645
```

## Array Min

- Return Min By Property

``` js
teste1.Min('code') // 13
```

## Array PercentBy

- Returns the percentage value assigned by the sum of all values ​​in a property

``` js
const array = [
    { id: 1, peso: 4, done: false, task: 'task 001'},
    { id: 2, peso: 5, done: true, task: 'task 002'},
    { id: 3, peso: 10, done: true, task: 'task 002'},
    { id: 4, peso: 1, done: true, task: 'task 002'}
];

array.PercentBy('peso', { done: true }) // '80.00'
array.PercentBy('peso', { done: false }, 0) // '20')
```

## Array Pull

- Removes all elements from an array by property and returns Number pulled items.

``` js
teste1.Pull({ name: 'Thiffani' }) // 2
teste1.Pull({ name: 'Test' }) // 0
teste1.Pull({ id: 4 }) // 1
```

## Array Search

- Provides a deep text search within array and array objects within array and arrays...

``` js
test1.Search('text or anything you want to fetch') // [ ... ]
```

## Array Sum

- Sums all the numeric property entered and returns a number

``` js
teste1.Sum('id') // 28
teste1.Sum(e => e.id) // 28
```

## Array Shape

- Enforces the types and keys of an array or object

``` ts
'Array only'
    const input = [['1', ['2021-10-01 00:00:000', '00']]];
    const result = input.Shape({ id: Number, query: [{ created: (x) => new Date(x) }] });
    expect(result).toEqual([
        { id: 1, query: [
            { created: new Date("2021-10-01T03:00:00.000Z")}, { created: new Date("2000-01-01T02:00:00.000Z") }
        ] 
    }])

    const result: {
        id: NumberConstructor;
        query: {
            created: (x: any) => Date;
        }[];
    }[]

'Object with Array'
    const input = { id: '1', query: [{ created: '2021-10-01 00:00:000' }] };
    const result = input.Shape({ id: Number, query: [{ created: (x) => new Date(x) }] });
    expect(result).toEqual({ id: 1, query: [{ created: new Date("2021-10-01T03:00:00.000Z") }] })

    const result: {
        id: NumberConstructor;
        query: {
            created: (x: any) => Date;
        }[];
    }
})

'Object with Object'
    const input = { id: '1', query: { created: '2021-10-01 00:00:000' } }
    const result = input.Shape({ id: Number, query: { created: (x) => new Date(x) } });
    expect(result).toEqual({ id: 1, query: { created: new Date("2021-10-01T03:00:00.000Z") } })

    const result: {
        id: NumberConstructor;
        query: {
            created: (x: any) => Date;
        };
    }

```