import axiosInstance from "../../config/axiosInstance";

export const setNewVote = async (ideaId: string) => {
    try {
        const response = await axiosInstance.post(`/vote`, {
            ideaId,
        });
        return response.data;
    } catch (error) {
        console.error("Error setting new vote:", error);
        throw error;
    }
};
