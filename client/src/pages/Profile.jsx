import SubmitButton from "../components/submitButton"
import { useSelector } from "react-redux"
import { useState } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import { firebaseApp } from "../firebase.js";
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
import { useDispatch } from "react-redux";
import { loading,updateProfileFailure,updateProfileSuccess } from "../redux/User/userSlice.js";



export default function Profile() {

    const dispatch=useDispatch();

    const showSuccessMessage=(message)=>{
        toast.success(message)
    }

    const showErrorMessage=(message)=>{
        toast.error(message)
    }

    const session=useSelector(state=>state.user.session);

    const fileInputRef=useRef(null);

    const initialFormData={
        userId:session.userDetails._id,
        firstname:session.userDetails.firstname,
        lastname:session.userDetails.lastname,
        profilePicture:session.userDetails.profilePicture,
        address:session.userDetails.address,
        phonenumber:session.userDetails.phonenumber,
        email:session.userDetails.email,
    }

    const[formData,setFormData]=useState(initialFormData);

    const[image,setImage]=useState(null);

    const handleImageChange=(e)=>{
        setImage(e.target.files[0]);
    }

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const uploadFileToFireBase=async(e)=>{
        e.preventDefault();
        dispatch(loading());
        try {
            const storage=getStorage(firebaseApp);
            const fileName=image.name;
            const storageUrl=ref(storage,`${session.userDetails._id}/profile/${fileName}`)
            const uploadTask=uploadBytesResumable(storageUrl,image);
            uploadTask.on(
                'state_changed',
                (snapshot)=>{
                    const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    console.log(progress.toFixed(0));
                },
                (error)=>{
                    showErrorMessage(error.message);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                        setFormData({...formData,profilePicture:downloadUrl});
                        handleFormSubmit();
                    })
                }
            )
        } catch (error) {
            showErrorMessage(error.message);
        }
    }
     
    const handleFormSubmit=async()=>{
        console.log(formData);
        try {
            const response=await fetch('/api/user/updateprofile',{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(FormData)
            })
            const responseData=await response.json();
            if(response.ok){
                dispatch(updateProfileSuccess(responseData));
                showSuccessMessage(responseData.message);
                return;
            }
            dispatch(updateProfileFailure(responseData));
            showErrorMessage(responseData.message);
        } catch (error) {
            showErrorMessage(error.message)
            
        }
    }
    

  return (
    <div className="flex flex-col gap-8 items-center py-4">
        <h1 className="font-semibold text-3xl">Profile Details</h1>
        <div className="flex gap-5 justify-around">
            <img
                src={image ? URL.createObjectURL(image) : session.userDetails.profilePicture}
                className="rounded-full w-28 h-28"
            />
            <div className="flex items-center">
                <button 
                    className="rounded-lg px-8 py-2 text-white bg-cyan-800 hover:bg-cyan-950"
                    onClick={handleButtonClick}
                    >
                    Change Picture
                </button>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="absolute inset-0 opacity-0 cursor-pointer invisible"
                />
            </div>
        </div>
        <form onSubmit={uploadFileToFireBase} className="flex flex-col gap-8">
            <div className="flex gap-14">
                <div className="flex flex-col gap-2">
                    <label>First Name</label>
                    <input
                        type="text"
                        placeholder="firstname"
                        className="h-10 rounded-lg bg-gray-100 px-2 py-1"
                        name="firstname"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Last Name</label>
                    <input
                        type="text"
                        placeholder="lastname"
                        className="h-10 rounded-lg bg-gray-100 px-2 py-1"
                        name="lastname"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="email"
                        className="h-10 rounded-lg bg-gray-100 px-2 py-1"
                        name="email"
                    />
            </div>
            <div className="flex flex-col gap-2">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        placeholder="phonenumber"
                        className="h-10 rounded-lg bg-gray-100 px-2 py-1"
                        name="phonenumber"
                    />
            </div>
            <div className="flex flex-col gap-2">
                    <label>Address</label>
                    <input
                        type="text"
                        placeholder="address"
                        className="h-10 rounded-lg bg-gray-100 px-2 py-1"
                        name="address"
                    />
            </div>
            <SubmitButton title='Save'/>
        </form>
    </div>
  )
}
