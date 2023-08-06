import { useState } from "preact/hooks";
import { Routes } from "./routes";
import { MyNavbar } from "./components/MyNavbar";
import { getAuth, getToken } from "./utils/functions/session_handler";

export function App() {
  // const [token, setToken] = useState('')
  // const [auth, setAuth] = useState('')
  console.log("App Rendered!");

  return <Routes />;
}
