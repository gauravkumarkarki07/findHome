import SubmitButton from "../components/submitButton.jsx";
import ButtonTypeButton from "../components/buttonTypeButton.jsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { firebaseApp } from "../firebase.js";
import {getDownloadURL, getStorage,ref, uploadBytes} from 'firebase/storage';
import { useSelector } from "react-redux";

export default function AddProperty() {

    const session=useSelector(state=>state.user.session);


    const showSuccessMessage=(message)=>{
        toast.success(message)
    }

    const showErrorMessage=(message)=>{
        toast.error(message)
    }

  const initialState = {
    title: '',
    description: '',
    propertyImage: '',
    pricePerWeek: '',
    bedroom: '',
    bathroom: '',
    propertyType: 'apartment',
    address: '',
  };

  const [formData, setFormData] = useState(initialState);

  const[image,setImage]=useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadFileToFireBase=async()=>{
    if(!image){
        showErrorMessage("Please an upload image")
        return;
    }
    try {
        const storage=getStorage(firebaseApp);
        const fileName=new Date().getTime()+ image.name;
        const storageUrl=ref(storage,`${session.userDetails._id}/property/${fileName}`)
        uploadBytes(storageUrl,image).then((snapshot)=>{
            getDownloadURL(snapshot.ref)
                .then((url)=>{
                    setFormData({...formData,propertyImage:url})
                    showSuccessMessage("Image Saved Successfully")
                })
                .catch((error)=>{
                    showErrorMessage(error.message)
                })
        }).catch((error)=>{
            showErrorMessage(error.message)
        })
        
    } catch (error) {
        showErrorMessage(error.message);
    }
}

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Form submitted successfully!');
    setFormData(initialState); // Reset form after submission
  };

  return (
    <div className="flex flex-col gap-8 items-center py-4">
      <h1 className="font-semibold text-3xl">Add Property Details</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label>Title</label>
          <input
            type="text"
            placeholder="title"
            className="h-10 rounded-lg bg-gray-100 px-2 py-1"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Description</label>
          <textarea
            placeholder="write a short description about the property"
            className="h-20 rounded-lg bg-gray-100 px-2 py-1"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex gap-14 items-end">
            <div className="flex flex-col gap-2">
                <label>Property Image</label>
                <input
                    type="file"
                    className="h-10 rounded-lg bg-gray-100 px-2 py-1"
                    name="propertyImage"
                    multiple
                    onChange={handleFileChange}
                    required
                />
            </div>
            <div>
                <ButtonTypeButton title='Confirm Image' action={uploadFileToFireBase}/>
            </div>
        </div>
        <div className="flex gap-14">
          <div className="flex flex-col gap-2">
            <label>Price (per week)</label>
            <input
              type="number"
              placeholder="price per week"
              className="h-10 rounded-lg bg-gray-100 px-2 py-1"
              name="pricePerWeek"
              value={formData.pricePerWeek}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Bedroom</label>
            <input
              type="number"
              placeholder="bedroom"
              className="h-10 rounded-lg bg-gray-100 px-2 py-1"
              name="bedroom"
              value={formData.bedroom}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Bathroom</label>
            <input
              type="number"
              placeholder="bathroom"
              className="h-10 rounded-lg bg-gray-100 px-2 py-1"
              name="bathroom"
              value={formData.bathroom}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Property Type</label>
            <select
              className="h-10 rounded-lg bg-gray-100 px-2 py-1"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleInputChange}
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label>Address</label>
          <input
            type="text"
            placeholder="address"
            className="h-10 rounded-lg bg-gray-100 px-2 py-1"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <SubmitButton title="Save"/>
      </form>
    </div>
  );
}
