import { useState, useEffect } from 'preact/hooks';
import { useHistory } from "react-router-dom";

import { getToken } from '../../utils/functions/session_handler';
import { DataTable } from '../../components/table';
import { Button, Typography } from '@material-tailwind/react';
import { getUsers } from '../../api/user';

export function Users() {

    const navigate = useHistory()

    let [userDisplayList, setUserDisplayList] = useState([])
    const [userHeaders, setUserHeaders] = useState([])

    async function handleGetData() {
        console.log("handleGetData called")
        const res = await getUsers(getToken())
        setUserDisplayList(
            res
                .map(
                    (item) => {
                        delete item.is_active;
                        delete item.employee_id;
                        if (!item.is_employee) {
                            item.is_employee = "Super Admin"
                        } else {
                            item.is_employee = "Employee"
                        }
                        return item
                    }
                )
        )
        // setUserHeaders(Object.keys(res[0]))
        setUserHeaders(
            ["Status Kepegawaian", "Username", "USER ID"]
        )
    }

    function handleInfo(row) {
        // console.log(`/detail-orang/${row.person_id}`)
        navigate.push(`/detail-pengguna/${row.user_id}`)
    }

    console.log(userHeaders)

    return (
        <DataTable
            tableName="Daftar Pengguna"
            func={handleGetData}
            datas={userDisplayList}
            dataKeys={userHeaders}
            addDataPath={"/tambah-pengguna"}
            addButtonName={"Tambah Pengguna"}
            handleEdit={handleInfo}
        />
    )
}