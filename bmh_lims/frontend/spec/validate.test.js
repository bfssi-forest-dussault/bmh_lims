import { validateData } from 'utils'
import { spreadsheetInputs, sampleInputs } from './validateTest.inputs'
import each from 'jest-each'

describe('validateData correctly identifies when data is missing headers', () => {
    each`
    spreadsheet                                     | expected
    ${spreadsheetInputs.noMissingHeaders}           | ${''}
    ${spreadsheetInputs.missingOneReqHeader}        | ${'Spreadsheet is missing the following headers: well'}
    ${spreadsheetInputs.missingOneOptHeader}        | ${'Spreadsheet is missing the following headers: comments'}
    ${spreadsheetInputs.missingMultipleReqHeaders}  | ${'Spreadsheet is missing the following headers: well, submitting_lab'}
    ${spreadsheetInputs.missingMultipleOptHeaders}  | ${'Spreadsheet is missing the following headers: comments, culture_date, culture_conditions'}
    ${spreadsheetInputs.missingReqAndOptHeaders}    | ${'Spreadsheet is missing the following headers: submitting_lab, sample_volume_in_ul, culture_date, dna_extraction_method'}
    ${spreadsheetInputs.missingAllHeaders}          | ${'Spreadsheet is missing the following headers: sample_name, well, submitting_lab, sample_volume_in_ul, submitter_project, strain, isolate, genus, species, subspecies_subtype_lineage, approx_genome_size_in_bp, comments, culture_date, culture_conditions, dna_extraction_date, dna_extraction_method, qubit_concentration_in_ng_ul'}
    `.test('correctly identifies whether headers are there or not', ({spreadsheet, expected}) => {
        expect(validateData(spreadsheet)).toBe(expected)
    })
    each`
    sampleData | expected
    ${sampleInputs.singleSampleNotMissingAnything} | ${''}
    ${sampleInputs.singleSampleMissingReqValue} | ${'Sample no. 1 (name: a) is missing values for required headers: well'}
    ${sampleInputs.singleSampleMissingOptValue} | ${''}
    ${sampleInputs.singleSampleZeroValueIsFine} | ${''}
    ${sampleInputs.singleSampleMissingStringReqValue} | ${'Sample no. 1 (name: ) is missing values for required headers: sample_name'}
    ${sampleInputs.multipleSamplesMissingDifferentHeaders} | ${'Sample no. 1 (name: a) is missing values for required headers: well\nSample no. 2 (name: b) is missing values for required headers: sample_volume_in_ul\nSample no. 3 (name: c) is missing values for required headers: submitter_project'}
    ${sampleInputs.multipleSamplesSomeNotMissingAnything} | ${'Sample no. 2 (name: b) is missing values for required headers: submitting_lab'}
    `.test('correctly identifies when samples are missing required values', ({sampleData, expected}) => {
        expect(validateData(sampleData)).toBe(expected)
    })
})
