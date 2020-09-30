import XLSX from 'xlsx'


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
        const data = XLSX.utils.sheet_to_csv(ws, {header:1});
        toDo(data)
    };
    reader.readAsBinaryString(xlsxFile);
}
