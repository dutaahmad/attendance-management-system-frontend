import { useState } from 'preact/hooks';
import { Routes } from "./routes";
import { MyNavbar } from './components/MyNavbar';
import { getAuth, getToken } from "./utils/functions/session_handler"

export function App() {

  // const [token, setToken] = useState('')
  // const [auth, setAuth] = useState('')
  console.log("App Rendered!")

  return (
    <div
      className='
    container 
    bg-gray-300
    flex flex-col md:flex-row
    items-center 
    justify-center
    min-h-[100vh]
    min-w-[100vw]
    '
    >
      <Routes />
    </div>
  )
}
