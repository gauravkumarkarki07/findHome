import OAuth from "../components/OAuth"
import SubmitTypeButton from "../components/submitButton"
import {Link} from 'react-router-dom';
import { useState } from "react";
import { toast } from "react-toastify";
import {useDispatch} from 'react-redux';
import {loading,logoutSuccess,logoutFailure} from '../redux/User/userSlice.js';
import { useNavigate } from "react-router-dom";

export default function SignUp() {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const showSuccessMessage=(message)=>{
      toast.success(message)
  }

  const showErrorMessage=(message)=>{
      toast.error(message)
  }

  const initialFormData={
    username:'',
    password:'',
    email:'',
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
        const response=await fetch('/api/auth/signup',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        })
        const responseData=await response.json();
        if(response.ok){
            dispatch(logoutSuccess(responseData));
            showSuccessMessage(responseData.message);
            navigate('/login');
            setFormData(initialFormData);
            return;
        }
        dispatch(logoutFailure(responseData.message));
        showErrorMessage(responseData.message);
        setFormData(initialFormData);
    } catch (error) {
        dispatch(logoutFailure(error.message));
        showErrorMessage(error.message);
        setFormData(initialFormData);
    }
}

  return (
    <div className="flex flex-col gap-3 items-center py-16 w-full">
        <h1 className="font-semibold text-3xl">Create Your Account</h1>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 w-96 items-center pt-5">
            <div className="flex flex-col gap-3 w-full">
                <label>Username</label>
                <input
                    type="text"
                    placeholder="username"
                    name="username"
                    className="h-10 rounded-lg bg-gray-100 px-2 py-1"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="flex flex-col gap-3 w-full">
                <label>Email</label>
                <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="h-10 rounded-lg bg-gray-100 px-2 py-1"
                    value={formData.email}
                    onChange={handleInputChange}
                    required

                />
            </div>
            <div className="flex flex-col gap-3 w-full">
                <label>Password</label>
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="h-10 rounded-lg bg-gray-100 px-2 py-1"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    
                />
            </div>
            <SubmitTypeButton title='SignUp'/>
            <OAuth/>
        </form>
        <div className="flex gap-2">
            <span>Have an account?</span>
            <Link to='/login'>
                <span className="text-primarySecond hover:underline">Login</span>
            </Link>
        </div>
    </div>
  )
}
