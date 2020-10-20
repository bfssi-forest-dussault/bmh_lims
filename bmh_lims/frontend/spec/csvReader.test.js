import { csvToJSON } from 'utils'
import each from 'jest-each'

const isEqual = (array1, array2) => {
    let isEqual = true
    array1.forEach((row, idx) => {
        row.forEach((item, itemIdx) => {
            if(item !== array2[idx][itemIdx]) {
                isEqual = false
            }
        })
    })
    return isEqual
}

// test for simple Jest testing framework
test('csvToJSON properly handles regular commas', () => {
    expect(isEqual(csvToJSON('a, b, c'), [['a', 'b', 'c']])).toBe(true)
})

// test for Jest-each's parameterized tests
each`
    input                  | output
    ${'a, b, c'}           | ${[['a', 'b', 'c']]}
    ${'a, b, c\nd, e, f'}  | ${[['a', 'b', 'c'], ['d', 'e', 'f']]}
    ${'a, b, "c ""d"" e"'} | ${[['a', 'b', 'c "d" e']]}
`.test('expect $input to match $output', ({input, output}) => {
    expect(isEqual(csvToJSON(input), output)).toBe(true)
})
