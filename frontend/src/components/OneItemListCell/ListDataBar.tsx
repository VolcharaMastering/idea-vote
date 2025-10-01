import CustomButton from "../../UI/CustomButton/CustomButton";
import "./ListDataBar.scss";

type PropsListDataBar = {
    itemData: Idea;
    buttonType?: "vote" | "voted" | "expired";
    onVoteSuccess: (value: string) => void;
};
const ListDataBar: React.FC<PropsListDataBar> = ({
    itemData,
    buttonType = "vote",
    onVoteSuccess,
}) => {
    return (
        <li className="list-cell">
            <p className="list-cell-name">{itemData.name}</p>
            <p className="list-cell-text">{itemData.idea}</p>
            <p className="list-cell-count">{itemData.voteCount}</p>
            <CustomButton value={buttonType} ideaId={itemData.id} onVoteSuccess={onVoteSuccess} />
        </li>
    );
};
export default ListDataBar;
