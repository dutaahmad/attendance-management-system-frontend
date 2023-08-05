import { useState, useEffect } from 'preact/hooks';
import { useHistory } from 'react-router-dom';

import { DataTable } from '../../components/table';
import { getPeople } from '../../api/people';
import { getToken } from '../../utils/functions/session_handler';

import { Button, Typography } from '@material-tailwind/react';
import MainTable from '../../components/MainTable';

export const PeopleList = () => {

  const navigate = useHistory()

  const [peopleList, setPeopleList] = useState([])
  const [peopleHeaders, setPeopleHeaders] = useState([])

  async function handleGetData() {
    console.log("handleGetData called")
    const res = await getPeople(getToken())
    setPeopleList(
      res
        .map(
          (item) => {
            (delete item.is_active)
            return item
          }
        )
    )
    setPeopleHeaders(Object.keys(res[0]))
  }

  function handleInfo(row) {
    // console.log(`/detail-orang/${row.person_id}`)
    navigate.push(`/detail-orang/${row.person_id}`)
  }

  const data = [
    { id: 1, name: 'John', age: 25, position: 'Developer' },
    { id: 2, name: 'Jane', age: 30, position: 'Designer' },
    { id: 3, name: 'Mike', age: 35, position: 'Manager' },
  ];

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (value, record) => {

        return (
          <button className="text-blue-500" onClick={() => { }}>
            {value}
          </button>
        );
      },
    },
    { title: 'Age', dataIndex: 'age' },
    { title: 'Position', dataIndex: 'position' },
  ];

  return (
    // <DataTable
    //   tableName="Daftar Orang"
    //   func={handleGetData}
    //   datas={peopleList}
    //   dataKeys={peopleHeaders}
    //   addDataPath={"/tambah-orang"}
    //   addButtonName={"Tambah Orang"}
    //   handleEdit={handleInfo}
    // />
    <MainTable data={data} columns={columns} />
  )
}