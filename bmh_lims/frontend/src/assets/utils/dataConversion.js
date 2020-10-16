export const stringNAtoNull = (strValue) => {
    if (typeof(strValue) === 'string' && strValue.includes('N/A')) {
        return null
    }
    return strValue
}

export const mergeHeadersValues = ({headers, values}) => {
    if (headers.length !== values.length) {
        return false // TODO: throw
    }
    return values.reduce((data, currentItem, itemIdx) => {
        data[headers[itemIdx]] = stringNAtoNull(currentItem)
        return data
    }, {})
}

export const tableToData = ({headers, content}) => {
    return content.reduce((dataArray, sampleInfo) => {
        const rowData = mergeHeadersValues({headers, values: sampleInfo})
        dataArray.push(rowData)
        return dataArray
    }, [])
}

export const dataToString = (errorData) => {
    const sampleErrorList = errorData.map((sampleData) => {
        const errorList = Object.keys(sampleData).map(sampleHeader => `${sampleHeader}\n\t\t${sampleData[sampleHeader].join('\n\t\t')}`)
        return errorList.join('\n\t\t')
    })
    return sampleErrorList.map((errorList, idx) => `Sample ${idx + 1}:\n\t${errorList}`).join('\n')
}
