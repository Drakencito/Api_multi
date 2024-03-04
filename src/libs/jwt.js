import jwt from 'jsonwebtoken'
import { T0KEN_SECRET } from "../config.js";

export function createAccessToken(payload){
    return new Promise((resolve, reject) =>{
        jwt.sign(
            payload,
            T0KEN_SECRET,
            {
                expiresIn: "1d",
            },
            (err, token) =>{
                if(err) reject(err)
                resolve(token)
            }
        );
    })
}

