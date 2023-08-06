import { getAuth, getToken } from "../utils/functions/session_handler";
import { MyNavbar } from "./MyNavbar";

const Layout = ({ children }) => {
  let authData = getAuth();
  let token = getToken();

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
      {authData && token && <MyNavbar />}
      {children}
    </div>
  );
};

export default Layout;
