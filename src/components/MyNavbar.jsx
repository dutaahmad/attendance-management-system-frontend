import { useState, useEffect } from "preact/hooks";
import { ChevronRightIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { Disclosure, Transition } from "@headlessui/react";
import { useHistory } from "react-router-dom";
import { Navbar, Button, Card } from "@material-tailwind/react";
import { getToken, revokeAuth } from "../utils/functions/session_handler";

export function MyNavbar({ token, auth_data }) {
  const history = useHistory();

  const fullAdminMenu = [
    {
      name: "PRESENSI",
      navigation: () => {
        history.push("/presensi");
      },
    },
    {
      name: "PROFIL SEKOLAH",
      navigation: () => {
        history.push("/profil-sekolah");
      },
    },
    {
      name: "DAFTAR ORANG",
      navigation: () => {
        history.push("/daftar-orang");
      },
    },
    {
      name: "DAFTAR PEGAWAI",
      navigation: () => {
        history.push("/daftar-pegawai");
      },
    },
    {
      name: "DAFTAR MURID",
      navigation: () => {
        history.push("/daftar-murid");
      },
    },
    {
      name: "DAFTAR PENGGUNA",
      navigation: () => {
        history.push("/daftar-pengguna");
      },
    },
    {
      name: "PROFILE",
      navigation: () => {
        history.push("/profil");
      },
    },
  ];

  const plainEmployeeMenu = [
    {
      name: "PROFIL SEKOLAH",
      navigation: () => {
        history.push("/profil-sekolah");
      },
    },
    {
      name: "DAFTAR ORANG",
      navigation: () => {
        history.push("/daftar-orang");
      },
    },
    {
      name: "DAFTAR PEGAWAI",
      navigation: () => {
        history.push("/daftar-pegawai");
      },
    },
    {
      name: "DAFTAR MURID",
      navigation: () => {
        history.push("/daftar-murid");
      },
    },
    {
      name: "PROFILE",
      navigation: () => {
        history.push("/profil");
      },
    },
  ];

  const studentMenu = [
    {
      name: "PROFIL SEKOLAH",
      navigation: () => {
        history.push("/profil-sekolah");
      },
    },
    {
      name: "DAFTAR PEGAWAI",
      navigation: () => {
        history.push("/daftar-pegawai");
      },
    },
    {
      name: "DAFTAR MURID",
      navigation: () => {
        history.push("/daftar-murid");
      },
    },
    {
      name: "PROFILE",
      navigation: () => {
        history.push("/profil");
      },
    },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let auth = getToken();
    setIsLoggedIn(auth ? true : false);
  }, []);

  // let isLoggedIn = getToken()

  return (
    isLoggedIn && (
      <>
        <Navbar
          className="
                        fixed
                        top-0
                        rounded-t-[0rem]
                        z-[10]
                        shadow-2xl
                        drop-shadow-2xl
                        md:drop-shadow-lg
                        md:shadow-lg
                        md:hidden
                        "
        >
          <div className="flex-col md:hidden">
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
                    <span className="text-[1rem] font-bold ">MENU</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
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
                    <Disclosure.Panel className="flex flex-col gap-[1rem] ">
                      {fullAdminMenu.map((item) => (
                        <Button
                          className="flex-1"
                          variant="filled"
                          size="lg"
                          color="cyan"
                          type="button"
                          onClick={item.navigation}
                        >
                          {item.name}
                        </Button>
                      ))}
                      <Button
                        className="relative"
                        variant="filled"
                        size="lg"
                        color="red"
                        type="button"
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
        </Navbar>
        {/* <MySidebar className={"hidden fixed md:flex flex-col h-screen p-3 bg-gray-50 shadow w-[15%] left-0 z-[10]"} /> */}
        <Card className="hidden fixed md:flex flex-col h-screen p-3 bg-gray-50 shadow-lg drop-shadow-lg w-[15%] left-0 z-[10] rounded-none ">
          <div className="space-y-3">
            <div className="flex flex-row items-center justify-center">
              <h2 className="text-lg font-bold">SD Negeri 2 Pajerukan</h2>
              {/* <Button size="sm" className="bg-gray-100 rounded-full">
                <ChevronRightIcon
                  className="h-[2rem] text-gray-800"
                />
              </Button> */}
            </div>
            <div className="flex-1">
              <ul className="pt-2 pb-4 space-y-[1rem] text-sm flex flex-col">
                {auth_data.is_employee &&
                auth_data.role_data.role_name === "admin"
                  ? fullAdminMenu.map((item, index) => (
                      <Button
                        key={index}
                        className="flex-1"
                        size="md"
                        type="button"
                        color="cyan"
                        onClick={() => item.navigation()}
                      >
                        {item.name}
                      </Button>
                    ))
                  : auth_data.role_data.role_name === "Murid"
                  ? studentMenu.map((item, index) => (
                      <Button
                        key={index}
                        className="flex-1"
                        size="md"
                        type="button"
                        color="cyan"
                        onClick={() => item.navigation()}
                      >
                        {item.name}
                      </Button>
                    ))
                  : plainEmployeeMenu.map((item, index) => (
                      <Button
                        key={index}
                        className="flex-1"
                        size="md"
                        type="button"
                        color="cyan"
                        onClick={() => item.navigation()}
                      >
                        {item.name}
                      </Button>
                    ))}
                <Button
                  className="relative"
                  variant="filled"
                  size="lg"
                  color="red"
                  type="button"
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
  );
}
