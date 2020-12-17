import XLSX from 'xlsx'
import Papa from 'papaparse'

export const csvReader = (csvFile, toDo) => {
    Papa.parse(csvFile, {skipEmptyLines: true, header: true, complete: res => toDo(res.data)})
}

export const xlsxReader = (xlsxFile, toDo) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
        const bstr = evt.target.result
        const wb = XLSX.read(bstr, {type:'binary', cellDates: true, sheetStubs: true})
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const data = XLSX.utils.sheet_to_json(ws, {blankrows: false, skipUndefined: false, defval: null})
        toDo(data)
    };
    reader.readAsBinaryString(xlsxFile);
}
