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

[Count](#array-count)

[Distinct](#array-distinct)

[First](#array-first)

[Has](#array-has)

[Last](#array-last)

[Max](#array-max)

[Min](#array-min)

[PercentBy](#array-percentby)

[Pull](#array-pull)

[Search](#array-search)

[Sum](#array-sum)

[Shape](#array-shape)

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

## Array Distinct(pk, props, includes)

- pk: the key does the group => string|string[]
- props: the output properties
- includes: add objects to output

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

## Array Has

- checks whether objects and values ​​contain within the array

``` js
array.Has({id: 1}); // true
array.Has({name: 'teste 000'}); // false

const nmbrs = [0,1,2,3];
nmbrs.Has(2); // true
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

``` js 

1) Array
[['1', ['2021-10-01 00:00:000','00']] ].Shape({id: Number, query: [{ created: (x) => new Date(x) }]}) 

const result: {
    id: NumberConstructor;
    query: {
        created: (x: any) => Date;
    }[];
}[] = [{ id:1, query :[{created:"2021-10-01T03:00:00.000Z"},{created:"2000-01-01T02:00:00.000Z"}]}]

2) Object with Array

{id: '1', query: [{ created: '2021-10-01 00:00:000' }]}.Shape({id: Number, query: [{ created: (x) => new Date(x) }]}) 

const result: {
    id: NumberConstructor;
    query: {
        created: (x: any) => Date;
    }[];
} = { id: 1, query: [ { created: 2021-10-01T03:00:00.000Z }]}

3) Object with Object

{id: '1', query: { created: '2021-10-01 00:00:000' }}.Shape({id: Number, query: { created: (x) => new Date(x) }}) 

const result: const m: {
    id: NumberConstructor;
    query: {
        created: (x: any) => Date;
    };
} = { id: 1, query: { created: 2021-10-01T03:00:00.000Z}}

```
