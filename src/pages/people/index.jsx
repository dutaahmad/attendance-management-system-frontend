import { useState, useEffect } from "preact/hooks";
import { useHistory } from "react-router-dom";

import { getPeople } from "../../api/people";
import { getToken } from "../../utils/functions/session_handler";

import { AddButton } from "../../components/button";
import MainTable from "../../components/MainTable";
import { Loader } from "../../components/Loader";

export const PeopleList = () => {
  const navigate = useHistory();

  const [peopleList, setPeopleList] = useState([]);
  const [peopleHeaders, setPeopleHeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function handleGetData() {
    console.log("handleGetData called");
    const res = await getPeople(getToken());
    setPeopleList(
      res.map((item) => {
        delete item.is_active;
        return item;
      })
    );
    setPeopleHeaders(Object.keys(res[0]));
  }

  function goToDetail(id) {
    navigate.push(`/detail-orang/${id}`);
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "fullname",
      render: (value, record) => {
        return (
          <button
            className="text-blue-500 p-[0.5rem] m-auto"
            onClick={() => goToDetail(record.person_id)}
          >
            {value}
          </button>
        );
      },
    },
    { title: "ID", dataIndex: "person_id" },
  ];

  useEffect(() => {
    handleGetData();

    return setLoading(false);
  }, []);

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
    <div className="fixed flex flex-col items-center justify-center h-full w-[80%] {bg-white} ml-[6rem]">
      <div className="flex flex-row items-end justify-end w-full">
        <AddButton
          customStyle={"flex-end"}
          addButtonName="Daftarkan Orang Baru"
          navigator={() => navigate.push("/tambah-orang")}
        />
      </div>
      <MainTable data={peopleList} columns={columns} loading={loading} />
    </div>
  );
};
