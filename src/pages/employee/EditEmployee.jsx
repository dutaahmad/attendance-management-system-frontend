import { useState, useEffect } from 'preact/hooks';
import { useHistory, useParams } from 'react-router-dom';

import { Button, Card, CardHeader, CardBody, Tooltip, Typography } from '@material-tailwind/react';

import { getToken } from '../../utils/functions/session_handler';
import { getSingularEmployee, editEmployee } from '../../api/employee';
import { getRole } from '../../api/role';
import { getPeople } from '../../api/people';

import { Loader } from '../../components/Loader';
import { ComboBox } from '../../components/ComboBox';
import { Modal } from '../../components/Modal';

export function EditEmployee() {

    let { employee_id } = useParams();
    const navigate = useHistory()

    const [loading, setLoading] = useState(true)

    const [dataEmployee, setDataEmployee] = useState({})
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
    }

    async function handleEdit(event) {
        event.preventDefault()
        const res = await editEmployee(
            getToken(),
            employee_id,
            formData
        )
        console.log(res)

        navigate.push('/daftar-pegawai')
    }

    async function handleGetDataEmployee() {
        const resEmployee = await getSingularEmployee(getToken(), employee_id)


        setDataEmployee(resEmployee)
    }

    async function handleGetDataPeoples() {
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

    async function handleGetDataRoles() {
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

    useEffect(
        async () => {
            await handleGetDataEmployee()
            setLoading(false)
        },
        []
    )

    return (
        // <Loader />
        loading ? (<Loader />) : (
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
                        Data {

                        } Detail
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
                        onSubmit={handleEdit}
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
                                getDataFunc={handleGetDataPeoples}
                                defaultData={dataEmployee.people_data}
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
                                getDataFunc={handleGetDataRoles}
                                defaultData={dataEmployee.role_data}
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
                        <Tooltip content='Untuk mengubah data ke murid silahkan pilih role murid' placement='top-start' >
                            <Button
                                variant='filled'
                                size='lg'
                                type='button'
                                onClick={inputHandler}
                            >
                                Ubah Data
                            </Button>
                        </Tooltip>
                        <Modal
                            isOpen={isOpen}
                            modalTitle="Ubah Data Pegawai"
                            modalDialog={
                                <Typography className="text-red-500 font-bold" >
                                    Pastikan anda telah melakukan perubahan!
                                </Typography>
                            }
                            confirmButtonName="Ya"
                            confirmFunc={handleEdit}
                            cancelButtonName="Batal"
                            cancelFunc={() => { setIsOpen(false) }}
                            onClose={() => { setIsOpen(false) }}
                        />
                    </div>
                </CardBody>
            </Card>
        )
    )
}