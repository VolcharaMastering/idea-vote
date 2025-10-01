import axiosInstance from "../../config/axiosInstance";

export const getAllIdeas = async () => {
    try {
        console.log("getAllIdeas called");
        const response = await axiosInstance.get("/");
        console.log(response.data, "response in getAllIdeas");
        return response.data;
    } catch (error) {
        console.error("Error getting ideas:", error);
        throw error;
    }
};
