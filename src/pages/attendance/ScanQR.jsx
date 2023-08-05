import { useState, useEffect } from 'preact/hooks';
import { Button, Typography, Card, CardHeader, CardBody } from '@material-tailwind/react';
import { QrReader } from 'react-qr-reader';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


import { attendanceRequest } from '../../api/attendance';
import {
    calculateDistance,
    SYSTEM_ATTENDANCE_COORDINATE
} from '../../utils/functions/haversine_function';

// calculation is wrong, we should calculate between data on client's device against data on QR. 
// not QR and hardcoded data!
export function ScanQR() {

    const MySwal = withReactContent(Swal)

    const [userLocation, setUserLocation] = useState({})
    const [data, setData] = useState({})

    function handleScan(result, error) {
        if (!!result) {
            setData(JSON.parse(result?.text));
            alert("Scanned!")
        }

        if (!!error) {
            console.info(error);
        }
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        userLatitude: position.coords.latitude,
                        userLongitude: position.coords.longitude
                    })
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    async function handleSubmitAttendance() {

        let distance = calculateDistance(
            userLocation.userLatitude,
            userLocation.userLongitude,
            data.latitude,
            data.longitude
        )

        console.log("distance is = ", distance)

        const res = await attendanceRequest(
            {
                access_token: sessionStorage.getItem("access_token"),
                coordinates: {
                    latitude: data.latitude,
                    longitude: data.longitude
                },
                distance: distance
            }, sessionStorage.getItem("access_token")
        ).then(
            MySwal.fire({
                title: <strong>Absensi Sukses</strong>,
                html: <i>Absensi anda berhasil disubmit</i>,
                icon: 'success'
            })
        )

        console.log(res.data)

        // if (distance <= 100) {
        //     const res = await attendanceRequest(
        //         {
        //             access_token: sessionStorage.getItem("access_token"),
        //             coordinates: {
        //                 latitude: data.latitude,
        //                 longitude: data.longitude
        //             },
        //             distance: distance
        //         }, sessionStorage.getItem("access_token")
        //     )

        //     console.log(res.data)
        // }

        // else {
        //     alert(`Jarak Anda terlalu jauh dari titik minimal presensi!, ini jarak anda = ${distance}`)
        // }

    }

    useEffect(
        () => {
            getLocation()
        }, []
    )

    console.log("userLocation state consist = ", userLocation)
    console.log("data state consist = ", data)

    return (
        <>
            <div
                className="
                relative
                md:fixed
                mt-[4rem]
                md:ml-[18rem]
                md:max-w-[80%]
                md:min-h-[80%]
                bg-gray-100
                rounded-[.75rem]
                drop-shadow-xl 
                shadow-xl
                flex flex-col sm:flex-row
                gap-[1rem]
                px-[1rem]
                py-[2rem]
                w-[90%]
                items-center
                sm:justify-evenly
                "
            >
                <div
                    className='
                    aspect-square
                    w-[95%]
                    md:w-[40%]
                    '
                >
                    <QrReader
                        constraints={
                            { facingMode: 'environment' }
                        }
                        onResult={handleScan}
                        style={{ width: '100%' }}
                    />

                </div>

                <Card
                    className=' flex flex-col gap-4 items-center p-[1rem] md:w-[40%] md:h-[60vh] '
                >
                    <CardBody
                        className="
                        relative flex flex-col items-center gap-1
                        "
                    >
                        <CardHeader
                            variant="gradient"
                            color="blue"
                            className="hidden md:grid mb-[2rem] place-items-center px-[2rem] py-[1rem] "
                        >
                            <Typography variant="h3" color="white">
                                Scan Kode Presensi
                            </Typography>
                        </CardHeader>
                        {
                            // data ? (
                            //     <Typography> QR belum ter scan </Typography>
                            // ) : (
                            //     <Typography> QR sudah terbaca </Typography>
                            // )
                        }
                    </CardBody>

                    {/* <Button
                        buttonName="Kirim Presensi"
                        func={handleSubmitAttendance}
                    /> */}
                    <Button
                        variant='filled'
                        size='lg'
                        type='button'
                        onClick={handleSubmitAttendance}
                    >
                        Kirim Presensi
                    </Button>
                </Card>

            </div>
        </>
    )
}