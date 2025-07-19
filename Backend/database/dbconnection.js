// import mongoose from "mongoose";

// export const dbconnect=async()=>{
//     mongoose.connect("mongodb+srv://janhvisinghshrinet:Twinkle123@cluster0.epnczpn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true })
//         .then(() => console.log("Mongodb started")) 
//         .catch((err) => console.log(err))

// } 


import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbconnect = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
  }
};
