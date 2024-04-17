import Application from "../models/applications.model.js";
import User from "../models/user.model.js";

export const getApplications = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        const rol = user.rol; 

        const filter = {}; 

        if (rol === "user") {
            filter.userId = userId;
        }

        const applications = await Application.find(filter);

        res.json(applications);
    } catch (error) {
        console.error("Error getting applications:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) return res.status(404).json({ message: "Application not found" });
        res.json(application);
    } catch (error) {
        console.error("Error getting application:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const createApplications = async (req, res) => {
    try {
        const { name, career, position, description } = req.body;

        const newApplication = new Application({
            name,
            career,
            position,
            description,
            userId: req.user.id
        });
        const savedApplication = await newApplication.save();
        res.json(savedApplication);
    } catch (error) {
        console.error("Error creating application:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateApplications = async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!application) return res.status(404).json({ message: "Application not found" });
        res.json({ message: "Application updated" });
    } catch (error) {
        console.error("Error updating application:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteApplications = async (req, res) => {
    try {
        const application = await Application.findByIdAndDelete(req.params.id);
        if (!application) return res.status(404).json({ message: "Application not found" });
        res.json({ message: "Application deleted" });
    } catch (error) {
        console.error("Error deleting application:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
