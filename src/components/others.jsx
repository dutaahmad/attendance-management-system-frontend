import { useState } from 'preact/hooks';
import { Button } from "./Button";
import { getAuth } from '../utils/functions/session_handler';
import jwt_decode from "jwt-decode";

export const TestingPage = () => {

    const [accessToken, setAccessToken] = useState({})

    function handleGetAccessToken() {
        setAccessToken(
            jwt_decode(getAuth())
        )
    }

    return (
        <>
            <p className='text-[14px] text-center mx-[70%] ' >{JSON.stringify(accessToken)}</p>
            <Button buttonName="My Button" func={handleGetAccessToken} />
        </>
    )
}

export const NoAuthPage = () => {
    return (
        <>
            <h1>
                Authorization Required!
            </h1>
        </>
    )
}

export const ErrorPage = (onError) => (
    <>
        <h1>
            {onError}
        </h1>
    </>
)