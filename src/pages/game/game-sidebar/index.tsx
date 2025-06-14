import { Game } from "@/types";
import Button from "@/components/UI/button";
import { useState } from "react";
import { ButtonColors, ButtonStyles } from "@/enum";

interface GameSidebarProps {
    game: Game;
}

export default function GameSidebar({
    game,
}: GameSidebarProps) {

    const { title, description } = game;

    const [editingTitle, setEditingTitle] = useState(false);
    const [titleInput, setTitleInput] = useState(title);

    const [editingDescription, setEditingDescription] = useState(false);
    const [descriptionInput, setDescriptionInput] = useState(description);

    return(
        <div className="w-[25rem] h-screen-minus-nav absolute top-0 right-0 bg-white">
            <div className="flex flex-col p-4 space-y-6">
                <h2>Game Settings</h2>
                <div className="flex flex-col space-y-2">
                    <label className="text-agency-red font-bold">Title</label>
                    <input
                        className="px-1 py-0.5 bg-gray-200 disabled:bg-gray-300 rounded"
                        value={titleInput}
                        onChange={(e)=>setTitleInput(e.target.value)}
                        disabled={!editingTitle}
                    />
                    <div className="w-full flex justify-end space-x-2">
                    {editingTitle ? (
                            <>
                            <Button
                                className='w-20 px-2 py-0.5'
                                color={ButtonColors.RED} 
                                style={ButtonStyles.FILL}
                            >Save</Button>
                            <Button
                                className='w-20 px-2 py-0.5'
                                color={ButtonColors.RED} 
                                style={ButtonStyles.OUTLINE}
                                onClick={()=>setEditingTitle(false)}
                            >Cancel</Button>
                            </>
                    ) : (
                        <Button
                            className='w-20 px-2 py-0.5'
                            color={ButtonColors.RED} 
                            style={ButtonStyles.FILL}
                            onClick={()=>setEditingTitle(true)}
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
                        disabled={!editingDescription}
                    />
                    <div className="flex justify-end space-x-2">
                    {editingDescription ? (
                        <>
                            <Button
                                className='w-20 px-2 py-0.5'
                                color={ButtonColors.RED} 
                                style={ButtonStyles.FILL}
                            >Save</Button>
                            <Button
                                className='w-20 px-2 py-0.5'
                                color={ButtonColors.RED} 
                                style={ButtonStyles.OUTLINE}
                                onClick={()=>setEditingDescription(false)}
                            >Cancel</Button>
                        </>
                    ) : (
                        <Button
                            className='w-20 px-2 py-0.5'
                            color={ButtonColors.RED} 
                            style={ButtonStyles.FILL}
                            onClick={()=>setEditingDescription(true)}
                        >Edit</Button>
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}