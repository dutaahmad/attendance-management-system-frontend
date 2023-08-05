import jwt_decode from "jwt-decode";

export function saveAuth(token) {
    sessionStorage.setItem("user_auth", JSON.stringify(jwt_decode(token)))
}

export function getAuth() {
    return JSON.parse(sessionStorage.getItem("user_auth"))
}

export function getToken() {
    return (sessionStorage.getItem("access_token"))
}

export function revokeAuth() {
    sessionStorage.removeItem("user_auth")
    sessionStorage.removeItem("access_token")
    window.location.href = '/login'
}

export function hasJWT() {
    let flag = false;

    //check user has JWT token
    sessionStorage.getItem("user_auth") ? flag=true : flag=false
   
    return flag
}

export let activeToken = () => (
    (sessionStorage.getItem("user_auth")) ?
    (sessionStorage.getItem("user_auth")):(render(<NoAuthPage />, document.getElementById('app')))
)