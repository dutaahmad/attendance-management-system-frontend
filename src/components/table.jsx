import { useState, useEffect } from 'preact/hooks';
import { useHistory } from "react-router-dom";
import { Button, Typography } from '@material-tailwind/react';
import { Loader } from './Loader';

export function DataTable({
    tableName, datas, dataKeys, func, addDataPath, addButtonName, handleEdit
}) {

    let history = useHistory()
    const [loading, setLoading] = useState(true)

    useEffect(
        async () => {
            await func()
            setLoading(false)
        }
        , []
    )

    return (
        loading ? (
            <>
                <Loader />
            </>
        ) : (
            <>
                <div
                    className="
                    fixed
                    bg-gray-100
                    rounded-[.75rem]
                    drop-shadow-xl 
                    shadow-xl
                    flex flex-col
                    gap-[0.5rem]
                    p-[0.5rem]
                    mt-[6.5rem]
                    max-h-[80vh]
                    max-w-[90%]
                    md:gap-[1.5rem]
                    md:p-[1.5rem]
                    md:min-w-[80%]
                    md:max-h-[75vh]
                    md:ml-[17rem]
                    "
                >
                    <div className='
                        flex flex-col justify-center items-center gap-[0.5rem] p-6
                        md:flex md:flex-row md:justify-between
                '
                    >
                        {/* <h1
                        className="
                        relative 
                        font-bold 
                        sm:text-[2rem]
                        text-[1rem]
                        text-black
                        " >{tableName}</h1> */}
                        <Typography variant='h2' >{tableName}</Typography>
                        <Button
                            className='w-full md:w-[12rem]'
                            type='button' variant='gradient' size='lg'
                            onClick={() => history.push(addDataPath)}
                        >
                            {addButtonName}
                        </Button>
                    </div>
                    <div
                        className="overflow-scroll rounded-sm"
                    >
                        <table className="relative table-auto w-full ">
                            <tr className='' key={"header"}>
                                <th
                                    className="
                                    bg-blue-500
                                    rounded-sm
                                    md:rounded-md
                                    border-slate-600/[0.5]
                                    p-0
                                    md:p-[0.5rem]
                                    text-white
                                    text-center
                                    text-[8pt]
                                    md:text-[1rem]
                            "
                                >
                                    NO.
                                </th>
                                {
                                    dataKeys.map((key) => (
                                        <th className='
                                            bg-blue-500
                                            rounded-sm
                                            md:rounded-md
                                            border-slate-600/[0.5]
                                            p-0
                                            md:p-[0.5rem]
                                            text-white
                                            text-center
                                            text-[8pt]
                                            md:text-[1rem]
                                        '
                                        >
                                            {key.toUpperCase()}
                                        </th>
                                    ))
                                }
                                <th
                                    className="
                                    bg-blue-500
                                    rounded-sm
                                    md:rounded-md
                                    border-slate-600/[0.5]
                                    p-0
                                    md:p-[0.5rem]
                                    text-white
                                    text-center
                                    text-[8pt]
                                    md:text-[1rem]
                            "
                                >
                                    AKSI
                                </th>
                            </tr>
                            {
                                datas.map(
                                    (item, index) => (
                                        <tr
                                            className="border-b-[1px]
                                                border-slate-300"
                                            key={index} >
                                            <td
                                                className="
                                                text-center
                                                border-r-[1px]
                                                border-slate-300
                                                text-gray-900
                                                p-0
                                                text-[8pt]
                                                md:text-[1rem]
                                                md:p-[0.5rem] 
                                                "
                                            >{index + 1}</td>
                                            {
                                                Object.values(item).map(
                                                    (val) => (
                                                        <td
                                                            className="
                                                            text-center
                                                            border-r-[1px]
                                                            border-slate-300
                                                            text-gray-900
                                                            p-0
                                                            text-[8pt]
                                                            md:text-[1rem]
                                                            md:p-[0.5rem] 
                                                        "
                                                        >
                                                            {val}
                                                        </td>
                                                    )
                                                )
                                            }
                                            <td
                                                className="
                                                text-center
                                                border-r-[1px]
                                                border-slate-300
                                                text-gray-900
                                                p-[4px]
                                                text-[8pt]
                                                flex flex-col
                                                md:text-[1rem]
                                                md:p-[0.5rem] 
                                                md:flex-row
                                                md:justify-center
                                                gap-1
                                                "
                                            >
                                                <Button
                                                    // key={peopleList}
                                                    type='button'
                                                    variant='outlined'
                                                    color='blue'
                                                    size='sm'
                                                    onClick={
                                                        () => handleEdit(item)
                                                    }
                                                >
                                                    info
                                                </Button>
                                                <Button
                                                    type='button'
                                                    variant='filled'
                                                    color='red'
                                                    size='sm'
                                                    onClick={
                                                        () => { }
                                                    }
                                                >
                                                    Hapus
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                        </table >
                    </div>
                </div>
            </>
        )
    )
}