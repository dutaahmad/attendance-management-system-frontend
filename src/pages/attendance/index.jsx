import { useHistory } from "react-router-dom";
import { Button } from '@material-tailwind/react';

export function Attendance() {

  let history = useHistory()

  const navigation = {
    toGenerate: () => { history.push('/generate-attendance-qrcode') },
    toScan: () => { history.push('/scan-attendance-qrcode') },

  }

  console.log("backend host = ", import.meta.env.VITE_API_URL)

  return (
    <>
      <div
        className={`
        flex flex-col gap-[2rem] w-[80%]
        md:w-[70%] md:grid md:grid-cols-2 md:ml-[20rem]
        `}
      >
        <Button type='button' variant='gradient' size='lg' onClick={navigation.toGenerate}>Buat QR Presensi</Button>
        <Button type='button' variant='gradient' size='lg' onClick={navigation.toScan}>Scan Presensi</Button>
      </div>
    </>
  )
}