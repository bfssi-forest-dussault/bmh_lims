import { mergeHeadersValues, dataToString } from 'utils'
import each from 'jest-each'


const isEqual = (obj1, obj2) => {
    if (!!obj1 && !!obj2) {
        return (
            Object.keys(obj1).length === Object.keys(obj2).length
            && Object.keys(obj1).reduce((equalSoFar, key) => equalSoFar && (obj2[key] === obj1[key]), true)
        )
    }
    return obj1 === obj2
}

describe('Internal assertion functions properly', () => {
    each`
        testName                                                       | obj1                          | obj2                           | shouldMatch
        ${'Same keys and same order of keys are equivalent'}           | ${{'a': 1, 'b': 2, 'c': 3}}   | ${{'a': 1, 'b': 2, 'c': 3}}    | ${true}
        ${'Same key and different order of keys are equivalent'}       | ${{'a': 1, 'c': 3, 'b': 2}}   | ${{'a': 1, 'b': 2, 'c': 3}}    | ${true}
        ${'Same key and different values are not equivalent'}          | ${{'a': 1, 'b': 2, 'c': 2}}   | ${{'a': 1, 'b': 2, 'c': 3}}    | ${false}
        ${'Different keys are not equivalent'}                         | ${{'a': 1, 'b': 2, 'c': 3}}   | ${{'a': 1, 'c': 2, 'd': 3}}    | ${false}
        ${'Different number of keys are not equivalent (obj1 < obj2)'} | ${{'a': 1, 'b': 2}}           | ${{'a': 1, 'b': 2, 'c': 3}}    | ${false}
        ${'Different number of keys are not equivalent (obj2 < obj1)'} | ${{'a': 1, 'b': 2, 'c': 3}}   | ${{'a': 1, 'b': 2}}            | ${false}
        ${'No keys match'}                                             | ${{}}                         | ${{}}                          | ${true}
    `.test('$testName', ({obj1, obj2, shouldMatch}) => {
        expect(isEqual(obj1, obj2)).toBe(shouldMatch)
    })
})

describe('mergeHeadersValues properly merges headers and values', () => {
    each`
        headers            | values       | expected
        ${['a', 'b', 'c']} | ${[1, 2, 3]} | ${{'a': 1, 'b': 2, 'c': 3}}
        ${['a', 'b']}      | ${[1, 2, 3]} | ${false}
        ${['a', 'b', 'c']} | ${[1, 2]}    | ${false}
    `.test('$headers with $values returns $expected', ({headers, values, expected}) => {
        expect(isEqual(mergeHeadersValues({headers, values}), expected)).toBe(true)
    })
})

describe('dataToString correctly converts error data object to string', () => {
    each`
        errorData                                                              | expected
        ${[{'a': ['error1']}, {'b': ['error2', 'error3']}, {'c': ['error4']}]} | ${'Sample 1:\n\ta\n\t\terror1\nSample 2:\n\tb\n\t\terror2\n\t\terror3\nSample 3:\n\tc\n\t\terror4'}
    `.test('$errorData => $expected', ({errorData, expected}) => {
        expect(dataToString(errorData) === expected)
    })
})