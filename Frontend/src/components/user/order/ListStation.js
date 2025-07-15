import { useState } from "react";
import SimpleMap from "../../map/Simple";
import PreviewModal from "../../modal/PreviewModal";
import { getDistance } from "geolib";
import { Navigate, useNavigate } from "react-router-dom";

function ListStation({ station }) {
  const { location, name, quantity,distance } = station;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="shadow-lg gap-3  rounded m-8 p-8 flex bg-gray-800">
      <div className="w-full lg: md:2/3 flex flex-col gap-3 ">
        <h3 className="text-orange text-xl font-semibold text-white">{name}</h3>

        <p className="text-grey-dark font-thin text-sm leading-normal text-white">
        Standard Charging Rate: {quantity.petrol.price} kWh  
          <br />
        Available Energy: {quantity.petrol.quantity} kWh 
        </p>
        <p className="text-grey-dark font-thin text-sm leading-normal text-white">
    
        Fast Charging Rate: {quantity.diesel.price} kWh
          <br />
         Available Energy: {quantity.diesel.quantity} kWh
        </p>
        <p className="text-grey-dark font-thin text-sm leading-normal text-white">
            Distance : {distance} KM
        </p>
        <button className="bg-transparent hover:bg-[#4873b5] border-[#5182cc] font-bold text-white py-1  border  hover:border-transparent rounded" onClick={()=>{
            setShowModal(true)
        }}>
          View
        </button>
        {
            showModal?
            <PreviewModal content={station} setOnCancel={setShowModal} setOnSubmit={
              (id)=>{
                navigate(`/user/bookOrder/${id}`)
              }
            }/>
            :null
        }
      </div>
    </div>
  );
}
export default ListStation;
