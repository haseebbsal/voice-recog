'use client';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue } from "@nextui-org/react";
import { useCallback } from "react";
import { BiEdit } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
const columns = [
    { name: "NAME", uid: "name" },
    { name: "PRIORITY", uid: "priority" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
];

const users = [
    {
        id: 1,
        name: "First Task",
        priority: "high",
        team: "Management",
        status: "active",
        age: "29",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        email: "tony.reichert@example.com",
    },
    {
        id: 2,
        name: "Second Task",
        priority: "high",
        team: "Development",
        status: "paused",
        age: "25",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        email: "zoey.lang@example.com",
    },
    {
        id: 3,
        name: "Third Task",
        priority: "low",
        team: "Development",
        status: "active",
        age: "22",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        email: "jane.fisher@example.com",
    },
    {
        id: 4,
        name: "Fourth Task",
        priority: "medium",
        team: "Marketing",
        status: "medium",
        age: "28",
        avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
        email: "william.howard@example.com",
    },
    {
        id: 5,
        name: "Fifth Task",
        priority: "high",
        team: "Sales",
        status: "active",
        age: "24",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        email: "kristen.cooper@example.com",
    },
];



const statusColorMap = {
    active: "success",
    paused: "danger",
    medium: "warning",
};

export default function App() {
    const renderCell = useCallback((user:any, columnKey:any) => {
        const cellValue = user[columnKey];
        console.log(columnKey)
        switch (columnKey) {
            case "name":
                return (
                    <p className="text-gray-900">
                        {user[columnKey]}
                    </p>
                );
            case "priority":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.status as keyof typeof statusColorMap] as 'success' | 'danger' | 'warning'} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.status as keyof typeof statusColorMap] as 'success'|'danger'|'warning'} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip color="success" content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <FaEye/>
                            </span>
                        </Tooltip>
                        <Tooltip color="success" content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <BiEdit/>
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <FiDelete/>
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className="flex justify-center items-center h-full">
            <Table className="w-[70%]" aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={users}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div> 
    );
}
