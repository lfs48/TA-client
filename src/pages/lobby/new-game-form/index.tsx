import LobbyContext from "../lobby-context";
import { useContext, useState } from "react";

export default function NewGameForm() {

    const {setCreating} = useContext(LobbyContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        if (setCreating) { setCreating(false); }
    };

    return(
        <div 
            className='bg-white rounded'
        >
            <header className='h-[5rem] flex justify-between items-center px-4 border-b-2 border-b-deep-purple py-2'>
                <div className='flex flex-col'>
                    <input className='text-[1.5rem] focus:outline-none'
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <h4 className='text-[0.75rem] text-agency-red'>General Manager</h4>
                </div>
                <div className="space-x-2">
                    <button 
                        className='w-40 border-2 border-agency-red-700 bg-agency-red text-white rounded py-2 font-bold cursor-pointer'
                        onClick={handleCancel}
                    >Cancel</button>
                    <button 
                        className='w-40 border-2 border-agency-red-700 text-agency-red-700 rounded py-2 font-bold cursor-pointer'
                        onClick={()=>{}}
                    >Create</button>
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