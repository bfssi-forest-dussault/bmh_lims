export const csvReader = (csvFile, toDo) => {
    const reader = new FileReader()
    reader.onload = async (e) => { 
        const text = e.target.result
        toDo(text)
    };
    
    reader.readAsText(csvFile)
}