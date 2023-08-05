import { useState, useEffect } from 'preact/hooks';

import { useHistory } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
} from '@material-tailwind/react';
import { StarIcon } from "@heroicons/react/24/solid";
import { getAuth, getToken } from "../../utils/functions/session_handler";
import { getSingularEmployee } from "../../api/employee";
import { Loader } from '../../components/Loader';

export function MyProfile() {

    let history = useHistory()

    const navigation = {
        toGenerate: () => { history.push('/generate-attendance-qrcode') },
        toScan: () => { history.push('/scan-attendance-qrcode') },

    }

    const [dataEmployee, setDataEmployee] = useState({})
    const [loading, setLoading] = useState(true)

    async function handleGetDataEmployee() {
        let userData = getAuth()
        const resEmployee = await getSingularEmployee(getToken(), userData.employee_id)

        setDataEmployee(resEmployee)
    }

    useEffect(
        async () => {
            await handleGetDataEmployee()
            setLoading(false)
        },
        []
    )

    return (
        loading ? (
            <Loader />
        ) : (
            <Card
                color="white"
                shadow={true}
                className="
                bg-gray-50 
                w-full 
                md:w-auto 
                md:min-w-[26rem]
                p-[1rem] 
                md:p-[2rem] 
                max-w-[85%] 
                md:max-w-[70%]
                {md:mt-[6rem]}
                "
            >
                <CardHeader
                    color="transparent"
                    floated={false}
                    shadow={false}
                    className="mx-0 flex flex-col md:flex-row items-center gap-[2rem] pb-4 md:pb-16 "
                >
                    <Avatar
                        size="xxl"
                        variant="circular"
                        src={`https://ui-avatars.com/api/?name=${dataEmployee.people_data.fullname}`}
                        alt={dataEmployee.people_data.fullname}
                    />
                    <div className="flex w-full flex-col gap-0.5">
                        <div className="flex items-center justify-center md:justify-between ">
                            <Typography
                                variant="h3"
                                color="blue-gray"
                                className=" md:text-4rem "
                            >
                                {dataEmployee.people_data.fullname}
                            </Typography>

                        </div>
                        {/* <Typography color="blue-gray">Frontend Lead @ Google</Typography> */}
                        <Typography variant="h6" color="blue-gray">{dataEmployee.role_data.role_name} di SD Negeri 2 Pajerukan</Typography>
                    </div>
                </CardHeader>
                {/* <CardBody className="mb-6 p-0">
                    <Typography>
                        &quot;I found solution to all my design needs from Creative Tim. I use
                        them as a freelancer in my hobby projects for fun! And its really
                        affordable, very humble guys !!!&quot;
                    </Typography>
                </CardBody> */}
            </Card>
        )
    )
}