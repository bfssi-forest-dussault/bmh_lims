import React from 'react';
import { DataGrid,GridToolbar} from '@material-ui/data-grid';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import "./styles.css";


const useStyles = makeStyles({
  root: {
    '& .cell-style':{
        textAlign:'center',
    }
  },
});
export default function MaterialTable({columns,rows, selectedSamples, setSelectedSamples}) {
    const classes = useStyles();
    //const rows = content;
    //const samples=content;

  return (
    <div style={{ height: '80%', width: '100%', marginBottom:'10px'}} className={classes.root} >
      <DataGrid
        columns={columns}
        rows={rows}
        components={{
            Toolbar: GridToolbar,
        }}
        pageSize={20}
        disableColumnMenu
        checkboxSelection
        setSelectedSamples={setSelectedSamples}
        selectedSamples={selectedSamples}
        disableDensitySelector
        onSelectionModelChange={(e) => {
          const selectedIDs = new Set(e.selectionModel);
          const selectedRowData = rows.filter((r) =>
            selectedIDs.has(r.id.toString())
          );
          setSelectedSamples(selectedRowData)
          //console.log(selectedSamples);
          //console.log(selectedRowData)
                    //     if (selectedSamples.items.has(samples[idx][selectedSamples.property])) {
                    //         selectedSamples.items.delete(samples[idx][selectedSamples.property])
                    //         setSelectedSamples({property: 'id', items: new Set(selectedSamples.items)})
                    //     } else {
                    //         selectedSamples.items.add(samples[idx][selectedSamples.property])
                    //         setSelectedSamples({property: 'id', items: new Set(selectedSamples.items)})
                    //     }
        }}
        //selectionModel={rows}
      />
    </div>
  );
}
