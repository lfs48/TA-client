import { useGetGameAgentsQuery, usePostAgentMutation } from "@/api/agent.api";
import { selectAgentsByIds } from "@/reducers/entities/agent.reducer";
import { Game } from "@/types";
import { useCallback, useContext, useEffect, useMemo } from "react";
import GameContext from "../../game-context";
import Button from "@/components/UI/button";
import { ButtonColors, ButtonStyles } from "@/enum";
import { useAppSelector } from "@/hooks/useAppSelector.hook";

interface AgentsTabProps {
    game: Game;
};

export default function AgentsTab({ game }: AgentsTabProps) {

    const {openTab, setSelectedTab} = useContext(GameContext);

    const { isSuccess, isLoading } = useGetGameAgentsQuery(game.id);
    const [triggerPostAgent, { data: postData, isLoading: isCreating, isSuccess: postSuccess }] = usePostAgentMutation();
    const agents = useAppSelector(state => selectAgentsByIds(state, game.agentIds));

    const handleOpenAgent = (id: string) => {
        openTab(id, 'agents');
        setSelectedTab(id);
    };

    const handleCreateAgent = useCallback(() => {
        const agent = {
            name: 'New Agent',
            gameId: game.id,
        }
        triggerPostAgent({
            agent: agent
        });
    }, [game.id, triggerPostAgent]);

    useEffect(() => {
        if (postSuccess && postData) {
            openTab(postData.agent.id, 'agents');
            setSelectedTab(postData.agent.id);
        }
    }, [postSuccess, postData]);

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
            onClick={handleCreateAgent}
            loading={isLoading || isCreating}
        >New Agent</Button>
        {isLoading && (
            [...Array(4)].map((_, index) => (
                <div key={index} className="h-8 bg-gray-200 rounded animate-pulse" />
            ))
        )}
        {!isLoading && isSuccess && agents.length > 0 ? (
            <ul className="space-y-2">
                {agentList}
            </ul>
        ) : (
            <p>No Agents have been made for this game yet</p>
        )}
    </div>
    );
}