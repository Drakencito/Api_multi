import mongoose from "mongoose";
export const connectDB = async () =>{
    try{
        await mongoose.connect("mongodb://localhost/eolicPowerDb");
        console.log("db is connected")
    }catch(error){
        console.log(error);

    }
};
