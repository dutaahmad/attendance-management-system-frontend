import { useState } from 'preact/hooks';
import { useHistory } from 'react-router-dom';

import { DataTable } from '../../components/table';
import { addStudent, getStudent } from '../../api/student';
import { getToken } from '../../utils/functions/session_handler';

export function StudentsList() {

    const navigate = useHistory()

    const [studentList, setStudentList] = useState([])
    const [studentHeaders, setStudentHeaders] = useState([])

    async function handleGetData() {
        // event.preventDefault()
        const res = await getStudent(getToken())

        setStudentList(
            res.map(
                (item, index) => (
                    {
                        fullname: res[index].people.fullname,
                        employee_id: res[index].employee_id
                        // role: res[index].role.role_name
                    }
                )
            )
        )

        setStudentHeaders([
            "Nama Lengkap",
            "ID"
        ])
    }

    function handleInfo(row) {
        navigate.push(`/detail-pegawai/${row.employee_id}`)
    }

    return (
        <>
            <DataTable
                tableName="Daftar Murid"
                func={handleGetData}
                datas={studentList}
                dataKeys={studentHeaders}
                addDataPath={"/tambah-pegawai"}
                addButtonName={"Tambah Murid"}
                handleEdit={handleInfo} />
        </>
    )
}