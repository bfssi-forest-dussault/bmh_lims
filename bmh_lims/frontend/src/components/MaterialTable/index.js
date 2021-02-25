import React from 'react';
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';


export default function MaterialTable({content}) {
    console.log(content)
  const rows = content;

    const columns =[
        { field: 'id', hide: true },
        {
            field: 'sample_id',
            headerName: 'Sample ID',
            width: 120,
            headerClassName: 'header-style', // add centering
        },
        {
            field: 'sample_name',
            headerName: 'Sample Name',
            width: 100,
            headerClassName: 'header-style',
        },
        {
            field: 'well',
            headerName: 'Well',
            width: 100,
            headerClassName: 'header-style',
        },
        {
            field: 'submitting_lab',
            headerName: 'Submitting Lab',
            width: 100,
            headerClassName: 'header-style',
        },
        {
            field: 'sample_type',
            headerName: 'Sample Type',
            width: 100,
            headerClassName: 'header-style',
        },
        {
            field: 'sample_volume_in_ul',
            headerName: 'Sample Volume in ul',
            width: 100,
            headerClassName: 'header-style',
        },
        {
            field: 'requested_services',
            headerName: 'Requested Services',
            width: 100,
            headerClassName: 'header-style',
        },
        {
            field: 'submitter_project',
            headerName: 'Submitter Project',
            width: 100,
            headerClassName: 'header-style',
        },
        {
            field: 'strain',
            headerName: 'Strain',
            width: 100,
            headerClassName: 'header-style',
        },
        {
            field: 'isolate',
            headerName: 'Isolate',
            width: 100,
            headerClassName: 'header-style',
        },
        {
            field: 'genus',
            headerName: 'Genus',
            width: 100,
            headerClassName: 'header-style',
        },
        {
            field: 'species',
            headerName: 'Species',
            width: 100,
            headerClassName: 'header-style',
        },
        {
            field: 'subspecies_subtype_lineage',
            headerName: 'Subspecies Subtype Lineage',
            width: 100,
            headerClassName: 'header-style',
        },
        {
            field: 'approx_genome_size_in_bp',
            headerName: 'Approx. Genome Size (bp)',
            width: 100,
            headerClassName: 'header-style',
        },
        {
            field: 'comments',
            headerName: 'Comments',
            width: 100,
            headerClassName: 'header-style',
        },
        {
            field: 'culture_date',
            headerName: 'Culture Date',
            width: 100,
            headerClassName: 'header-style',
        },
        {
            field: 'culture_conditions',
            headerName: 'Culture Conditions',
            width: 100,
            headerClassName: 'header-style',
        },
        {
            field: 'dna_extraction_date',
            headerName: 'DNA Extraction Date',
            width: 100,
            headerClassName: 'header-style',
        },
        {
            field: 'dna_extraction_method',
            headerName: 'DNA Extraction Method',
            width: 100,
            headerClassName: 'header-style',
        },
        {
            field: 'qubit_concentration_in_ng_ul',
            headerName: 'Qubit Concentration (ul)',
            width: 100,
            headerClassName: 'header-style',
        },
        {
            field: 'created',
            headerName: 'Created',
            width: 100,
            headerClassName: 'header-style',
        },
        {
            field: 'modified',
            headerName: 'Modified',
            width: 100,
            headerClassName: 'header-style',
        },
    ];
  return (

    <div style={{ height: 500, width: '100%'}}>
      {/*<DataGrid*/}
      {/*  columns={[{ field: 'id' }, { field: 'username' }, { field: 'age' }]}*/}
      {/*  rows={[*/}
      {/*    {*/}
      {/*      id: 1,*/}
      {/*      username: 'defunkt',*/}
      {/*      age: 38,*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*/>*/}

      <DataGrid
        columns={columns}
        rows={rows}
      />
    </div>
  );
}
