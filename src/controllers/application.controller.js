import Application from "../models/applications.model.js";
import User from "../models/user.model.js";


export const getApplications = async (req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId);
    const rol = user.rol; 

    const filter = {}; 

    if (rol === "user") {
        filter.userId = userId;
    }

    const applications = await Application.find(filter);

    res.json(applications);
};


export const getApplication =  async(req,res)=>{
    const application = await Application.findById(req.params.id);
    if(!application) return res.status(404).json({message:"application not found"})
    res.json(application)
}

export const createApplications =  async(req,res)=>{
    const{ name, career, position, description} = req.body

    const newApplication = new Application({
        name,
        career,
        position,
        description,
        userId: req.user.id
    })
    const savedApplication = await newApplication.save();
    res.json(savedApplication);
}

export const updateApplications =  async(req,res)=>{
    const application = await Application.findByIdAndUpdate(req.params.id,req.body, {
        new:true
    });
    if(!application) return res.status(404).json({message:"application not found"})
    res.json({message:"application updated"})
}

export const deleteApplications =  async(req,res)=>{
    const application = await Application.findByIdAndDelete(req.params.id);
    if(!application) return res.status(404).json({message:"application not found"})
    res.json({message:"application deleted"})
}