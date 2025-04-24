import { User } from "../db/index.js";

export const createUser = async (req, res) => {
    const { name, email, designation } = req.body;
    try {
        const user = await User.create({ name, email, designation });
        res.status(201).json({
            message: "User created successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal server error",
        });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ where: { id } });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal server error",
        });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal server error",
        });
    }
};

export const updateUser = async (req, res) => {
    const { name, email, designation } = req.body;
    const { id } = req.params;
    try {
        const user = await User.findOne({ where: { id } });
        if (!user) return res.status(404).json({ message: "User not found" });
        await User.update({ name, email, designation }, { where: { id } });
        res.status(200).json({
            message: "User updated successfully",

            data: { id, name, email, designation },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal server error",
        });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ where: { id } });
        if (!user) return res.status(404).json({ message: "User not found" });
        await User.destroy({ where: { id } });
        res.status(200).json({
            message: "User deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Internal server error",
        });
    }
};
