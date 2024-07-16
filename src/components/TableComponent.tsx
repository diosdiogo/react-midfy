import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridValidRowModel } from '@mui/x-data-grid';
import { ColumnTable } from '../interface/IColumTable';

interface TableProps<T extends GridValidRowModel> {
  columns: ColumnTable<T>[];
  data: T[];
}

export default function TabelComponet<T extends GridValidRowModel>({ columns, data }: TableProps<T>) {
  const gridColumns: GridColDef[] = columns.map((column) => ({
    field: String(column.field),
    headerName: column.label,
    width: column.minWidth || 150,
    renderCell: column.renderCell
    ? (params: GridRenderCellParams<any, T, any>) => column.renderCell!(params)
    : undefined,
  }));

  return (
      <DataGrid
        rows={data}
        columns={gridColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    )
}