import Tooltip from "@material-ui/core/Tooltip";
import React from "react";


 export default function columns() {
     return [
    { field: 'id',
        hide: true,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
    },
    {
        field: 'sample_id',
        headerName: 'Sample ID',
        width: 150,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
    },
    {
        field: 'sample_name',
        headerName: 'Sample Name',
        width: 160,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
    },
    {
        field: 'well',
        headerName: 'Well',
        width: 80,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
    },
    {
        field: 'submitting_lab',
        headerName: 'Submitting Lab',
        width: 155,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
    },
    {
        field: 'sample_type',
        headerName: 'Sample Type',
        width: 145,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
    },
    {
        field: 'sample_volume_in_ul',
        headerName: 'Sample Volume in ul',
        width: 165,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
    },
    {
        field: 'requested_services',
        headerName: 'Requested Services',
        width: 175,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
    },
    {
        field: 'submitter_project',
        headerName: 'Submitter Project',
        width: 165,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
    },
    {
        field: 'strain',
        headerName: 'Strain',
        width: 120,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
    },
    {
        field: 'isolate',
        headerName: 'Isolate',
        width: 100,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
    },
    {
        field: 'genus',
        headerName: 'Genus',
        width: 115,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
    },
    {
        field: 'species',
        headerName: 'Species',
        width: 110,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
    },
    {
        field: 'subspecies_subtype_lineage',
        headerName: 'Subspecies Subtype Lineage',
        width: 150,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
    },
    {
        field: 'approx_genome_size_in_bp',
        headerName: 'Approx. Genome Size (bp)',
        width: 150,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
    },
    {
        field: 'comments',
        headerName: 'Comments',
        width: 130,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
        renderCell: (params) => (
          <Tooltip title={params.value}>
            <p style={{fontSize:'0.875rem'}}>{params.value}</p>
          </Tooltip>
        ),
    },
    {
        field: 'culture_date',
        headerName: 'Culture Date',
        width: 150,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
        type: 'date',
        valueFormatter: (params) => {
          const parts = (params.value).split('-');
          const myDate = new Date(parts[0], parts[1] - 1, parts[2]);
          return myDate.toDateString()
        },
    },
    {
        field: 'culture_conditions',
        headerName: 'Culture Conditions',
        width: 150,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
        renderCell: (params) => (
          <Tooltip title={params.value}>
            <p style={{fontSize:'0.875rem'}}>{params.value}</p>
          </Tooltip>
        ),
    },
    {
        field: 'dna_extraction_date',
        headerName: 'DNA Extraction Date',
        width: 130,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
    },
    {
        field: 'dna_extraction_method',
        headerName: 'DNA Extraction Method',
        width: 130,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
    },
    {
        field: 'qubit_concentration_in_ng_ul',
        headerName: 'Qubit Concentration (ul)',
        width: 130,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
    },
    {
        field: 'created',
        headerName: 'Created',
        width: 150,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
        type: 'date',
        valueFormatter: (params) => (new Date(params.value)).toDateString(),
    },
    {
        field: 'modified',
        headerName: 'Modified',
        width: 150,
        headerClassName: 'header-style',
        headerAlign: 'center',
        cellClassName: 'cell-style',
        type: 'date',
        valueFormatter: (params) => (new Date(params.value)).toDateString(),
    },
]};


