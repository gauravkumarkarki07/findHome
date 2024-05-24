import OAuth from "../components/OAuth"
import SubmitTypeButton from "../components/submitButton"
import {Link} from 'react-router-dom';
import { useState } from "react";
import { toast } from "react-toastify";
import {useDispatch} from 'react-redux';
import {loading,loginSuccess,loginFailure} from '../redux/User/userSlice.js';
import { useNavigate } from "react-router-dom";


export default function Login() {

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const showSuccessMessage=(message)=>{
        toast.success(message)
    }

    const showErrorMessage=(message)=>{
        toast.error(message)
    }

    const initialFormData={
        usernameOrEmail:'',
        password:'',
    }

    const[formData,setFormData]=useState(initialFormData);

    const handleInputChange=(e)=>{
        const{name,value}=e.target;
        setFormData({...formData,[name]:value});
    }

    const handleFormSubmit=async(e)=>{
        e.preventDefault();
        try {
            dispatch(loading());
            const response=await fetch('/api/auth/login',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            })
            const responseData=await response.json();
            if(response.ok){
                dispatch(loginSuccess(responseData));
                showSuccessMessage(responseData.message);
                setFormData(initialFormData);
                navigate('/');
                return;
            }
            dispatch(loginFailure(responseData.message));
            showErrorMessage(responseData.message);
            setFormData(initialFormData);
        } catch (error) {
            dispatch(loginFailure(error.message));
            showErrorMessage(error.message);
            setFormData(initialFormData);
        }
    }

  return (
    <div className="flex flex-col gap-3 items-center py-16 w-full">
        <h1 className="font-semibold text-3xl">Login With Your Account</h1>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 w-96 items-center pt-5">
            <div className="flex flex-col gap-3 w-full">
                <label>Username or Email</label>
                <input
                    type="text"
                    placeholder="username or email"
                    className="h-10 rounded-lg bg-gray-100 px-2 py-1"
                    name="usernameOrEmail"
                    value={formData.usernameOrEmail}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="flex flex-col gap-3 w-full">
                <label>Password</label>
                <input
                    type="password"
                    placeholder="password"
                    className="h-10 rounded-lg bg-gray-100 px-2 py-1"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <SubmitTypeButton title='Login'/>
            <OAuth/>
        </form>
        <div className="flex gap-2">
            <span>Create an account?</span>
            <Link to='/signup'>
                <span className="text-primarySecond hover:underline">SignUp</span>
            </Link>
        </div>
    </div>
  )
}
