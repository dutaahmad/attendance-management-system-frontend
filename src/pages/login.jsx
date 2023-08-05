import { useState } from 'preact/hooks';
import { loginRequest } from '../api/authentication';
import { saveAuth, getAuth } from '../utils/functions/session_handler';
import {
    Button,
    Input,
    Card,
    CardHeader,
    CardBody,
    Typography
} from '@material-tailwind/react';
import { useHistory } from 'react-router-dom';

export function Login() {

    const history = useHistory()

    const [loginData, setLoginData] = useState({ username: '', password: '' })
    const [loading, setLoading] = useState(true);

    const inputHandler = (e) => {
        setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const res = await loginRequest(loginData)
        sessionStorage.setItem("access_token", res.data.access_token)
        saveAuth(res.data.access_token)
        // console.log(getAuth())
        setLoading(false)
        window.location.href = '/presensi'

    }

    return (
        <>
            <div
                className="
                container p-[1rem] 
                flex flex-col justify-center items-center
                md:flex md:flex-row md:gap-[2rem] md:items-start md:justify-center
                "
            >
                <Card
                    className='
                    hidden
                    md:flex flex-col
                    '
                >
                    <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-4 grid place-items-center px-[2rem] py-[1rem] "
                    >
                        <Typography variant="h1" color="white">
                            Sistem Manajemen Absensi
                        </Typography>
                    </CardHeader>
                    <CardBody>
                        <Typography variant="h3" color="gray">
                            SD Negeri Pajerukan
                        </Typography>
                    </CardBody>
                </Card>
                <Card
                    className='
                    w-[80%] 
                    px-[1rem] 
                    shadow-2xl
                    gap-[1rem]
                    md:w-[50%]
                    '
                >
                    <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            Masuk
                        </Typography>
                    </CardHeader>
                    <CardBody className="">
                        <form
                            className="flex flex-col items-center gap-[1.5rem]"
                            onSubmit={handleSubmit}
                        >
                            <Input
                                label='Username'
                                type='text'
                                name='username'
                                value={loginData.username}
                                onChange={inputHandler}
                                required
                            />

                            <Input
                                label='Password'
                                type='password'
                                name='password'
                                value={loginData.password}
                                onChange={inputHandler}
                                required
                            />

                            <Button
                                variant='gradient'
                                type='submit'
                                fullWidth
                            >
                                Login
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}