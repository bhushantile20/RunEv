import LoginLight from "../../../assets/images/4.png";
import { useEffect, useState } from "react";
import SimpleMap from "../../map/Simple";
import AuthService from "../../../services/auth.service";
import { getDistance } from "geolib";
import { useNavigate } from "react-router-dom";
import ListStation from "../../user/order/ListStation";
import ListOrderHistory from "./ListOrderHistory";
import { toast } from "react-toastify";
function OrderHistory(){
    const [orders,setOrders] = useState(null);
    const navigate = useNavigate();
    const user = AuthService.getCurrentUser();
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
      if(!user){
          navigate('/home')
      }
    },[user])
    
    const getOrders = async () =>{
        try {
          await AuthService.getUserOrders(user.userId).then(
            (response) => {
                console.log(response)
                setOrders(response.data)
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
        getOrders()
        setLoading(false);
    },[loading])

    const renderedOrders = (orders)?orders.map((element)=>{
        const {isAccepted,isCanceled,isDelivered} = element;
        return(
            <ListOrderHistory order={element} setLoading={setLoading}/>
        )
    }):null
    
    useEffect(()=>{
      if(renderedOrders && renderedOrders.length === 0){
        toast.warning("There are No Past Order")
        navigate('../');
      }
    },[renderedOrders])
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
          <h1>Past Orders</h1>
        </div>
    <div className="w-[100%] h-[100%] justify-center lg:w-[50%]  items-center flex flex-row flex-wrap overflow-scroll">
      {renderedOrders}
    </div>
    </div>
    )
}
export default OrderHistory;