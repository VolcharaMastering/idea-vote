import { memo, useState } from "react";
import "./CustomButton.scss";
import { setNewVote } from "../../utils/api/setNewVote";

type PropsButton = {
    value: string;
    ideaId: string;
    onVoteSuccess: (value: string) => void;
    setError: (val: string) => void;
};

const CustomButton: React.FC<PropsButton> = ({ value, ideaId, onVoteSuccess, setError }) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleClick = async () => {
        if (value !== "vote") return;
        try {
            await setNewVote(ideaId);
            onVoteSuccess(ideaId);
        } catch (error) {
            console.error("Failed to submit vote:", error);
            setError("Failed to submit vote. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    const buttonText = isLoading ? "Sending..." : value;
    return (
        <button
            className={`button ${value}`}
            type="button"
            onClick={handleClick}
            disabled={value !== "vote"}
        >
            {buttonText}
        </button>
    );
};

export default memo(CustomButton);
