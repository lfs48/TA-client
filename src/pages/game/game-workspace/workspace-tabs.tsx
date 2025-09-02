import GameContext from "../game-context";
import { useSelector } from "react-redux";
import { selectEntities } from "@/reducers/entities/entities.reducer";
import { EntityTypeName, RootState } from "@/types";
import { useContext, useMemo } from "react";
import { RiCloseLine } from "@remixicon/react";

export default function WorkspaceTabs() {

    const { openTabs, closeTab, setSelectedTab } = useContext(GameContext);

    const entities = useSelector((state:RootState) => selectEntities(state, openTabs));

    const tabs = useMemo(()=>{
        return Object.entries(openTabs).map(([id, type]) => {
            if (entities && type in entities && id in entities[type] ) {
                const entity = entities[type][id];
                return(
                    <div 
                        key={id}
                        className="w-32 h-6 flex justify-between items-center bg-gray-300 p-1 rounded cursor-pointer"
                        onClick={() => setSelectedTab(id)}
                    >
                        <span className="text-xs overflow-ellipsis">{entityTabName(type, entity)}</span>
                        <RiCloseLine 
                            className="size-4 text-agency-red"
                            onClick={() => closeTab(id)}
                        />
                    </div>
                )
            }
        });
    }, [openTabs, entities])

    return tabs.length > 0 ? (
        <div className="flex flex-wrap space-x-2 gap-y-2 bg-white rounded p-2">
            {tabs}
        </div>
    ) : null;
}

function entityTabName(type:EntityTypeName, entity:any) {
    switch(type) {
        case 'agents':
            return entity.name;
    }
}