import mongoose from "mongoose";
export const connectDB = async () =>{
    try{
        await mongoose.connect("mongodb+srv://adrii:Adr321esp@eolicpower.rzklbfz.mongodb.net/eolicPowerDb");
        console.log("db is connected")
    }catch(error){
        console.log(error);

    }
};
