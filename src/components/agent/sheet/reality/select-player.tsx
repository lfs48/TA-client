import Select from "@/components/UI/select";
import { useAppSelector } from "@/hooks/useAppSelector.hook";
import { useContext, useEffect } from "react";
import AgentSheetContext from "../agent-sheet-context";
import { selectGameById } from "@/reducers/entities/games.reducer";
import { selectUsersById } from "@/reducers/entities/users.reducer";
import { gameSkeleton } from "@/util/game.util";

export default function SelectPlayer() {
    const { agent } = useContext(AgentSheetContext);
    const { gameId } = agent;
    const game = useAppSelector(state => selectGameById(state, gameId)) || gameSkeleton;
    const { playerIds } = game;
    const players = useAppSelector(state => selectUsersById(state, playerIds));

    useEffect(() => {
        console.log('Players:', players);
    }, [ playerIds, players ]);

    const playerOptions = Object.values(players).map(({id, username}) => ({
        value: id,
        label: username
    }));
    return (
        <Select
            className="w-full"
            options={playerOptions}
            // Add other necessary props for the Select component
        />
    )
}