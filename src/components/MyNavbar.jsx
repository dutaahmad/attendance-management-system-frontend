import { useState, useEffect } from 'preact/hooks';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { Disclosure, Transition } from '@headlessui/react'
import { useHistory, withRouter } from "react-router-dom";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Card
} from "@material-tailwind/react";
import { getToken, revokeAuth } from "../utils/functions/session_handler"
import MySidebar from './MySidebar';

export function MyNavbar() {

    let history = useHistory()

    const menu = [
        {
            name: "PRESENSI",
            navgation: () => { history.push('/presensi') }
        },
        {
            name: "PROFIL SEKOLAH",
            navgation: () => { history.push('/profil-sekolah') }
        },
        {
            name: "DAFTAR ORANG",
            navgation: () => { history.push('/daftar-orang') }
        },
        {
            name: "DAFTAR PEGAWAI",
            navgation: () => { history.push('/daftar-pegawai') }
        },
        {
            name: "DAFTAR MURID",
            navgation: () => { history.push('/daftar-murid') }
        },
        {
            name: "DAFTAR PENGGUNA",
            navgation: () => { history.push('/daftar-pengguna') }
        },
        {
            name: "PROFILE",
            navgation: () => { history.push('/profil') }
        }
    ]

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(
        () => {
            let auth = getToken()
            setIsLoggedIn(
                auth ? (true) : (false)
            )
        }
    )

    // let isLoggedIn = getToken()

    return (
        isLoggedIn &&
        (
            <>
                <Navbar
                    className='
                        fixed
                        top-0
                        rounded-t-[0rem]
                        z-[10]
                        shadow-2xl
                        drop-shadow-2xl
                        md:drop-shadow-lg
                        md:shadow-lg
                        md:hidden
                        '
                >
                    <div className='flex-col md:hidden'>
                        <Disclosure>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button
                                        className="
                                    flex 
                                    items-center
                                    w-full
                                    justify-between 
                                    rounded-lg
                                    px-4 
                                    py-2 
                                    text-left 
                                    text-sm 
                                    font-medium 
                                    mb-[1rem]
                                    text-gray-900 
                                    focus:outline-none 
                                    focus-visible:ring 
                                    focus-visible:ring-gray-500 
                                    focus-visible:ring-opacity-75
                                    "
                                    >
                                        <span className='text-[1rem] font-bold ' >MENU</span>
                                        <ChevronUpIcon
                                            className={`${open ? 'rotate-180 transform' : ''
                                                } h-[2rem] text-gray-900`}
                                        />
                                    </Disclosure.Button>
                                    <Transition
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Disclosure.Panel
                                            className="flex flex-col gap-[1rem] "
                                        >
                                            {
                                                menu.map(
                                                    (item) => (
                                                        <Button
                                                            className='flex-1'
                                                            variant='filled'
                                                            size='lg'
                                                            color='cyan'
                                                            type='button'
                                                            onClick={item.navgation}
                                                        >
                                                            {item.name}
                                                        </Button>
                                                    )
                                                )
                                            }
                                            <Button
                                                className='relative'
                                                variant='filled'
                                                size='lg'
                                                color='red'
                                                type='button'
                                                onClick={revokeAuth}
                                            >
                                                Logout
                                            </Button>
                                        </Disclosure.Panel>
                                    </Transition>
                                </>
                            )}
                        </Disclosure>
                    </div>
                    {/* <div
                    className='
                    hidden
                    lg:w-full
                    lg:px-8 
                    lg:py-4
                    lg:flex lg:flex-row lg:gap-[1rem] '
                >
                    {
                        menu.map(
                            (item) => (
                                <Button
                                    key={item}
                                    className='flex-1'
                                    size='md'
                                    type='button'
                                    color='cyan'
                                    onClick={item.navgation}
                                >
                                    {item.name}
                                </Button>
                            )
                        )
                    }
                    <Button
                        className='relative'
                        variant='filled'
                        size='md'
                        color='red'
                        type='button'
                        onClick={revokeAuth}
                    >
                        Logout
                    </Button>
                </div> */}

                </Navbar>
                {/* <MySidebar className={"hidden fixed md:flex flex-col h-screen p-3 bg-gray-50 shadow w-[15%] left-0 z-[10]"} /> */}
                <Card className="hidden fixed md:flex flex-col h-screen p-3 bg-gray-50 shadow-lg drop-shadow-lg w-[15%] left-0 z-[10]">
                    <div className="space-y-3">
                        <div className="flex flex-row items-center justify-center">
                            <h2 className="text-xl font-bold">SD Negeri Pajerukan</h2>
                        </div>
                        <div className="flex-1">
                            <ul className="pt-2 pb-4 space-y-[1rem] text-sm flex flex-col">
                                {
                                    menu.map(
                                        (item, index) => (
                                            <Button
                                                key={index}
                                                className='flex-1'
                                                size='md'
                                                type='button'
                                                color='cyan'
                                                onClick={item.navgation}
                                            >
                                                {item.name}
                                            </Button>
                                        )
                                    )
                                }
                                <Button
                                    className='relative'
                                    variant='filled'
                                    size='lg'
                                    color='red'
                                    type='button'
                                    onClick={revokeAuth}
                                >
                                    Logout
                                </Button>
                            </ul>
                        </div>
                    </div>
                </Card>
            </>
        )
    )
}
