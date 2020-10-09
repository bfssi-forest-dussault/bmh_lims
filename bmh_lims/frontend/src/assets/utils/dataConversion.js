export const mergeHeadersValues = ({headers, values}) => {
    if (headers.length !== values.length) {
        return false // TODO: throw
    }
    return values.reduce((data, currentItem, itemIdx) => {
        data[headers[itemIdx]] = currentItem
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
