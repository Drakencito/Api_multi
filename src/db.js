import mongoose from "mongoose";
export const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb://54.227.142.31:27017/eolicPowerDb');
        console.log("db is connected")
    }catch(error){
        console.log(error);

    }
};
