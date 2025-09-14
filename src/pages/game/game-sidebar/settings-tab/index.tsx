import { Game } from "@/types";
import Button from "@/components/UI/button";
import { useContext, useEffect, useState } from "react";
import { ButtonColors, ButtonStyles } from "@/enum";
import { usePatchGameMutation } from "@/api/game.api";
import GameContext from "../../game-context";

export default function SettingsTab() {

    const { game } = useContext(GameContext);
    const { title, description } = game;

    const [editingTitle, setEditingTitle] = useState(false);
    const [titleInput, setTitleInput] = useState(title);

    const [editingDescription, setEditingDescription] = useState(false);
    const [descriptionInput, setDescriptionInput] = useState(description);

    const [triggerPatchGame, { data, isLoading, isSuccess }] = usePatchGameMutation();

    const handleSaveTitle = () => {
        const patchedGame = {
            ...game,
            title: titleInput,
        };
        submitPatch(patchedGame);
    }

        const handleSaveDescription = () => {
        const patchedGame = {
            ...game,
            description: descriptionInput,
        };
        submitPatch(patchedGame);
    }

    const submitPatch = (patchedGame:Game) => {
        triggerPatchGame({
            game: patchedGame,
        });
    }

    useEffect(() => {
        if (isSuccess) {
            setTitleInput(data.game.title);
            setDescriptionInput(data.game.description);
            setEditingTitle(false);
            setEditingDescription(false);
        }
    }, [isSuccess]);

    return(
        <div className="flex flex-col p-4 space-y-6">
            <h2>Game Settings</h2>
            <div className="flex flex-col space-y-2">
                <label className="text-agency-red font-bold">Title</label>
                <input
                    className="px-1 py-0.5 bg-gray-200 disabled:bg-gray-300 rounded"
                    value={titleInput}
                    onChange={(e)=>setTitleInput(e.target.value)}
                    disabled={!editingTitle || isLoading}
                />
                <div className="w-full flex justify-end space-x-2">
                {editingTitle ? (
                        <>
                        <Button
                            buttonClasses='w-20 px-2 py-0.5'
                            color={ButtonColors.RED}
                            style={ButtonStyles.FILL}
                            onClick={handleSaveTitle}
                            disabled={isLoading}
                        >Save</Button>
                        <Button
                            buttonClasses='w-20 px-2 py-0.5'
                            color={ButtonColors.RED} 
                            style={ButtonStyles.OUTLINE}
                            onClick={()=>setEditingTitle(false)}
                        >Cancel</Button>
                        </>
                ) : (
                    <Button
                        buttonClasses='w-20 px-2 py-0.5'
                        color={ButtonColors.RED} 
                        style={ButtonStyles.FILL}
                        onClick={()=>setEditingTitle(true)}
                        disabled={isLoading}
                    >Edit</Button>
                )}
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <label className="text-agency-red font-bold">Description</label>
                <textarea
                    className="h-40 px-1 py-0.5 bg-gray-200 disabled:bg-gray-300 overflow-y-auto"
                    value={descriptionInput}
                    onChange={(e)=>setDescriptionInput(e.target.value)}
                    disabled={!editingDescription || isLoading}
                />
                <div className="flex justify-end space-x-2">
                {editingDescription ? (
                    <>
                        <Button
                            buttonClasses='w-20 px-2 py-0.5'
                            color={ButtonColors.RED} 
                            style={ButtonStyles.FILL}
                            onClick={handleSaveDescription}
                            disabled={isLoading}
                        >Save</Button>
                        <Button
                            buttonClasses='w-20 px-2 py-0.5'
                            color={ButtonColors.RED} 
                            style={ButtonStyles.OUTLINE}
                            onClick={()=>setEditingDescription(false)}
                        >Cancel</Button>
                    </>
                ) : (
                    <Button
                        buttonClasses='w-20 px-2 py-0.5'
                        color={ButtonColors.RED} 
                        style={ButtonStyles.FILL}
                        onClick={()=>setEditingDescription(true)}
                    >Edit</Button>
                )}
                </div>
            </div>
        </div>
    )
}