import { Loader } from "./Loader";

const TableCell = ({ value, record, render }) => {
  if (typeof render === "function") {
    return render(value, record);
  }

  return (
    <td
      className="text-center
                        border-r-[1px]
                        border-slate-300
                        text-gray-900
                        p-0
                        text-[8pt]
                        md:text-[1rem]
                        md:p-[0.5rem]"
    >
      {value}
    </td>
  );
};

const MainTable = ({ data, columns, loading = true, uniqueKeys }) =>
  loading ? (
    <Loader />
  ) : (
    <div
      className="
                  {fixed}
                  
                  bg-gray-100
                  rounded-[.75rem]
                  drop-shadow-xl 
                  shadow-xl
                  flex flex-col
                  gap-[0.5rem]
                  p-[0.5rem]
                  mt-[2rem]
                  max-h-[80vh]
                  max-w-[90%]
                  overflow-scroll
                  md:gap-[1.5rem]
                  md:p-[1.5rem]
                  md:min-w-[50%]
                  md:max-w-[80%]
                  md:max-h-[75vh]
                  md:w-full
                  {md:ml-[17rem]}
                  "
    >
      <table className="relative table-auto w-full ">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.dataIndex}
                className="bg-blue-500
                            rounded-sm
                            md:rounded-md
                            border-slate-600/[0.5]
                            p-0
                            md:p-[0.5rem]
                            text-white
                            text-center
                            text-[8pt]
                            md:text-[1rem]
                            pb-[1rem]
                            "
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={uniqueKeys ? uniqueKeys : index}>
              {columns.map((column) => (
                <TableCell
                  key={column.dataIndex}
                  value={item[column.dataIndex]}
                  render={column.render}
                  record={uniqueKeys ? uniqueKeys : item}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

export default MainTable;
