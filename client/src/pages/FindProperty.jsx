import PropertyCard from '../components/PropertyCard.jsx'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

export default function FindProperty() {

  const session=useSelector(state=>state.user.session)

  const showSuccessMessage=(message)=>{
    toast.success(message)
  }

  const showErrorMessage=(message)=>{
      toast.error(message)
  }

  const[properties,setProperties]=useState([]);

  useEffect(()=>{
    fetchProperties();
  },[])

  const fetchProperties=async()=>{
    try {
      const response=await fetch(`/api/user/getallproperties/${session.userDetails._id}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
      })
      const responseData=await response.json();
      if(response.ok){
        showSuccessMessage('Properties Loaded Successfully')
        setProperties(responseData.properties);
        console.log(responseData.properties)
        return
      }
      showErrorMessage(responseData.message)
    } catch (error) {
      showErrorMessage(error.message);
    }
  }

  return (
    <div className='flex flex-col items-center py-5'>
        <div className='flex flex-col gap-4 items-center w-full justify-center'>
            <h1 className='text-3xl font-semibold pb-8'>Listed Properties For Rent</h1>
            <div className='grid grid-cols-3 gap-5 justify-center'>
              {properties.map(property => (
                <div key={property._id}>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
        </div>
    </div>
  )
}
