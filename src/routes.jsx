import { Redirect, Switch, Route, Router } from "react-router-dom";
import { history } from "./utils/helpers/history";

import { RouteGuard } from "./components/route_guard";

import { Login } from "./pages/login";
import { Attendance } from "./pages/attendance";
import { PeopleList } from "./pages/people";
import { AddPeople } from "./pages/people/AddPeople";
import { QRGenerator } from "./pages/attendance/QRGenerator";
import { ScanQR } from "./pages/attendance/ScanQR";
import { SchoolProfile } from "./pages/SchoolProfile";
import { EmployeeList } from "./pages/employee";
import { AddEmployee } from "./pages/employee/AddEmployee";
import { StudentsList } from "./pages/student";
import { EditPeople } from "./pages/people/EditPeople";
import { EditEmployee } from "./pages/employee/EditEmployee";
import { MyProfile } from "./pages/profile";
import { Users } from "./pages/users";
import { AddUser } from "./pages/users/AddUser";
import Layout from "./components/Layout";

export const Routes = () => {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <RouteGuard exact path="/profil" component={MyProfile} />
          <RouteGuard exact path="/profil-sekolah" component={SchoolProfile} />
          <RouteGuard exact path="/presensi" component={Attendance} />
          <RouteGuard exact path="/daftar-orang" component={PeopleList} />
          <RouteGuard exact path="/tambah-orang" component={AddPeople} />
          <RouteGuard
            exact
            path="/detail-orang/:people_id"
            component={EditPeople}
          />
          <RouteGuard exact path="/daftar-pegawai" component={EmployeeList} />
          <RouteGuard exact path="/tambah-pegawai" component={AddEmployee} />
          <RouteGuard
            exact
            path="/detail-pegawai/:employee_id"
            component={EditEmployee}
          />
          <RouteGuard exact path="/daftar-murid" component={StudentsList} />
          <RouteGuard exact path="/daftar-pengguna" component={Users} />
          <RouteGuard exact path="/tambah-pengguna" component={AddUser} />
          <RouteGuard
            exact
            path="/generate-attendance-qrcode"
            component={QRGenerator}
          />
          <RouteGuard exact path="/scan-attendance-qrcode" component={ScanQR} />
          <Route path="/login" component={Login} />
          <Redirect from="/" to="presensi" />
        </Switch>
      </Layout>
    </Router>
  );
};
