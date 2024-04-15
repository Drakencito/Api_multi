import Usuario from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import  {createAccessToken} from "../libs/jwt.js";

export const register = async (req,res) => {
    const {email,password,name,gender,age}=req.body
    console.log(email,password,name,gender,age)
    
    

    try {
        const passwordHash = await bcrypt.hash(password,10)
        const newUser = new Usuario({
            name,
            email,
            password:passwordHash,
            gender,
            age,
            rol: "user"
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({id:userSaved._id});
        res.cookie('token', token);
        res.json(userSaved);
        console.log("registrando");
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export const login = async (req,res) => {
    const {email,password}=req.body
    console.log(email,password)
    
    try {
        const userFound = await Usuario.findOne({email})
        if(!userFound) return res.status(400).json({message:"User not found"})

        const isMatch = await bcrypt.compare(password,userFound.password);
        if(!isMatch) return res.status(400).json({message:"incorrect password"});

     
        const token = await createAccessToken({id:userFound._id});
        res.cookie('token', token);
        res.json(userFound);
        console.log("logeado");
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export const logout =  (req,res) => {
    res.cookie('token',"", {
        expires: new Date(0) 
    })
    return res.sendStatus(200)
};

export const userProfile = async(req,res) => {
    const userFound = await Usuario.findById(req.user.id);
    if(!userFound) return res.status(400).json({message: " user not found"})
    
    return res.json({
        id: userFound._id,
        name: userFound.name,
        email:userFound.email
    })
}