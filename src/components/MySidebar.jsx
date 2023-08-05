import { useState, useEffect } from 'preact/hooks';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Disclosure, Transition } from '@headlessui/react'
import { useHistory, withRouter } from "react-router-dom";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Card,
} from "@material-tailwind/react";

export default function ({ className }) {
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
        }
    ]

    return (
        <Card className={className}>
            <div className="space-y-3">
                <div className="flex items-center justify-center">
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
                    </ul>
                </div>
            </div>
        </Card>
    )
}