import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import {GoogleAuthProvider, signInWithPopup,getAuth} from "firebase/auth"
import { firebaseApp } from "../firebase";
import { loading,loginSuccess,loginFailure } from "../redux/User/userSlice";
import { toast } from "react-toastify";


export default function OAuth() {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const showSuccessMessage=(message)=>{
    toast.success(message)
  }

  const showErrorMessage=(message)=>{
      toast.error(message)
  }


  const auth=getAuth(firebaseApp);

  const handleGoogleClick=async()=>{
    dispatch(loading());
    const provider= new GoogleAuthProvider()
    provider.setCustomParameters({prompt:'select_account'})
    try {
      const resultFromGoogle=await signInWithPopup(auth,provider);
      const response=await fetch('/api/auth/googlelogin',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email:resultFromGoogle.user.email,
          username:resultFromGoogle.user.displayName,
          profilePicture:resultFromGoogle.user.photoURL
        })
      })
      const responseData=await response.json();
      if(response.ok){
        dispatch(loginSuccess(responseData));
        showSuccessMessage(responseData.message)
        navigate('/')
        return;
      }
      dispatch(loginFailure(responseData));
      showErrorMessage(responseData.message);

    } catch (error) {
      dispatch(loginFailure(error));
      showErrorMessage(error.message);
    }
  }

  return (
    <button
        type="button"
        className="rounded-full px-4 py-2 bg-orange-500 text-white w-full hover:bg-orange-600 flex justify-center gap-4 items-center"
        onClick={handleGoogleClick}
   >
        <FcGoogle/>
        <span>
            Continue with Google
        </span>
    </button>
  )
}
