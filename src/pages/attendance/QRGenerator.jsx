import { useState, useRef, useEffect } from 'preact/hooks'
import QRCode from 'react-qr-code';
import { useReactToPrint } from 'react-to-print';

import { Modal } from '../../components/Modal';

import {
    SYSTEM_ATTENDANCE_COORDINATE as ATTENDANCE_COORDINATE,
    calculateDistance
} from "../../utils/functions/haversine_function"
import { Button, Input } from '@material-tailwind/react';


const GEO_DATA_STYLE = `
flex flex-col
justify-center
gap-[0.2rem]
items-center
w-[80%]
p-[1rem]
rounded-xl
bg-slate-200
shadow-xl
dropshadow-xl
`


export function QRGenerator() {

    const [attendLocation, setAttendLocation] = useState(
        {
            latitude: ATTENDANCE_COORDINATE.latitude,
            longitude: ATTENDANCE_COORDINATE.longitude
        }
    )

    const [userLocation, setUserLocation] = useState('')

    const [qrData, setQRData] = useState(
        JSON.stringify(
            {
                latitude: ATTENDANCE_COORDINATE.latitude,
                longitude: ATTENDANCE_COORDINATE.longitude
            }
        )
    )
    let [isOpen, setIsOpen] = useState(false)

    const componentRef = useRef()

    const attendLocationHandler = (e) => {
        setAttendLocation(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    function handleSetQRData() {
        setQRData(JSON.stringify(attendLocation))
    }

    function handleSetQRDataWithCurrentLocation() {
        setQRData(userLocation)
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handlePrintQRWithCurrentLocation = useReactToPrint({
        content: () => componentRef.current,
    });

    function handleSubmit(event) {
        event.preventDefault()
        console.log(attendLocation)
        setIsOpen(true)
    }

    function handleSetQRWithCurrentLocation(event) {
        event.preventDefault()
        console.log("userLocation = ", userLocation)
        setIsOpen(true)
    }

    async function printQRHandler() {
        handleSetQRData()
        handlePrint()
    }

    async function printQRWithCurrentLocationHandler() {
        handleSetQRDataWithCurrentLocation()
        handlePrintQRWithCurrentLocation()
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation(
                        JSON.stringify(
                            {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            }
                        )
                    )
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    useEffect(
        () => {
            getLocation()
        }, []
    )

    console.log("userLocation = ", userLocation)

    return (
        <>
            <div
                className='
                flex flex-col
                items-center
                justify-center
                h-[70%]
                w-[40%]
                gap-[2rem]
                '
            >
                <form
                    className='
                    flex flex-col
                    items-center
                    justify-center
                    w-full
                    gap-[2rem]
                    '
                    onSubmit={handleSubmit}
                >
                    <label
                        className="
                            text-slate-800 
                            font-medium
                            sm:text-[1.4rem]
                            w-full
                            "
                        for="latitude"
                    >
                        Latituda
                    </label>

                    <Input
                        className='
                        py-[1.5rem]
                        '
                        label='Latitude'
                        type='text'
                        name='latitude'
                        value={attendLocation.latitude}
                        onChange={attendLocationHandler}
                        required
                    />
                    <label
                        className="
                            text-slate-800 
                            font-medium
                            sm:text-[1.4rem]
                            w-full
                            "
                        label="longitude"
                    >
                        Longituda
                    </label>

                    <Input
                        className='
                        py-[1.5rem]
                        '
                        label='Longitude'
                        type='text'
                        name='longitude'
                        value={attendLocation.longitude}
                        onChange={attendLocationHandler}
                        required
                    />
                    <Button
                        type='submit' variant='gradient' size='lg'
                    >
                        Buat QR Presensi
                    </Button>
                </form>
                <Button
                    type='button' variant='gradient' size='lg' onClick={handleSetQRWithCurrentLocation}
                >
                    Buat QR Presensi Berdasarkan Lokasi Admin
                </Button>
                {/* create QR Code via form data */}
                <Modal
                    isOpen={isOpen}
                    modalTitle='Pembuatan QR Code Presensi'
                    modalDialog={
                        <>
                            <QRCode
                                value={qrData}
                                ref={componentRef}
                            />
                        </>
                    }
                    confirmButtonName="Buat dan Print!"
                    confirmFunc={printQRHandler}
                    cancelButtonName="Tutup atau batal"
                    cancelFunc={() => { setIsOpen(false) }}
                    onClose={() => { setIsOpen(false) }}
                />
                {/* Create QR via current device location */}
                <Modal
                    isOpen={isOpen}
                    modalTitle='Pembuatan QR Code Presensi'
                    modalDialog={
                        <>
                            <QRCode
                                value={userLocation}
                                ref={componentRef}
                            />
                        </>
                    }
                    confirmButtonName="Buat dan Print!"
                    confirmFunc={printQRWithCurrentLocationHandler}
                    cancelButtonName="Tutup atau batal"
                    cancelFunc={() => { setIsOpen(false) }}
                    onClose={() => { setIsOpen(false) }}
                />
            </div>
        </>
    )
}