import { Navigate, Outlet } from "react-router"
import { useEffect, useState } from "react";

const PrivateRoutes = () => {


  const [auth, setAuth] = useState(true);

  useEffect(() => {
    let token = localStorage.getItem("Acess_Token")
    if(!token){
      setAuth(false)
    }
  }, [auth])

  return (
    auth ? <Outlet /> : <Navigate to="/login" />
  )
}

export default PrivateRoutes;