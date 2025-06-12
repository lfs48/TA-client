export default function LobbyControls() {

    return (
        <div className='w-full flex px-4 py-2 justify-between items-center bg-white rounded'>
            <h1 className='text-agency-red text-[1.75rem] leading-none'>Games</h1>
            <button className='w-40 border-2 border-deep-purple bg-deep-purple rounded py-2 font-bold cursor-pointer text-white'>Create Game</button>
        </div>
    );
}