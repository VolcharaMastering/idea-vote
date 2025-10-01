import CustomButton from "../../UI/CustomButton/CustomButton";
import "./ListDataBar.scss";

type PropsListDataBar = {
    itemData: Idea;
    buttonType: "vote" | "voted" | "expired";
    onVoteSuccess: (value: string) => void;
    setError: (val: string) => void;
};
const ListDataBar: React.FC<PropsListDataBar> = ({
    itemData,
    buttonType = "vote",
    onVoteSuccess,
    setError,
}) => {
    return (
        <li className="list-cell">
            <p className="list-cell-name">{itemData.name}</p>
            <p className="list-cell-text">{itemData.idea}</p>
            <p className="list-cell-count">{itemData.voteCount}</p>
            <CustomButton
                value={buttonType}
                ideaId={itemData.id}
                onVoteSuccess={onVoteSuccess}
                setError={setError}
            />
        </li>
    );
};
export default ListDataBar;
