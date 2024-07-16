import { GridCellParams, GridValidRowModel } from "@mui/x-data-grid";

export interface ColumnTable<T extends GridValidRowModel> {
    field: string;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    action: Boolean;
    renderCell?: (params: GridCellParams<T>) => React.ReactNode;
}
  