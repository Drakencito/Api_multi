import Event from "../models/event.model.js";

export const createEvent =  async(req,res)=>{
    const{ title, description,date} = req.body

    const newEvent = new Event({
        title,
        description,
        date
    })
    const savedEvent = await newEvent.save();
    res.json(savedEvent);
}
export const getEvents =  async (req,res)=>{
    const event= await Event.find({})
    res.json(event);
}

export const updateEvents =  async(req,res)=>{
    const event = await Event.findByIdAndUpdate(req.params.id,req.body, {
        new:true
    });
    if(!event) return res.status(404).json({message:"Events not found"})
    res.json({message:"Events updated"})
}

export const deleteEvents =  async(req,res)=>{
    const event = await Event.findByIdAndDelete(req.params.id);
    if(!event) return res.status(404).json({message:"Events not found"})
    res.json({message:"Event deleted"})
}