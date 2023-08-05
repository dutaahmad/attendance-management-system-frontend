import { Route, Redirect } from 'react-router-dom';
import { hasJWT, getAuth, getToken } from '../utils/functions/session_handler';

export function RouteGuard({ component: Component, ...rest }) {

    //functions
    let authData = getAuth()
    let token = getToken()
    let isJWT = hasJWT()

    return (
        <>
            <Route {...rest}
                render={props => (
                    (isJWT && token && authData) ?
                        <Component {...props} />
                        :
                        <Redirect to={{ pathname: '/login' }} />
                )}
            />
        </>
    )
}