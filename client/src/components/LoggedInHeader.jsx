import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loading,logoutFailure,logoutSuccess } from '../redux/User/userSlice';
import { toast } from 'react-toastify';

export default function LoggedInHeader() {

    const session=useSelector(state=>state.user.session);
    const dispatch=useDispatch();

    const showSuccessMessage=(message)=>{
        toast.success(message)
    }

    const showErrorMessage=(message)=>{
        toast.error(message)
    }

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout=async(e)=>{
        e.preventDefault();
        try {
            dispatch(loading());
            const response=await fetch('/api/user/logout',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const responseData=await response.json();
            if(response.ok){
                dispatch(logoutSuccess(responseData.message));
                showSuccessMessage(responseData.message);
                return
            }
            dispatch(logoutFailure(responseData.message));
            showErrorMessage(responseData.message);
        } catch (error) {
            dispatch(logoutFailure(error.message));
            showErrorMessage(error.message);
        }
    }

    return (
        <header>
            <nav className="flex justify-between px-14 items-center py-2 bg-cyan-800 font-semibold text-white">
                <div className='text-2xl'>
                    <Link to='/' className='hover:text-cyan-950'>
                        <span>find</span>
                        <span className='text-cyan-950'>Home</span>
                    </Link>
                </div>
                <ul className='flex gap-5 items-center'>
                    <Link to='/findproperty' className='hover:bg-cyan-950 px-2 py-2 rounded-lg'>
                        <li>Find Property</li>
                    </Link>
                    <Link to='/myproperties' className='hover:bg-cyan-950 px-2 py-2 rounded-lg'>
                        <li>My Property</li>
                    </Link>
                </ul>
                <div
                    ref={dropdownRef}
                    className="relative inline-block text-left"
                    onMouseEnter={() => setIsOpen(true)}
                    onClick={()=>setIsOpen(!isOpen)}
                >
                    <button className="w-7 h-7 focus:outline-none flex items-center">
                        <img
                            src={session.userDetails.profilePicture}
                            className='w-full rounded-full object-fill'
                        />
                    </button>
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <a className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-100">{session.userDetails.username}</a>
                                <Link to='/profile'>
                                    <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</span>
                                </Link>
                                <Link to='/login' onClick={handleLogout}>
                                    <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
