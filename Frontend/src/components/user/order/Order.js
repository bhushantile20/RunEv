import ListStation from "./ListStation";
import LoginLight from "../../../assets/images/4.png";
import { useEffect, useState } from "react";
import SimpleMap from "../../map/Simple";
import AuthService from "../../../services/auth.service";
import { getDistance } from "geolib";
function Order(){
    const [pointer,setPointer] = useState(
        {
            lat:-27.018113420677302,
            lng:-67.78490703081911
        }
    )
    const [stations,setStations] = useState([]);
   
    const getResposne = async () =>{
      try {
        await AuthService.getFuelStation().then(
          (response) => {
              console.log(response)
              setStations(response.data.stations)
          },
          (error) => {
            console.log(error.response.data.message);
          }
        );
      } catch (err) {
        console.log(err);
      }
    }

    useEffect(()=>{
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function(position) {
          setPointer({
            lat : position.coords.latitude,
            lng : position.coords.longitude
          })
        });
      }
    },[])

    useEffect(()=>{
      console.log(pointer)
      getResposne()
    },[pointer])


    const renderedStations = stations?stations.map((element)=>{
      const distance = parseInt(getDistance(
        { latitude:element.location.lat,longitude: element.location.lng },
        { latitude: pointer.lat, longitude: pointer.lng }        
      )/1000)
      const station = {
        ...element,distance
      }
      return(
        <ListStation station={station} />
      )
    }):null;
    
        return(
        <div
        className="w-screen h-screen flex flex-col justify-around items-center lg:md:flex-row"
        style={{
          backgroundImage: `linear-gradient(45deg,rgba(0,0,0, 0.75),rgba(0,0,0, 0.75)),url(${LoginLight})`,
          backgroundPosition: `50% 50%`,
          backgroundSize: `cover`,
          backgroundRepeat: "no-repeat",
        }}
      >
      <div className="text-white p-3 text-center text-[54px] flex flex-row justify-center items-center gap-3  whitespace-break-spaces font-sans  lg:text-[96px] md:text-[74px] ">
            <h1>Orders</h1>
          </div>
      <div className="w-[100%] h-[100%] justify-center lg:w-[50%] items-center flex flex-row flex-wrap overflow-scroll">
        {renderedStations}

      </div>
      </div>
    )
}
export default Order;

// ************************************************************************************************

// import React, { useEffect, useState } from "react";

// const Order = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/orders") // Replace with your correct API URL if needed
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("✅ Orders fetched:", data);
//         setOrders(data);
//       })
//       .catch((err) => {
//         console.error("❌ Failed to fetch orders:", err);
//       });
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>📝 Order List</h2>

//       {orders.length === 0 && <p>No orders available.</p>}

//       {orders.map((order, index) => {
//         const address = order?.address;
//         const lat = address?.lat;
//         const lng = address?.lng;

//         if (lat === undefined || lng === undefined) {
//           return (
//             <div key={order._id || index} style={{ color: "red", marginBottom: "10px" }}>
//               ⚠️ Address not available for this order.
//             </div>
//           );
//         }

//         return (
//           <div
//             key={order._id || index}
//             style={{
//               marginBottom: "15px",
//               padding: "10px",
//               border: "1px solid #ddd",
//               borderRadius: "8px",
//               background: "#f9f9f9",
//             }}
//           >
//             <p><strong>📍 Location:</strong> {lat}, {lng}</p>
//             <p><strong>🛢️ Petrol:</strong> {order.fuel?.petrol?.quantity || 0} L</p>
//             <p><strong>🛢️ Diesel:</strong> {order.fuel?.diesel?.quantity || 0} L</p>
//             <p><strong>💳 Payment Method:</strong> {order.method?.online?.status ? "Online" : "Cash"}</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Order;


// ***********************************************************************



// import ListStation from "./ListStation";
// import LoginLight from "../../../assets/images/loginLight.jpg";
// import { useEffect, useState } from "react";
// import AuthService from "../../../services/auth.service";
// import { getDistance } from "geolib";

// function Order() {
//   const [pointer, setPointer] = useState({
//     lat: -27.018113420677302,
//     lng: -67.78490703081911,
//   });

//   const [stations, setStations] = useState([]);

//   const getResponse = async () => {
//     try {
//       const response = await AuthService.getFuelStation();
//       console.log("✅ Station data fetched:", response.data.stations);
//       setStations(response.data.stations);
//     } catch (error) {
//       console.error("❌ Error fetching stations:", error?.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition(function (position) {
//         setPointer({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//       });
//     }
//   }, []);

//   useEffect(() => {
//     console.log("📍 User pointer:", pointer);
//     getResponse();
//   }, [pointer]);

//   const renderedStations = Array.isArray(stations)
//     ? stations.map((element, index) => {
//         if (
//           !element?.location ||
//           typeof element.location.lat !== "number" ||
//           typeof element.location.lng !== "number"
//         ) {
//           console.warn(`⚠️ Skipped invalid station at index ${index}`, element);
//           return null;
//         }

//         const distance = parseInt(
//           getDistance(
//             { latitude: element.location.lat, longitude: element.location.lng },
//             { latitude: pointer.lat, longitude: pointer.lng }
//           ) / 1000
//         );

//         const station = { ...element, distance };

//         return <ListStation key={element._id || index} station={station} />;
//       })
//     : null;

//   return (
//     <div
//       className="w-screen h-screen flex flex-col justify-around items-center lg:md:flex-row"
//       style={{
//         backgroundImage: `linear-gradient(45deg,rgba(0,0,0, 0.75),rgba(0,0,0, 0.75)),url(${LoginLight})`,
//         backgroundPosition: `50% 50%`,
//         backgroundSize: `cover`,
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="text-white p-3 text-center text-[54px] flex flex-row justify-center items-center gap-3 whitespace-break-spaces font-sans lg:text-[96px] md:text-[74px]">
//         <h1>Orders</h1>
//       </div>

//       <div className="w-[100%] h-[100%] justify-center lg:w-[50%] items-center flex flex-row flex-wrap overflow-scroll">
//         {renderedStations || <p className="text-white">No stations found.</p>}
//       </div>
//     </div>
//   );
// }

// export default Order;
