import CustomButton from "../../UI/CustomButton/CustomButton";
import "./ListDataBar.scss";

type PropsListDataBar = {
    itemData: Idea;
    buttonType?: "vote" | "voted" | "expired";
};
const ListDataBar: React.FC<PropsListDataBar> = ({ itemData, buttonType = "vote" }) => {
    return (
        <li className="list-cell">
            <p className="list-cell__item">{itemData.name}</p>
            <p className="list-cell__item">{itemData.idea}</p>
            <p className="list-cell__item">{itemData.voteCount}</p>
            <CustomButton value={buttonType} ideaId={itemData.id} />
            {/* <p className="list-cell__data">{!itemData ? 0 : itemData}</p> */}
        </li>
    );
};
export default ListDataBar;
