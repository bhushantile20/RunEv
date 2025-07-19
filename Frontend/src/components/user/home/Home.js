import LoginLight from "../../../assets/images/6.png";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import { useEffect, useState } from "react";
import SimpleMap from "../../map/Simple";
import NormalMap from "../../map/NormalMap";
function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
  const [name,setName] = useState("");
  const [pointer,setPointer] = useState({})
  useEffect(() => {
    if (!user) {
      navigate("/user/auth/login");
    }
  }, [user]);

  useEffect(() => {
  const updatePointer = (position) => {
    const { latitude, longitude } = position.coords;
    setPointer({ lat: latitude, lng: longitude });
  };

  const handleError = (error) => {
    console.error("Geolocation error:", error.message);
    // Optionally: Set a default location if user denies permission
    // setPointer({ lat: 19.0760, lng: 72.8777 }); // Example: Mumbai
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(updatePointer, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });

    const watchId = navigator.geolocation.watchPosition(
      updatePointer,
      handleError,
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  } else {
    console.warn("Geolocation is not supported by this browser.");
  }
}, []);



  const getResposne = async () => {
    try {
      await AuthService.getUserInfo(user.userId).then(
        (response) => {
          console.log(response);
          setName(response.data.name);
        },
        (error) => {
          console.log(error.response.data.message);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getResposne();
  }, []);
  

  return (
    <div
      className="w-screen h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(45deg,rgba(0,0,0, 0.75),rgba(0,0,0, 0.75)),url(${LoginLight})`,
        backgroundPosition: `50% 50%`,
        backgroundSize: `cover`,
        backgroundRepeat: "no-repeat",
      }}
    >
      
      <div className="flex w-full h-full flex-col gap-10 justify-evenly items-center align lg:flex-row lg:gap-0 md:gap-5">
         <div className="flex w-1/2 h-1/2 lg:w-1/2 lg:h-[75%] flex-coL">
        <NormalMap pointer={pointer} setPointer={setPointer} />
      </div>
        {/* <div className="flex w-1/2 h-1/2 lg:w-1/2 lg:h-[75%] flex-coL">
          {pointer ? (
            <SimpleMap
              pointer={pointer}
              setPointer={setPointer}
              disable={true}
            />
          ) : null}
        </div> */}
         <div className="flex flex-row justify-evenly items-center  gap-5 lg:flex-row flex-wrap lg:gap-10 lg:w-[30%] ">
          <div className="text-white text-center text-[54px] flex flex-row justify-center items-center gap-3  whitespace-break-spaces font-sans  lg:text-[78px] md:text-[74px] ">
            <h1>{"Hey, " + name.split(" ")[0]}</h1>
          </div>
          <div className="flex flex-row justify-evenly items-center  gap-3 lg:flex-row flex-wrap lg:gap-5 lg:w-[100%] ">
            {/* { <div>
              <Link
                to="/user/update-inventory"
                className="flex items-center justify-center  w-[200px] h-[100px] bg-gray-800 rounded-lg shadow hover:bg-[#fe6f2b]"
              >
                <h5 className="mb-2 lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Update Fuel
                </h5>
              </Link>
            </div> } */}
            <div>
              <Link
                to="/user/order"
                className="flex items-center justify-center  w-[200px] h-[100px] bg-gray-800 rounded-lg shadow hover:bg-[#5182cc]"
              >
                <h5 className="mb-2 lg:text-2xl font-bold tracking-tight text-white dark:text-white">
                    Order RunEv
                  <p>Charging services </p>
                </h5>
              </Link>
            </div>
            <div>
              <Link
                to="/user/orderHistory"
                className="flex items-center justify-center  w-[200px] h-[100px] bg-gray-800 rounded-lg shadow hover:bg-[#5182cc]"
              >
                <h5 class="mb-2 lg:text-2xl font-bold tracking-tight text-white dark:text-white">
                  Order History
                </h5>
              </Link>
            </div>
            <div>
              <Link
                to="/user/Profile"
                className="flex items-center justify-center  w-[200px] h-[100px] bg-gray-800 rounded-lg shadow hover:bg-[#5182cc]"
              >
                <h5 className="mb-2  lg:text-2xl font-bold tracking-tight text-white dark:text-white">
                  Profile
                </h5>
              </Link>
            </div>
            <div>
              <Link
                to="/user/logout"
                className="flex items-center justify-center  w-[200px] h-[100px] bg-gray-800 rounded-lg shadow hover:bg-[#5182cc]"
              >
                <h5 className="mb-2  lg:text-2xl font-bold tracking-tight text-white dark:text-white">
                  Log out
                </h5>
              </Link>
            </div>
          </div>
        </div> 
        </div>
    </div>
  );
}
export default Home;
