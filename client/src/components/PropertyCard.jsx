import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa6";
import { useState } from "react";

export default function PropertyCard({ property }) {
  const { _id,title, propertyImage, pricePerWeek, bedroom, bathroom, propertyType, address } = property;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative border rounded p-4 text-sm text-gray-500 flex flex-col gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="hidden" id={_id}>PropertyId</span>
      <div className={`flex flex-col gap-2 h-[330px] w-[300px] ${isHovered?'filter blur-sm':''}`}>
        <img src={propertyImage} alt={title} className="w-full h-52 object-fill mb-4" />
        <h2 className="text-md font-semibold">{address}</h2>
        <div className="mt-2 flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <p className="flex gap-1 items-center"><FaShower />{bathroom}</p>
            <p className="flex gap-1 items-center"><IoBedOutline />{bedroom}</p>
            <p className="flex gap-1 items-center">| {propertyType}</p>
          </div>
        </div>
        <span className="bg-gray-200 text-cyan-950 rounded-md px-1 py-1">Price Per Week ${pricePerWeek}</span>
      </div>
      {isHovered && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="flex flex-col gap-2 w-60">
              <button
                type="button"
                className="rounded-full px-4 py-2 bg-cyan-800 text-white w-full hover:bg-cyan-950"
              
              >
                Edit
              </button>
              <button
                type="button"
                className="rounded-full px-4 py-2 bg-red-600 text-white w-full hover:bg-red-800"
              
              >
                Delete
              </button>
          </div>
        </div>
      )}
    </div>
  );
}
