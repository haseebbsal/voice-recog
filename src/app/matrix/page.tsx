'use client';
import axiosInstance from "@/utils/axiosInstance";
// import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
// import { BiEdit } from "react-icons/bi";
// import { FaEye } from "react-icons/fa";
// import { FiDelete } from "react-icons/fi";
// import { IoAddCircleOutline } from "react-icons/io5";
// const columns = [
//     { name: "NAME", uid: "name" },
//     // { name: "PRIORITY", uid: "priority" },
//     // { name: "STATUS", uid: "status" },
//     // { name: "ACTIONS", uid: "actions" },
// ];

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



// const statusColorMap = {
//     active: "success",
//     paused: "danger",
//     medium: "warning",
// };

type taskData = {
    _id: string,
    task_name: string,
    priority1: string,
    priority2:string
}
type DragID = {
    id: string,
    table?:'first'|'second'|'third'|'fourth'|'main'
}

export default function App() {
    const queryClient=useQueryClient()
    const [dragId, setDragId] = useState<null | DragID>(null)
    const [firstTable, setFirstTable] = useState<taskData[]>([])
    const [SecondTable, setSecondTable] = useState<taskData[]>([])
    const [thirdTable, setthirdTable] = useState<taskData[]>([])
    const [fourthTable, setfourthTable] = useState<taskData[]>([])
    const [mainTable, setmainTable] = useState<taskData[]>([])
    const [aiSuggest, setAiSuggested] = useState<boolean>(false)
    const [mobileDragId, setMobileDragID] = useState<null | DragID>(null)
    const [selected,setSelected]=useState<null|string>(null)
    const deleteAllTasks = useMutation(() => axiosInstance.post('/deleteTasks'), {
        onSuccess(data) {
            // queryClient.invalidateQueries('data')
            // setFirstTable([])
            // setSecondTable([])
            // setthirdTable([])
            // setfourthTable([])
        },
    })
    const getTasksQuery = useQuery(['data'], () => axiosInstance.get('/tasks'), {
        select(data) {
            return data.data
            console.log(typeof(data.data.data))
            // return JSON.parse(data.data.data)
        },
        onSuccess(data) {
            // console.log(data.data)
            setmainTable(data)
            // console.log(data)
        },
        refetchOnWindowFocus:false
    })
    console.log(getTasksQuery.data)
    // console.log(mainTable)
    // const [mainTable, setMainTable] = useState(getTasksQuery.data)

    // const renderCell = useCallback((user:any, columnKey:any) => {
    //     const cellValue = user[columnKey];
    //     switch (columnKey) {
    //         case "name":
    //             return (
    //                 <p className="text-gray-900">
    //                     {user[columnKey]}
    //                 </p>
    //             );
    //         case "priority":
    //             return (
    //                 <Chip className="capitalize" color={statusColorMap[user.status as keyof typeof statusColorMap] as 'success' | 'danger' | 'warning'} size="sm" variant="flat">
    //                     {cellValue}
    //                 </Chip>
    //             );
    //         // case "status":
    //         //     return (
    //         //         <Chip className="capitalize" color={statusColorMap[user.status as keyof typeof statusColorMap] as 'success'|'danger'|'warning'} size="sm" variant="flat">
    //         //             {cellValue}
    //         //         </Chip>
    //         //     );
    //         case "actions":
    //             return (
    //                 <div className="relative flex items-center gap-2">
    //                     <Tooltip color="success" content="Details">
    //                         <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
    //                             <FaEye/>
    //                         </span>
    //                     </Tooltip>
    //                     <Tooltip color="success" content="Edit user">
    //                         <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
    //                             <BiEdit/>
    //                         </span>
    //                     </Tooltip>
    //                     <Tooltip color="danger" content="Delete user">
    //                         <span className="text-lg text-danger cursor-pointer active:opacity-50">
    //                             <FiDelete/>
    //                         </span>
    //                     </Tooltip>
    //                 </div>
    //             );
    //         default:
    //             return cellValue;
    //     }
    // }, []);

    return (
        <>
            <div className="mb-8">
                <div className="flex  gap-16 pt-16 px-4 flex-wrap sm:flex-nowrap justify-center items-center">
                    <div className="flex w-full sm:w-[30%] flex-col gap-4">
                        <div className="flex gap-4">
                            <p className="text-center" style={{ writingMode: 'vertical-rl', rotate: '180deg' }}>Important</p>
                            <div className="flex flex-col w-full gap-2 items-center">
                                <p>Urgent</p>
                                <div className="w-full rounded-lg bg-white text-gray-600 p-4 flex flex-col gap-2">
                                    <p className="bg-gray-200 p-2 rounded-md">Name</p>
                                    <div onDrop={(j) => {
                                        if (dragId?.table != 'first') {
                                            if (dragId?.table == 'second') {
                                                setSecondTable(SecondTable.filter((e) => e._id != dragId.id))
                                            }
                                            if (dragId?.table == 'third') {
                                                setthirdTable(thirdTable.filter((e) => e._id != dragId.id))
                                            }
                                            if (dragId?.table == 'fourth') {
                                                setfourthTable(fourthTable.filter((e) => e._id != dragId.id))
                                            }
                                            if (dragId?.table == 'main') {
                                                setmainTable(mainTable.filter((e) => e._id != dragId.id))
                                            }

                                            const item = getTasksQuery.data.find((e: taskData) => e._id == dragId?.id)
                                            // setMainTable([...mainTable, item!])
                                            setFirstTable([...firstTable, item!])
                                            console.log(dragId)
                                        }
                                    }} onDragOver={(j) => {
                                        j.preventDefault()
                                        }}
                                        onTouchStart={() => {
                                            setMobileDragID((prev) => {
                                                if (prev) {
                                                    if (prev?.table != 'first') {
                                                        if (prev?.table == 'third') {
                                                            setthirdTable(thirdTable.filter((e) => e._id != prev.id))
                                                        }
                                                        if (prev?.table == 'fourth') {
                                                            setfourthTable(fourthTable.filter((e) => e._id != prev.id))
                                                        }
                                                        if (prev?.table == 'second') {
                                                            setSecondTable(SecondTable.filter((e) => e._id != prev.id))
                                                        }
                                                        if (prev?.table == 'main') {
                                                            setmainTable(mainTable.filter((e) => e._id != prev.id))
                                                        }
                                                        const item = getTasksQuery.data.find((e: taskData) => e._id == prev?.id)
                                                        setFirstTable([...firstTable, item!])
                                                        setSelected(null)
                                                        // console.log(prev)
                                                        // console.log(item)
                                                        return null
                                                        // console.log(mobileDragId)
                                                    }
                                                }
                                                
                                                return prev
                                            })
                                            // console.log('no here', mobileDragId)

                                            // setMobileDragID(null)
                                        }} 
                                        id="first" className="flex flex-col gap-2 min-h-[7rem] h-[7rem] overflow-auto">
                                        {
                                            firstTable.map((e) => <div draggable onDrag={(j: any) => {
                                                setDragId({ id: e._id, table: 'first' })
                                                j.target.style.cursor = 'grabbing'
                                            }} onDragEnd={(j: any) => {
                                                j.target.style.cursor = 'grab'
                                                }}
                                                onTouchStart={() => {
                                                    console.log('here')
                                                    setMobileDragID({ id: e._id, table: 'first' })
                                                    setSelected('Choose One Of The 3 Quadrants To Place Your Task')
                                                }}
                                                className="cursor-grab" key={e._id}>
                                                {e.task_name}
                                            </div>)
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full gap-2 items-center">
                                <p>Not Urgent</p>
                                <div className="w-full rounded-lg bg-white text-gray-600 p-4 flex flex-col gap-2">
                                    <p className="bg-gray-200 p-2 rounded-md">Name</p>
                                    <div onDrop={(j) => {
                                        if (dragId?.table != 'second') {
                                            if (dragId?.table == 'first') {
                                                setFirstTable(firstTable.filter((e) => e._id != dragId.id))
                                            }
                                            if (dragId?.table == 'third') {
                                                setthirdTable(thirdTable.filter((e) => e._id != dragId.id))
                                            }
                                            if (dragId?.table == 'fourth') {
                                                setfourthTable(fourthTable.filter((e) => e._id != dragId.id))
                                            }
                                            if (dragId?.table == 'main') {
                                                setmainTable(mainTable.filter((e) => e._id != dragId.id))
                                            }


                                            const item = getTasksQuery.data.find((e: taskData) => e._id == dragId?.id)
                                            // setMainTable([...mainTable, item!])
                                            setSecondTable([...SecondTable, item!])
                                            console.log(dragId)
                                        }
                                    }} onDragOver={(j) => {
                                        j.preventDefault()
                                        }}
                                        onTouchStart={() => {
                                            setMobileDragID((prev) => {
                                                if (prev) {
                                                    if (prev?.table != 'second') {
                                                        if (prev?.table == 'third') {
                                                            setthirdTable(thirdTable.filter((e) => e._id != prev.id))
                                                        }
                                                        if (prev?.table == 'fourth') {
                                                            setfourthTable(fourthTable.filter((e) => e._id != prev.id))
                                                        }
                                                        if (prev?.table == 'first') {
                                                            setFirstTable(firstTable.filter((e) => e._id != prev.id))
                                                        }
                                                        if (prev?.table == 'main') {
                                                            setmainTable(mainTable.filter((e) => e._id != prev.id))
                                                        }
                                                        const item = getTasksQuery.data.find((e: taskData) => e._id == prev?.id)
                                                        setSecondTable([...SecondTable, item!])
                                                        setSelected(null)
                                                        // console.log(prev)
                                                        // console.log(item)
                                                        return null
                                                        // console.log(mobileDragId)
                                                    }
                                                }
                                                
                                                return prev
                                            })
                                            // console.log('no here', mobileDragId)

                                            // setMobileDragID(null)
                                        }} 
                                        id="second" className="flex flex-col gap-2 min-h-[7rem] h-[7rem] overflow-auto">
                                        {
                                            SecondTable.map((e) => <div draggable onDrag={(j: any) => {
                                                setDragId({ id: e._id, table: 'second' })
                                                j.target.style.cursor = 'grabbing'
                                            }} onDragEnd={(j: any) => {
                                                j.target.style.cursor = 'grab'
                                                }}
                                                onTouchStart={() => {
                                                    console.log('here')
                                                    setMobileDragID({ id: e._id, table: 'second' })
                                                    setSelected('Choose One Of The 3 Quadrants To Place Your Task')
                                                }}
                                                className="cursor-grab" key={e._id}>
                                                {e.task_name}
                                            </div>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <p className="text-center" style={{ writingMode: 'vertical-rl', rotate: '180deg' }}>Not Important</p>
                            <div className="w-full"><div className="w-full rounded-lg bg-white text-gray-600 p-4 flex flex-col gap-2">
                                <p className="bg-gray-200 p-2 rounded-md">Name</p>
                                <div onDrop={(j) => {
                                    if (dragId?.table != 'third') {
                                        if (dragId?.table == 'second') {
                                            setSecondTable(SecondTable.filter((e) => e._id != dragId.id))
                                        }
                                        if (dragId?.table == 'first') {
                                            setFirstTable(firstTable.filter((e) => e._id != dragId.id))
                                        }
                                        if (dragId?.table == 'fourth') {
                                            setfourthTable(fourthTable.filter((e) => e._id != dragId.id))
                                        }
                                        if (dragId?.table == 'main') {
                                            setmainTable(mainTable.filter((e) => e._id != dragId.id))
                                        }

                                        const item = getTasksQuery.data.find((e: taskData) => e._id == dragId?.id)
                                        // setMainTable([...mainTable, item!])
                                        setthirdTable([...thirdTable, item!])
                                        console.log(dragId)
                                    }
                                }} onTouchStart={() => {
                                    setMobileDragID((prev) => {
                                        if (prev) {
                                            if (prev?.table != 'third') {
                                                if (prev?.table == 'second') {
                                                    setSecondTable(SecondTable.filter((e) => e._id != prev.id))
                                                }
                                                if (prev?.table == 'fourth') {
                                                    setfourthTable(fourthTable.filter((e) => e._id != prev.id))
                                                }
                                                if (prev?.table == 'first') {
                                                    setFirstTable(firstTable.filter((e) => e._id != prev.id))
                                                }
                                                if (prev?.table == 'main') {
                                                    setmainTable(mainTable.filter((e) => e._id != prev.id))
                                                }
                                                const item = getTasksQuery.data.find((e: taskData) => e._id == prev?.id)
                                                setthirdTable([...thirdTable, item!])
                                                setSelected(null)
                                                // console.log(prev)
                                                // console.log(item)
                                                return null
                                                // console.log(mobileDragId)
                                            }
                                        }
                                        
                                        return prev
                                    })
                                    // console.log('no here', mobileDragId)

                                    // setMobileDragID(null)
                                }} onDragOver={(j) => {
                                    j.preventDefault()
                                }} id="third" className="flex flex-col gap-2 min-h-[7rem] h-[7rem] overflow-auto">
                                    {
                                        thirdTable.map((e) => <div draggable onDrag={(j: any) => {
                                            setDragId({ id: e._id, table: 'third' })
                                            j.target.style.cursor = 'grabbing'
                                        }} onDragEnd={(j: any) => {
                                            j.target.style.cursor = 'grab'
                                            }}
                                            onTouchStart={() => {
                                                console.log('here')
                                                setMobileDragID({ id: e._id, table: 'third' })
                                                setSelected('Choose One Of The 3 Quadrants To Place Your Task')
                                            }}
                                            className="cursor-grab" key={e._id}>
                                            {e.task_name}
                                        </div>)
                                    }
                                </div>
                            </div></div>
                            <div className="w-full">
                                <div className="w-full rounded-lg bg-white text-gray-600 p-4 flex flex-col gap-2">
                                    <p className="bg-gray-200 p-2 rounded-md">Name</p>
                                    <div onDrop={(j) => {
                                        if (dragId?.table != 'fourth') {
                                            if (dragId?.table == 'second') {
                                                setSecondTable(SecondTable.filter((e) => e._id != dragId.id))
                                            }
                                            if (dragId?.table == 'third') {
                                                setthirdTable(thirdTable.filter((e) => e._id != dragId.id))
                                            }
                                            if (dragId?.table == 'first') {
                                                setFirstTable(firstTable.filter((e) => e._id != dragId.id))
                                            }
                                            if (dragId?.table == 'main') {
                                                setmainTable(mainTable.filter((e) => e._id != dragId.id))
                                            }


                                            const item = getTasksQuery.data.find((e: taskData) => e._id == dragId?.id)
                                            // setMainTable([...mainTable, item!])
                                            setfourthTable([...fourthTable, item!])
                                            console.log(dragId)
                                        }
                                    }} onDragOver={(j) => {
                                        j.preventDefault()
                                        }} onPointerMove={() => {
                                            console.log('pointer')
                                        }} onMouseEnter={() => {
                                            console.log('enter')
                                        }} onTouchMove={(e) => {
                                            // console.log(e)
                                        console.log('end')
                                        }}
                                        onTouchStart={() => {
                                            setMobileDragID((prev) => {
                                                if (prev) {
                                                    if (prev?.table != 'fourth') {
                                                        if (prev?.table == 'second') {
                                                            setSecondTable(SecondTable.filter((e) => e._id != prev.id))
                                                        }
                                                        if (prev?.table == 'third') {
                                                            setthirdTable(thirdTable.filter((e) => e._id != prev.id))
                                                        }
                                                        if (prev?.table == 'first') {
                                                            setFirstTable(firstTable.filter((e) => e._id != prev.id))
                                                        }
                                                        if (prev?.table == 'main') {
                                                            setmainTable(mainTable.filter((e) => e._id != prev.id))
                                                        }
                                                        const item = getTasksQuery.data.find((e: taskData) => e._id == prev?.id)
                                                        setfourthTable([...fourthTable, item!])
                                                        setSelected(null)
                                                        // console.log(prev)
                                                        // console.log(item)
                                                        return null
                                                        // console.log(mobileDragId)
                                                    }
                                                }
                                                
                                                return prev
                                            })
                                            // console.log('no here', mobileDragId)

                                            // setMobileDragID(null)
                                        }}    id="fourth" className="flex flex-col gap-2 min-h-[7rem] h-[7rem] overflow-auto">
                                        {
                                            fourthTable.map((e) => <div draggable onDrag={(j: any) => {
                                                setDragId({ id: e._id, table: 'fourth' })
                                                j.target.style.cursor = 'grabbing'
                                            }} onDragEnd={(j: any) => {
                                                j.target.style.cursor = 'grab'
                                                }}
                                                onTouchStart={() => {
                                                    console.log('here')
                                                    setMobileDragID({ id: e._id, table: 'fourth' })
                                                    setSelected('Choose One Of The 3 Quadrants To Place Your Task')

                                                }}
                                                className="cursor-grab" key={e._id}>
                                                {e.task_name}
                                            </div>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full sm:w-[60%] justify-center items-center h-full">
                        <div  className="w-full rounded-lg bg-white text-gray-600 p-4 flex flex-col gap-2">
                            <p className="bg-gray-200 p-2 rounded-md">Name</p>
                            <div onDrop={(j) => {
                                // console.log(e)
                                if (dragId?.table != 'main') {
                                    if (dragId?.table == 'second') {
                                        setSecondTable(SecondTable.filter((e) => e._id != dragId.id))
                                    }
                                    if (dragId?.table == 'third') {
                                        setthirdTable(thirdTable.filter((e) => e._id != dragId.id))
                                    }
                                    if (dragId?.table == 'first') {
                                        setFirstTable(firstTable.filter((e) => e._id != dragId.id))
                                    }
                                    if (dragId?.table == 'fourth') {
                                        setfourthTable(fourthTable.filter((e) => e._id != dragId.id))
                                    }
                                    const item = getTasksQuery.data.find((e: taskData) => e._id == dragId?.id)
                                    setmainTable([...mainTable, item!])
                                    console.log(dragId)
                                }
                            }} onTouchStart={() => {
                                setMobileDragID((prev) => {
                                    if (prev) {
                                        if (prev?.table != 'main') {

                                            if (prev?.table == 'second') {
                                                setSecondTable(SecondTable.filter((e) => e._id != prev.id))
                                            }
                                            if (prev?.table == 'third') {
                                                setthirdTable(thirdTable.filter((e) => e._id != prev.id))
                                            }
                                            if (prev?.table == 'first') {
                                                setFirstTable(firstTable.filter((e) => e._id != prev.id))
                                            }
                                            if (prev?.table == 'fourth') {
                                                setfourthTable(fourthTable.filter((e) => e._id != prev.id))
                                            }
                                            const item = getTasksQuery.data.find((e: taskData) => e._id == prev?.id)
                                            console.log(prev)
                                            console.log(item)
                                            setmainTable([...mainTable, item!])
                                            return null
                                            // console.log(mobileDragId)
                                        }
                                    }
                                    
                                    return prev
                                })
                                // console.log('no here', mobileDragId)
                                
                                // setMobileDragID(null)
                            }}  onDragOver={(j) => {
                                j.preventDefault()
                                }} id="main" className="flex flex-col gap-2 min-h-[9rem] max-h-[9rem] overflow-auto">
                                {(getTasksQuery.isFetching) && <p>Loading....</p>}
                                {getTasksQuery.data?.length == 0 && !getTasksQuery.isFetching && <p>Enter Tasks In Prompt To See Tasks Here</p>}
                                {
                                    mainTable?.map((e: taskData) => <div draggable   onDrag={(j: any) => {
                                        setDragId({ id: e._id, table: 'main' })
                                        j.target.style.cursor = 'grabbing'
                                    }} onDragEnd={(j: any) => {
                                        j.target.style.cursor = 'grab'
                                        }}


                                        onTouchStart={() => {
                                            console.log('here')
                                            setMobileDragID({ id: e._id, table: 'main' })
                                            setSelected('Choose One Of The Quadrants To Place Your Task')
                                            
                                        }}
                                        
                                        
                                        className="cursor-grab" key={e._id}>
                                        {e.task_name}
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {getTasksQuery.data && getTasksQuery.data.length != 0 && <div className="mt-16 flex justify-center gap-8">
                    <button onClick={() => {
                        setFirstTable([])
                        setSecondTable([])
                        setthirdTable([])
                        setfourthTable([])
                        setmainTable(getTasksQuery.data)
                    }} className="bg-white hover:bg-gray-400 text-gray-900 px-8 py-2 rounded-lg hover:text-white">Clear Matrix Quadrants</button>
                    {!aiSuggest && <button onClick={() => {
                        const firstTable: taskData[] = []
                        const secondTable: taskData[] = []
                        const thirdTable: taskData[] = []
                        const fourthTable: taskData[] = []
                        getTasksQuery.data.forEach((e: taskData) => {
                            if (e.priority2 == 'Important') {
                                if (e.priority1 == 'Urgent') {
                                    firstTable.push(e)
                                }
                                else {
                                    secondTable.push(e)
                                }
                            }
                            else {
                                if (e.priority1 == 'Urgent') {
                                    thirdTable.push(e)
                                }
                                else {
                                    fourthTable.push(e)
                                }
                            }
                        })
                        console.log(getTasksQuery.data)
                        setAiSuggested(true)
                        setFirstTable(firstTable)
                        setSecondTable(secondTable)
                        setthirdTable(thirdTable)
                        setfourthTable(fourthTable)
                        setmainTable([])
                    }} className="bg-white hover:bg-gray-400 hover:text-white text-gray-900 px-8 py-2 rounded-lg">Get AI Suggestions</button>}
                    {aiSuggest && <div className="flex items-center gap-4">
                        <button onClick={() => {
                            deleteAllTasks.mutate()
                        }} className="bg-white hover:bg-green-900 hover:text-white p-2 rounded-full text-green-900 text-lg"><FaThumbsUp /></button>
                        <button className="bg-white p-2 hover:bg-red-900 hover:text-white rounded-full text-red-900 text-lg"> <FaThumbsDown /></button>
                    </div>}
                </div>}
            </div>
            {selected && <div className="fixed top-8 right-8 px-4 py-8 rounded-lg w-1/2 bg-white text-gray-900">
                <p>{selected}</p>
            </div>
            }
        </>
    );
}
