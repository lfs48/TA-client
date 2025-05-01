import { useState } from "react";

export default function Landing() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const footerText = Array(33).fill('STABILIZE REALITY').join(' ');

    return (
        <div className="flex justify-center items-center w-screen h-screen bg-agency-red">        
            <div className="origin-top-left fixed -top-8 left-2/3 rotate-45 w-[150vw] h-8 bg-white text-agency-red font-bold text-nowrap overflow-hidden flex items-center justify-center select-none">
                {footerText}
            </div>
            <div className="origin-bottom-right fixed -bottom-8 right-2/3 rotate-45 w-[150vw] h-8 bg-white text-agency-red font-bold text-nowrap overflow-hidden flex items-center justify-center select-none">
                {footerText}
            </div>
            <div className='space-y-2'>
                <h1 className="text-4xl font-bold mb-4 text-white">Welcome, {'<'}Agent / User{'>'}</h1>
                <div className='flex flex-col space-y-8 rounded-lg p-4 bg-white'>
                    <div className='flex flex-col space-y-0.5'>
                        <label className='px-0.5 text-agency-red font-bold text-xs'>Username</label>
                        <input 
                            className='border-b border-agency-red px-0.5 pb-0.5 focus:outline-none'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col space-y-0.5'>
                        <label className='px-0.5 text-agency-red font-bold text-xs'>Password</label>
                        <input
                            type='password'
                            className='border-b border-agency-red px-0.5 pb-0.5 focus:outline-none'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className='border-2 border-agency-red text-agency-red rounded py-2 font-bold cursor-pointer'>Log In</button>
                </div>
                <a className='flex justify-center w-full text-white font-bold' href='/signup'>Sign Up</a>
            </div>
        </div>
    );
}