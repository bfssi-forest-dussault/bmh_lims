import XLSX from 'xlsx'
import Papa from 'papaparse'

export const csvReader = (csvFile, toDo) => {
    Papa.parse(csvFile, {skipEmptyLines: true, complete: res => toDo(res.data)})
}

export const xlsxReader = (xlsxFile, toDo) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, {type:'binary', cellDates: true});
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, {header: 1, blankrows: false, skipUndefined: false});
        const stringifiedData = data.map(row => {
            return data[0].map((header, idx) => {
                if(!row[idx]) {
                    return null
                }
                return Object.prototype.toString.call(row[idx]) === '[object Date]' ? row[idx].toISOString().split('T')[0] : row[idx]
            })
        })
        toDo(stringifiedData)
    };
    reader.readAsBinaryString(xlsxFile);
}
