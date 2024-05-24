import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
export default function PrivateRoute() {
    const session=useSelector(state=>state.user.session)
  return (
    session ? <Outlet/> : <Navigate to='/login'/>
  )
}
