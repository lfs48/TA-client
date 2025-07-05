import { usePostGameMutation } from "@/api/game.api";
import LobbyContext from "../lobby-context";
import { useCallback, useContext, useEffect, useState } from "react";
import Button from "@/components/UI/button";
import { ButtonColors, ButtonStyles } from "@/enum";

export default function NewGameForm() {

    const {setCreating} = useContext(LobbyContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [triggerPostGame, { isSuccess, isLoading }] = usePostGameMutation();

    const resetInputs = useCallback( () => {
        setTitle('');
        setDescription('');
    }, [setTitle, setDescription]);

    const handleCancel = () => {
        resetInputs();
        if (setCreating) { setCreating(false); }
    };

    const handleCreate = () => {
        const body = {
            game: {
                title,
                description
            }
        }
        triggerPostGame(body);
    };

    useEffect( () => {
        if(isSuccess) {
            resetInputs();
            setCreating(false);
        }
    }, [isSuccess, resetInputs, setCreating])

    return(
        <div 
            className='bg-white rounded'
        >
            <header className='h-[5rem] flex justify-between items-center px-4 border-b-2 border-b-deep-purple py-2'>
                <div className='flex flex-col'>
                    <input className='text-[1.5rem] font-bold focus:outline-none'
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="space-x-2">
                    <Button 
                        color={ButtonColors.RED}
                        style={ButtonStyles.FILL}
                        buttonClasses='w-[5rem] px-2 py-1'
                        onClick={handleCreate}
                        loading={isLoading}
                    >Create</Button>
                    <Button
                        color={ButtonColors.RED}
                        style={ButtonStyles.OUTLINE}
                        buttonClasses='w-[5rem] px-2 py-1'
                        onClick={handleCancel}
                        disabled={isLoading}
                    >Cancel</Button>
                </div>
            </header>
            <textarea
                className="w-full h-[20rem] px-4 py-2 focus:outline-none resize-none overflow-y-auto scrollbar-thin"
                placeholder='Write a description for your game.'
                value={description}
                onChange={(e) => setDescription(e.target.value)}

            />
        </div>
    )
}