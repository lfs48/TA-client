import { useGetGameAgentsQuery } from "@/api/agent.api";
import { useSelector } from "react-redux";
import { selectAgentsByIds } from "@/reducers/entities/agent.reducer";
import { Game, RootState } from "@/types";
import { useContext, useMemo } from "react";
import GameContext from "../../game-context";
import Button from "@/components/UI/button";
import { ButtonColors, ButtonStyles } from "@/enum";

interface AgentsTabProps {
    game: Game;
};

export default function AgentsTab({ game }: AgentsTabProps) {

    const {openTab, setSelectedTab} = useContext(GameContext);

    const { isSuccess, isLoading } = useGetGameAgentsQuery(game.id);
    const agents = useSelector((state: RootState) => selectAgentsByIds(state, game.agentIds));

    const handleOpenAgent = (id: string) => {
        openTab(id, 'agents');
        setSelectedTab(id);
    };

    const agentList = useMemo(() => agents.map(agent => (
        <li 
            key={agent.id} 
            className="p-2 bg-gray-100 rounded hover:bg-gray-200"
            onClick={() => handleOpenAgent(agent.id)}
        >
            {agent.name}
        </li>
    )), [agents]);

    return (
    <div className="h-full flex flex-col p-4 space-y-4">
        <h2>Agents</h2>
        <Button 
            color={ButtonColors.RED} 
            style={ButtonStyles.FILL} 
            buttonClasses="w-full py-1"
            onClick={() => {}}
        >New Agent</Button>
        {isSuccess && agents.length > 0 ? (
            <ul className="space-y-2">
                {agentList}
            </ul>
        ) : (
            <p>No Agents have been made for this game yet</p>
        )}
    </div>
    );
}