import { useState } from 'preact/hooks';
import { useHistory } from 'react-router-dom';

import { DataTable } from '../../components/table';
import { getEmployee } from '../../api/employee';
import { getToken } from '../../utils/functions/session_handler';

export const EmployeeList = () => {

  const navigate = useHistory()

  const [employeeList, setEmployeeList] = useState([])
  const [employeeHeaders, setEmployeeHeaders] = useState([])

  async function handleGetData() {
    // event.preventDefault()
    const res = await getEmployee(getToken())

    setEmployeeList(
      res.map(
        (item, index) => (
          {
            fullname: res[index].people.fullname,
            role: res[index].role.role_name,
            employee_id: res[index].employee_id
          }
        )
      )
    )

    setEmployeeHeaders(["Nama Lengkap", "Jabatan", "ID"])
  }

  function handleInfo(row) {
    navigate.push(`/detail-pegawai/${row.employee_id}`)
  }

  return (

    <>
      <DataTable
        tableName="Daftar Pegawai"
        func={handleGetData}
        datas={employeeList}
        dataKeys={employeeHeaders}
        addDataPath={"/tambah-pegawai"}
        addButtonName={"Tambah Pegawai"}
        handleEdit={handleInfo} />
    </>
  )
}