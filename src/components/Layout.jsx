import { useEffect, useState } from "react";
import { getAuth, getToken } from "../utils/functions/session_handler";
import { MyNavbar } from "./MyNavbar";

const Layout = ({ children }) => {
  // let authData = getAuth();
  // let token = getToken();
  const [authData, setAuthData] = useState({});
  const [token, setToken] = useState({});

  useEffect(() => {
    const auth = getAuth();
    const token = getToken();
    setAuthData(auth);
    setToken(token);
  }, []);

  return (
    <div
      className="container
                bg-gray-300
                  flex flex-col md:flex-row
                  items-center 
                  justify-center
                  min-h-[100vh]
                  min-w-[100vw]"
    >
      {authData && token && <MyNavbar token={token} auth_data={authData} />}
      {children}
    </div>
  );
};

export default Layout;
