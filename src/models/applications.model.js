import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,

        },
        career:{
            type: String,
            required: true,

        },
        position:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true,
        }
    },
    {
        timestamps: true,
    }
)

export default  mongoose.model('Application',applicationSchema);