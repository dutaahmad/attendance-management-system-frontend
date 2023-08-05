import { useState } from 'preact/hooks';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardHeader, CardBody, Input, Typography } from '@material-tailwind/react';
import { getToken } from '../../utils/functions/session_handler';
import { addUser } from '../../api/user';
import { ComboBox } from '../../components/ComboBox';
import { getEmployee } from '../../api/employee';
import { Modal } from '../../components/Modal';

export function AddUser() {

    const navigate = useHistory()

    let [isOpen, setIsOpen] = useState(false)
    const [employeeData, setemployeeData] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [formData, setFormData] = useState(
        {
            username: "",
            password: "",
            employee_id: ""
        }
    )

    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const finalDataHandler = () => {
        setFormData(
            {
                username: username,
                password: password,
                employee_id: selectedEmployee
            }
        )
        console.log("formData = ", formData)
        setIsOpen(true)
    }

    function selectEmployee(employee_id) {
        setSelectedEmployee(employee_id)
    }

    async function handleGetDataEmployee() {
        // event.preventDefault()
        const resPeople = await getEmployee(getToken())

        setemployeeData(
            resPeople.map(
                (item, index) => (
                    {
                        id: index,
                        fullname_employee: item.people.fullname,
                        employee_id: item.employee_id
                    }
                )
            )
        )
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const res = await addUser(
            getToken(),
            formData
        )
        console.log(res)

        navigate.push('/daftar-pengguna')
    }

    return (
        <>
            <Card
                className=" 
                relative
                md:fixed
                md:ml-[16rem]
                bg-gray-100
                rounded-[.75rem]
                w-[80%]
                drop-shadow-xl 
                shadow-xl
                flex 
                flex-col
                gap-[1rem]
                px-[2rem]
                pb-[2rem]
                "
            >
                <CardHeader
                    variant="gradient"
                    color="blue"
                    className="mb-4 px-[2rem] py-[1rem] "
                >
                    <Typography variant="h3" color="white">
                        Tambah Data Pengguna
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form
                        className="
                        flex flex-col
                        justify-center
                        sm:justify-between
                        items-center
                        gap-[2rem]
                        "
                        onSubmit={handleSubmit}
                    >
                        <div
                            className="
                        w-full
                        flex
                        flex-col 
                        gap-[1rem]
                        justify-center
                        sm:justify-start 
                    "
                        >
                            <label>
                                <Typography
                                    variant="lead"
                                >
                                    Pilih Pegawai yang akan dijadikan pengguna aplikasi:
                                </Typography>
                            </label>
                            <ComboBox
                                getDataFunc={handleGetDataEmployee}
                                datas={employeeData}
                                dataName={"fullname_employee"}
                                selectName={"employee"}
                                onSelect={selectEmployee}
                            />
                            <Input
                                label='username'
                                type='text'
                                name='username'
                                value={username}
                                onChange={usernameHandler}
                                required
                            />
                            <Input
                                label='password'
                                type='password'
                                name='password'
                                value={password}
                                onChange={passwordHandler}
                                required
                            />
                        </div>
                    </form>
                    <div
                        className='
                        mt-[2rem]
                    flex flex-row
                    justify-center
                    gap-[1rem]
                    '
                    >
                        <Button
                            variant='filled'
                            size='lg'
                            type='button'
                            onClick={finalDataHandler}
                        >
                            Tambah Data
                        </Button>
                        <Modal
                            isOpen={isOpen}
                            // onClose={() => setIsOpen(false)}
                            modalTitle="Tambah Data Pengguna"
                            confirmButtonName="Ya"
                            confirmFunc={handleSubmit}
                            cancelButtonName="Batal"
                            cancelFunc={() => { setIsOpen(false) }}
                            onClose={() => { setIsOpen(false) }}
                        />
                    </div>
                </CardBody>
            </Card>
        </>
    )
}