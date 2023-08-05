import { useState, useEffect } from 'preact/hooks';
import { useHistory, useParams } from 'react-router-dom';

import { Button, Card, CardHeader, CardBody, Input, Typography } from '@material-tailwind/react';
import { editPeople, getPerson } from '../../api/people';
import { getToken } from '../../utils/functions/session_handler';

import { Loader } from '../../components/Loader';

export function EditPeople() {

    let { people_id } = useParams();

    const [loading, setLoading] = useState(true)
    const [person, setPerson] = useState({})
    const [formData, setFormData] = useState(
        {
            fullname: ""
        }
    )

    async function handleGetData() {
        console.log("handleGetData called")
        const res = await getPerson(getToken(), people_id)
        setPerson(
            res
            // .map(
            //     (item) => {
            //         // (delete item.is_active)
            //         return item
            //     }
            // )
        )
        // setPeopleHeaders(Object.keys(res[0]))
    }

    const inputHandler = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    async function handlePatchData(event) {
        event.preventDefault()
        const res = await editPeople(
            getToken(),
            people_id,
            formData
        )
        console.log(res)

        window.location.href = '/daftar-orang'

    }

    useEffect(
        async () => {
            await handleGetData()
            setLoading(false)
        },
        []
    )


    return (
        loading ? (<Loader />) : (
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
                        Data Milik {person.fullname}
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
                        onSubmit={handlePatchData}
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
                                defaultValue={person.fullname}
                                // value={formData.fullname}
                                onChange={inputHandler}
                                required
                            />
                        </div>
                        <Button
                            variant='filled'
                            size='lg'
                            type='submit'
                        >
                            Ubah Data
                        </Button>
                    </form>
                </CardBody>
            </Card>
        )
    )
}