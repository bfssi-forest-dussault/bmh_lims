import { csvToJSON } from 'utils'

const isNestedArray = (array1, array2) => {
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

test('csvToJSON properly handles regular commas', () => {
    expect(isNestedArray(csvToJSON('a, b, c'), [['a', 'b', 'c']])).toBe(true)
})
