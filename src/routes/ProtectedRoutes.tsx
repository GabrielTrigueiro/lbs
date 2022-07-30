import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../shared/contexts";

const {isAuthenticated} = useAuthContext()

const ProtectedRoutes = () => {
    const location = useLocation()
    return isAuthenticated ? (<Outlet/>
    ) : (
    <Navigate
        to="/"
        replace
        state={{from: location}}/>
    )
}

export default ProtectedRoutes
