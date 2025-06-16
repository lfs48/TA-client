import { Game } from "@/types"
import Button from "@/components/UI/button";
import { useMemo } from "react";
import { ButtonColors, ButtonStyles } from "@/enum";
import { useRemovePlayerMutation } from "@/api/game.api";

interface PlayersTabProps {
    game: Game;
}

export default function PlayersTab({
    game,
}: PlayersTabProps) {

    const { id, players } = game;

    const [triggerRemovePlayer, {}] = useRemovePlayerMutation();

    const handleRemovePlayer = (playerId:string) => {
        const data = {
            gameId: id,
            playerId,
        };
        triggerRemovePlayer(data);
    }

    const playerList = useMemo(()=>(
        players.map(({id, username}) => (
            <div key={id} className="flex justify-between items-center pb-2 border-b border-b-agency-red-500 last:border-b-0">
                <div className="text-[1.25rem] font-bold">{username}</div>
                <Button 
                    style={ButtonStyles.FILL} 
                    color={ButtonColors.RED}
                    className="px-1 py-0.5"
                    onClick={()=>handleRemovePlayer(id)}
                >Remove</Button>
            </div>
        ))
    ), [game]);
    
    return(
        <div className="flex flex-col p-4 space-y-6">
            <h2>Manage Players</h2>
            <div className="flex flex-col space-y-2">
                {playerList}
            </div>
        </div>
    )
}