import { useState } from 'preact/hooks';
import { Button, Card, CardHeader, CardBody, Input, Typography } from '@material-tailwind/react';
import { addPeople } from '../../api/people';
import { getToken } from '../../utils/functions/session_handler';
import { Modal } from '../../components/Modal';
import { useHistory } from 'react-router-dom';


export function AddPeople() {

    let navigate = useHistory()

    let [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState(
        {
            fullname: ""
        }
    )

    const inputHandler = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    function submitData() {
        setIsOpen(true)
        console.log("formData = ", formData)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const res = await addPeople(
            getToken(),
            formData
        )
        console.log(res)

        navigate.push('/daftar-orang')
        // window.location.href = '/daftar-orang'

    }

    return (
        <>
            <Card
                className=" 
                relative
                md:fixed
                mt-[5rem]
                md:ml-[15rem]
                rounded-[.75rem]
                w-[80%]
                h-[80%]
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
                        Tambah Data Orang
                    </Typography>
                </CardHeader>
                <CardBody className=''>
                    <form
                        className="
                    flex flex-col
                    justify-center
                    sm:justify-between
                    items-center
                    gap-[2rem]
                    "
                    // onSubmit={submitData}
                    >
                        <div
                            className="
                        w-full
                        flex
                        flex-col 
                        gap-[1rem]
                        sm:flex-row
                        sm:gap-[2rem]
                        justify-center
                        sm:justify-evenly 
                        
                    "
                        >
                            <label
                                className="
                            text-gray-900 
                            font-medium
                            sm:text-[1.4rem]
                            w-full
                            "
                            >
                                Nama Lengkap
                            </label>

                            {/* <input
                                className="
                            rounded-md 
                            py-[.5rem]
                            px-[0.5rem]
                            sm:px-[1rem] 
                            shadow-2xl 
                            w-full
                            "
                                onChange={inputHandler}
                                required
                            /> */}
                            <Input
                                label='Nama Lengkap'
                                type='text'
                                name='fullname'
                                value={formData.fullname}
                                onChange={inputHandler}
                                required
                            />
                        </div>
                        <Button
                            variant='filled'
                            size='lg'
                            type='button'
                            onClick={submitData}
                        >
                            Tambah Data
                        </Button>
                        <Modal
                            isOpen={isOpen}
                            // onClose={() => setIsOpen(false)}
                            modalTitle="Tambah Data Orang"
                            confirmButtonName="Ya"
                            confirmFunc={handleSubmit}
                            cancelButtonName="Batal"
                            cancelFunc={() => { setIsOpen(false) }}
                            onClose={() => { setIsOpen(false) }}
                        />
                    </form>
                </CardBody>
            </Card>
        </>
    )
}