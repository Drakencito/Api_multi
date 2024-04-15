import { z } from "zod";

export const registerSchema = z.object({
    name: z.string({
        required_error: "name is required"
    }),
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid email"
    }),
    password: z.string({
        required_error:"Password is required"
    }).min(5,{
        message: "password must be at least 5 characters"
    })
   
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid email"
    }),
    password: z.string({
        required_error:"Password is required"
    }).min(5,{
        message: "password must be at least 5 characters"
    })
})