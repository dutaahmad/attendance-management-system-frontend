import { useState } from 'preact/hooks';
import { Button, Card, CardHeader, CardBody, Tooltip, Typography } from '@material-tailwind/react';

import { addEmployee } from '../../api/employee';
import { getPeople } from '../../api/people';
import { getToken } from '../../utils/functions/session_handler';
import { ComboBox } from '../../components/ComboBox';
import { getRole } from '../../api/role';
import { Modal } from '../../components/Modal';
import { useHistory } from 'react-router-dom';

export function AddEmployee() {

    const navigate = useHistory()

    const [dataPeople, setDataPeople] = useState([])
    const [dataRole, setDataRole] = useState([])
    const [selectedPerson, setSelectedPerson] = useState("")
    const [selectedRole, setSelectedRole] = useState("")
    let [isOpen, setIsOpen] = useState(false)

    const [formData, setFormData] = useState(
        {
            person_id: "",
            role_id: ""
        }
    )

    function selectPeople(person_id) {
        setSelectedPerson(person_id)
    }

    function selectRole(role_id) {
        setSelectedRole(role_id)
    }

    const inputHandler = () => {
        setFormData(
            {
                person_id: selectedPerson,
                role_id: selectedRole
            }
        )
        setIsOpen(true)
        console.log("formData = ", formData)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const res = await addEmployee(
            getToken(),
            formData
        )
        console.log(res)

        navigate.push('/daftar-pegawai')
    }

    async function handleGetDataPeople() {
        // event.preventDefault()
        const resPeople = await getPeople(getToken())

        setDataPeople(
            resPeople.map(
                (item, index) => (
                    {
                        id: index,
                        fullname: item.fullname,
                        person_id: item.person_id
                    }
                )
            )
        )
    }

    async function handleGetDataRole() {
        const resRole = await getRole(getToken())

        setDataRole(
            resRole.map(
                (item, index) => (
                    {
                        id: index,
                        role_name: item.role_name,
                        role_id: item.role_id
                    }
                )
            )
        )
    }

    console.log("selectedPerson = ", selectedPerson)
    console.log("selectedRole = ", selectedRole)
    console.log("formData = ", formData)

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
                        Tambah Data Pegawai
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
                            {/* Combo Box People */}
                            <label>
                                <Typography
                                    variant="lead"
                                >
                                    Pilih Orang yang akan dijadikan pegawai:
                                </Typography>
                            </label>
                            <ComboBox
                                getDataFunc={handleGetDataPeople}
                                datas={dataPeople}
                                dataName={"fullname"}
                                selectName={"person"}
                                onSelect={selectPeople}
                            />
                            <label>
                                <Typography
                                    variant="lead"
                                >
                                    Pilih role:
                                </Typography>
                            </label>
                            <ComboBox
                                getDataFunc={handleGetDataRole}
                                datas={dataRole}
                                dataName={"role_name"}
                                selectName={"role"}
                                onSelect={selectRole}
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
                        <Tooltip content='Untuk menambah data murid silahkan pilih role murid' placement='top-start' >
                            <Button
                                variant='filled'
                                size='lg'
                                type='button'
                                onClick={inputHandler}
                            >
                                Tambah Data
                            </Button>
                        </Tooltip>
                        <Modal
                            isOpen={isOpen}
                            // onClose={() => setIsOpen(false)}
                            modalTitle="Tambah Data Pegawai"
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