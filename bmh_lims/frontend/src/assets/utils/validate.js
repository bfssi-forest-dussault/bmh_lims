export const validateData = (sampleData) => {
    // TODO: instantiate elsewhere
    const reqHeaders = new Set([
        'sample_name',
        'tube/plate_label',
        'submitting_lab',
        'submission_date',
        'submission_format',
        'sample_volume_in_uL',
        'requested_services',
        'submitter_project_name',
        'genus',
        'species',
        'culture_date',
        'culture_conditions'])
    const optHeaders = new Set([
        'well',
        'project_id',
        'strain',
        'isolate',
        'subspecies/subtype/lineage',
        'approx_genome_size_in_bp',
        'details/comments',
        'dna_extraction_date',
        'dna_extraction_method',
        'qubit_dna_concentration_in_ng/uL'])
    // ensure all headers are expected and that some value is given for required headers
    const sampleIsValid = (sample) => Object.keys(sample).reduce((isValid, header) => isValid && ((reqHeaders.has(header) && !!sample[header]) || optHeaders.has(header)), true)
    return sampleData.reduce((allIsValid, sample) => allIsValid && sampleIsValid(sample), true)
}

export const isCSV = (filename) => {
    return RegExp('\.[csv]$').test(filename)
}

export const isExcel = (filename) => {
    return RegExp('\.[xlsx|xlsx]$').test(filename)
}
