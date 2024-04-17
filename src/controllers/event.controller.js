import Event from "../models/event.model.js";
import User from "../models/user.model.js";

export const createEvent = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        const rol = user.rol; 
        if (rol !== 'admin') {
            return res.status(403).json({ message: 'User is not authorized' });
        }

        const newEvent = new Event({
            title,
            description,
            date
        });
        const savedEvent = await newEvent.save();
        res.json(savedEvent);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getEvents = async (req, res) => {
    const event = await Event.find({});
    res.json(event);
}

export const updateEvents = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        const rol = user.rol;
        if (rol !== 'admin') {
            return res.status(403).json({ message: 'User is not authorized' });
        }

        const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!event) return res.status(404).json({ message: "Events not found" })
        res.json({ message: "Events updated" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteEvents = async (req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId);
    const rol = user.rol; 
    if (rol !== 'admin') {
        return res.status(403).json({ message: 'User is not authorized' });
    }
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Events not found" })
    res.json({ message: "Event deleted" })
}
