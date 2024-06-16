import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute() {
    const {isAuthenticated, isLoading} = useAuth0()

    if(isLoading){
      return null;
    }

    if(isAuthenticated){
      return <Outlet />
    }
  return (
    <Navigate to= "/" replace />
  )
}


// const {isAuthenticated} = useAuth0()
// return (
//   isAuthenticated? (<Outlet />) : (<Navigate to= "/" replace />)
// )
// this intially will get us back to the homePage whenever we are refreshing 
// it initially makes isAuthenticated wrong which will always return us to
// the home page 