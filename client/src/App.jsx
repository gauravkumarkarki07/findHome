import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoggedInHeader from "./components/LoggedInHeader";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import PrivateRoute from "./pages/PrivateRoute";

export default function App() {

  const session=useSelector(state=>state.user.session);

  return (
    <BrowserRouter>
    <ToastContainer
      pauseOnHover={false}
    />
    {session ? <LoggedInHeader/> : <Header/>}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}
