import { Box } from "@chakra-ui/react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Editablecell from "./Editablecell";

// Columns configuration
const columns = [
    {
        accessorKey: 'id',
        header: "ID",
        cell: Editablecell
    },
    {
        accessorKey: 'name',
        header: "Name",
        cell: Editablecell
    },
    {
        accessorKey: 'username',
        header: "UserName",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'email',
        header: "Email",
        cell: (props) => <p>{props.getValue()}</p>
    }
];

const TaskTable = () => {
    // Fetching data with axios and useQuery
    const fetchUsers = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data;
    };

    // useQuery expects an object as an argument in v5
    const { data: dataa = [], isLoading, isError, error } = useQuery({
        queryKey: ['users'],  // Correct usage: queryKey is an object property
        queryFn: fetchUsers,  // Fetching function
    });

    // State to manage the table data
    const [data, setData] = useState([]);

    // Use useEffect to update data state once dataa is fetched
    useEffect(() => {
        if (dataa.length > 0) {
            setData(dataa);  // Update data state when dataa changes
        }
    }, [dataa]);

    console.log(data);
    
    // Using the data with useReactTable
    const table = useReactTable({
        data,  // Ensure data is passed here
        columns,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: "onChange",
        meta: {
            updateData: (rowIndex, columnId, value) => {
                setData(prev =>
                    prev.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...row,
                                [columnId]: value,
                            };
                        }
                        return row;
                    })
                );
            }
        }
    });

    // Handling loading and error states
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <Box>
            <Box className="table" w={table.getTotalSize()}>
                {table.getHeaderGroups().map(headerGroup => (
                    <Box className="tr" key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <Box className="th" key={header.id} w={header.getSize()}>
                                {header.column.columnDef.header}
                                <Box onMouseDown={header.getResizeHandler()} onTouchStart={header.getResizeHandler()} className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""}`}></Box>
                            </Box>
                        ))}
                    </Box>
                ))}
            </Box>
            <Box className="table-body">
                {table.getRowModel().rows.map(row => (
                    <Box className="tr" key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <Box className="td" key={cell.id} w={cell.column.getSize()}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Box>
                        ))}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default TaskTable;
