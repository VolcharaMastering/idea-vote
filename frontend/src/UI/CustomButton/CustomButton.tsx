import { memo } from "react";
import "./CustomButton.scss";
import { setNewVote } from "../../utils/api/setNewVote";

type PropsButton = {
    value: string;
    ideaId: string;
};

const CustomButton: React.FC<PropsButton> = ({ value, ideaId }) => {
    const handleClick = () => {
        setNewVote(ideaId);
    };
    return (
        <button
            className={`button ${value}`}
            type="button"
            onClick={handleClick}
            disabled={value !== "vote"}
        >
            {value}
        </button>
    );
};

export default memo(CustomButton);
