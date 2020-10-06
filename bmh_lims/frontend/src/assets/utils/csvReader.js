import XLSX from 'xlsx'

export const csvToJSON = dataText => {
    const lines = dataText.trim().split('\n').map(line => {
        const replacedCommas = line.replace(/"([^,"]*,[^,"]*)+"/gm, quote => quote.replace(/,/gm, '%%%%'))
        const replacedQuotes = replacedCommas.replace(/"[^"]*""[^"]*""[^"]*"/gm, quote => quote.replace(/""/gm, '&&&&').replace(/"/gm, ''))
        const values = replacedQuotes.split(',')
        return values.map(value => value.trim().replace(/%%%%/gm, ',').replace(/&&&&/gm, '"').replace(/"/gm, 's'))
    })
    return lines
}

export const csvReader = (csvFile, toDo) => {
    const reader = new FileReader()
    reader.onload = async (e) => { 
        const text = e.target.result
        toDo(text)
    }
    
    reader.readAsText(csvFile)
}

export const xlsxReader = (xlsxFile, toDo) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, {type:'binary'});
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, {header:1});
        toDo(data)
    };
    reader.readAsBinaryString(xlsxFile);
}
