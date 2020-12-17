import { dataToString, formatFilterQueries } from 'utils'
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

describe('dataToString correctly converts error data object to string', () => {
    each`
        errorData                                                              | expected
        ${[{'a': ['error1']}, {'b': ['error2', 'error3']}, {'c': ['error4']}]} | ${['Sample 1:\n\ta\n\t\terror1','Sample 2:\n\tb\n\t\terror2\n\t\terror3', 'Sample 3:\n\tc\n\t\terror4']}
        ${[{'a': ['error1'], 'b': ['error2']}]}                                | ${['Sample 1:\n\ta\n\t\terror1\n\tb\n\t\terror2']}
    `.test('$errorData => $expected', ({errorData, expected}) => {
        expect(dataToString(errorData) === expected)
    })
})

describe('formatFiltersQueries', () => {
    const inputs = {
        singleFilter: {
            sampleName: {
                match: '',
                isExact: false
            },
            projectName: {
                match: 'AAA',
                isExact: false
            },
            dateRange: {
                match: []
            },
            lab: {
                match: '',
                isExact: false
            },
            genus: {
                match: '',
                isExact: false
            },
            sampleType: {
                match: '',
                isExact: false
            }
        },
        noFilter: {
            sampleName: {
                match: '',
                isExact: false
            },
            projectName: {
                match: '',
                isExact: false
            },
            dateRange: {
                match: []
            },
            lab: {
                match: '',
                isExact: false
            },
            genus: {
                match: '',
                isExact: false
            },
            sampleType: {
                match: '',
                isExact: false
            }
        },
        multipleFilters: {
            sampleName: {
                match: 'BBB',
                isExact: false
            },
            projectName: {
                match: 'AAA',
                isExact: false
            },
            dateRange: {
                match: []
            },
            lab: {
                match: '',
                isExact: false
            },
            genus: {
                match: '',
                isExact: false
            },
            sampleType: {
                match: 'aba',
                isExact: false
            }
        },
        dateFilter: {
            dateRange: {
                match: [{c: {
                    year: 2020,
                    month: 10,
                    day: 28
                }}, {c: {
                    year: 2020,
                    month: 10,
                    day: 30
                }}]
            }
        },
        freeTextAndDateFilter: {
            sampleName: {
                match: 'aaa',
                isExact: false
            },
            dateRange: {
                match: [{c: {
                    year: 2020,
                    month: 10,
                    day: 28
                }}, {c: {
                    year: 2020,
                    month: 10,
                    day: 30
                }}]
            }
        },
        isExactFilter: {
            sampleName: {
                match: 'aaa',
                isExact: true
            }
        },
        allFilters: {
            sampleName: {
                sampleName: {
                    match: 'samplename',
                    isExact: false
                }
            },
            projectName: {
                projectName: {
                    match: 'projectname',
                    isExact: false
                }
            },
            dateRange: {
                dateRange: {
                    match: [{c: {
                        year: 2020,
                        month: 10,
                        day: 20
                    }}, {c: {
                        year: 2020,
                        month: 10,
                        day: 22
                    }}]
                }
            },
            lab: {
                lab: {
                    match: 'lab',
                    isExact: false
                }
            },
            genus:{
                genus: {
                    match: 'genus',
                    isExact: false
                }
            },
            sampleType: {
                sampleType: {
                    match: 'sampleType',
                    isExact: false
                }
            }
        }
    }
    each`
        numFilters    | filter                     | expected
        ${0}          | ${inputs.noFilter}         | ${''}
        ${1}          | ${inputs.singleFilter}     | ${'submitter_project__project_name__icontains=AAA'}
        ${3}          | ${inputs.multipleFilters}  | ${'sample_name__icontains=BBB&submitter_project__project_name__icontains=AAA&species__icontains=aba'}
    `.test('$numFilters filters', ({filter, expected}) => {
        expect(formatFilterQueries(filter)).toBe(expected)
    })
    // making expected value for 'lab' false since it's not exposed as a filter
    each`
        filterName          | expected
        ${'sampleName'}     | ${true}
        ${'projectName'}    | ${true}
        ${'dateRange'}      | ${true}
        ${'lab'}            | ${false}
        ${'genus'}          | ${true}
        ${'sampleType'}     | ${true}
    `.test('Converting $filterName follows format filter_name[__sub_name]__[iexact | icontains]=[value]', ({filterName, expected}) => {
        const filterNamePattern = RegExp(/^[a-zA-Z]+(_[a-zA-Z]+)*(__[a-zA-Z]+(_[a-zA-Z]+)*)*__(icontains|iexact|range)=.*$/gm)
        expect(filterNamePattern.test(formatFilterQueries(inputs.allFilters[filterName]))).toBe(expected)
    })
    it('Correctly formats date range filter', () => {
        expect(formatFilterQueries(inputs.dateFilter)).toBe(`created__date__range=2020-10-28%2C+2020-10-30`)
    })
    it('Correctly formats free-text filters and date filters together', () => {
        expect(formatFilterQueries(inputs.freeTextAndDateFilter)).toBe(`sample_name__icontains=aaa&created__date__range=2020-10-28%2C+2020-10-30`)
    })
    it('Changes the query from icontain to iexact if filter is exact', () => {
        expect(formatFilterQueries(inputs.isExactFilter)).toBe(`sample_name__iexact=aaa`)
    })
})