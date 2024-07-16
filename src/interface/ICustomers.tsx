import { Avatar, IconButton } from "@mui/material";
import { ColumnTable } from "./IColumTable";
import { format } from "date-fns";

export interface CustomersData {
    id: number;
    name: string;
    avatar: string;
    createdAt: string;
}

export const customersColumns: ColumnTable<CustomersData>[] = [
    {
        field: 'id',
        label: 'ID',
        action: false,
        minWidth: 100
    },
    {
        field: 'avatar',
        label: 'Imagem',
        action: false,
        renderCell: (params) => (<Avatar alt="avatar" src={params.value as string} />),
        minWidth: 100
    },
    {
        field: 'name',
        label: 'Name',
        action: false,
        minWidth: 500
    },

    {
        field: 'createdAt',
        label: 'Data',
        action: false,
        renderCell: (params: any) => (
            <div>
              {format(new Date(params.value), 'dd/MM/yyyy')}
            </div>
        ),
        minWidth: 100
    },
    {
        field: 'action',
        label: 'Ação',
        minWidth: 200,
        align: 'right',
        action: true,
    }
];
