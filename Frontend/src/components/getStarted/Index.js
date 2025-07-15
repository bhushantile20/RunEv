import { useNavigate } from "react-router-dom"
import GetStarted  from "../../assets/images/getStarted.png"
import { useEffect } from "react";
function Index(){
    const navigate = useNavigate();
    return(
        <div className="w-screen h-screen bg-[#252422] flex flex-col lg:flex-row justify-evenly items-center">
            <div className="h-[45%]">
                <img src={GetStarted} alt={"Get Started"}/>
            </div>
            <div className="text-white flex flex-col gap-10">
                <div className="header">
                    <h1 className="text-center text-[54px]">
                        Let's Started
                    </h1>
                    <p>
                        Power up your EV anywhere — anytime, hassle-free.
                    </p>
                </div>
                <div className="actions w-full flex flex-col gap-4">
                    <button className="bg-[#5182cc] hover:bg-[#5182cc] text-white font-bold py-2 px-4 rounded-full"
                    onClick={()=>{
                        navigate('user/auth/login')
                    }}
                    >
                        User
                    </button>
                    <button className="bg-transparent border border-[#5182cc] hover:bg-[#5182cc] text-white font-bold py-2 px-4 rounded-full"
                        onClick={()=>{
                        navigate('seller/auth/login')
                    }}
                    >
                        Seller
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Index