import { useCallback, useEffect, useState } from "react";
import "./TheTable.scss";
import { getAllIdeas } from "../../utils/api/getAllIdeas";
import ListDataBar from "../OneItemListCell/ListDataBar";

const TheTable: React.FC = () => {
    const [dataList, setDataList] = useState<Idea[]>([]);
    const [expired, setExpired] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleVoteSuccess = useCallback((ideaId: string) => {
        setDataList((prevList) =>
            prevList.map((idea) => {
                if (idea.id === ideaId) {
                    // Update counter locally
                    return { ...idea, voteCount: idea.voteCount + 1, voted: true };
                }
                return idea;
            })
        );
        setDataList((prevList) => {
            const userVoted = prevList.filter((idea) => idea.voted).length;
            setExpired(userVoted >= 10);
            return prevList;
        });
    }, []);

    const fetchAllIdeas = useCallback(async () => {
        setIsLoading(true);
        try {
            const ideas = await getAllIdeas();
            setDataList(ideas);

            // count user votes
            const userVoted = ideas.filter((idea: Idea) => idea.voted).length;
            setExpired(userVoted >= 10);
        } catch (error) {
            console.error("Error fetching ideas:", error);
            setError("Failed to load ideas. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllIdeas();
    }, [fetchAllIdeas]);

    if (isLoading) {
        return <div>Loading ideas...</div>;
    }
    if (error) {
        return <div className="error-message">{error}</div>;
    }
    return (
        <ul className="table">
            <li className="list-cell">
                <p className="list-cell-name">Name</p>
                <p className="list-cell-text">Idea</p>
                <p className="list-cell-count">Votes</p>
                <p className="list-cell-button">Vote for</p>
            </li>
            {dataList.length > 0 &&
                dataList.map((item) => (
                    <ListDataBar
                        key={item.id}
                        itemData={item}
                        buttonType={expired ? "expired" : item.voted ? "voted" : "vote"}
                        onVoteSuccess={handleVoteSuccess}
                        setError={setError}
                    />
                ))}
        </ul>
    );
};
export default TheTable;
