export const validateData = (sampleData) => {
    // TODO: instantiate elsewhere
    const reqHeaders = new Set([
        'sample_name',
        'well',
        'submitting_lab',
        'sample_volume_in_ul',
        'submitter_project'])
    const optHeaders = new Set([
        'strain',
        'isolate',
        'genus',
        'species',
        'subspecies_subtype_lineage',
        'approx_genome_size_in_bp',
        'comments',
        'culture_date',
        'culture_conditions',
        'dna_extraction_date',
        'dna_extraction_method',
        'qubit_concentration_in_ng_ul'
        ])
    // ensure all headers are expected and that some value is given for required headers
    const spreadsheetHeaders = new Set(Object.keys(sampleData[0]))
    const missingHeaders = [...reqHeaders, ...optHeaders].reduce((missingHeaders, header) => {
        if(!spreadsheetHeaders.has(header)){
            missingHeaders.push(header)
        }
        return missingHeaders
    }, [])
    if (missingHeaders.length > 0) {
        return `Spreadsheet is missing the following headers: ${missingHeaders.join(', ')}`
    }
    const headerErrors = sampleData.reduce((errors, sample, idx) => {
        const missingHeaders = [...reqHeaders].reduce((missing, header) => {
            if (!sample[header] && sample[header] !== 0) {
                missing.push(header)
            }
            return missing
        }, [])
        if (missingHeaders.length > 0) {
            errors.push(`Sample no. ${idx + 1} (name: ${sample.sample_name}) is missing values for required headers: ${missingHeaders.join(', ')}`)
        }
        return errors
    }, [])
    return headerErrors.join('\n')
}

export const isCSV = (filename) => {
    return RegExp('\.[csv]$').test(filename)
}

export const isExcel = (filename) => {
    return RegExp('\.[xlsx|xlsx]$').test(filename)
}
