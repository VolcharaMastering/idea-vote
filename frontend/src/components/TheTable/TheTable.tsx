import { useEffect, useState } from "react";
import "./TheTable.scss";
import { getAllIdeas } from "../../utils/api/getAllIdeas";
import ListDataBar from "../OneItemListCell/ListDataBar";

const TheTable: React.FC = () => {
    const [dataRequest, setDataRequest] = useState(true);
    const [dataList, setDataList] = useState<Idea[]>([]);

    const fetchAllIdeas = async () => {
        try {
            const ideas = await getAllIdeas();

            setDataList(ideas);
            setDataRequest(false);
        } catch (error) {
            console.error("Error fetching ideas:", error);
        }
    };

    useEffect(() => {
        if (dataList.length === 0 || dataRequest) {
            fetchAllIdeas();
        }
    }, [dataList]);
    console.log(dataList, "dataList in TheTable", dataRequest);

    return (
        <ul className="table">
            {dataList.length > 0 &&
                dataList.map((item) => (
                    <ListDataBar key={item.id} itemData={item} buttonType="vote" />
                ))}
        </ul>
    );
};
export default TheTable;
