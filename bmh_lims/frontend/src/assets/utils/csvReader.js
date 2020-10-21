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
        const data = XLSX.utils.sheet_to_json(ws, {header: 1, blankrows: false});
        const stringifiedData = data.map(row => {
            return Object.keys(row).map(header => Object.prototype.toString.call(row[header]) === '[object Date]' ? row[header].toISOString().split('T')[0] : row[header])
        })
        toDo(stringifiedData)
    };
    reader.readAsBinaryString(xlsxFile);
}
