import { login } from "@/api/auth";
import { useState, useTransition } from "react";

export default function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isPending, startTransition] = useTransition();
    const submitLogin = () => {
        startTransition(async () => {
            await login({ username, password });
        });
    };

    return (
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
            <div className="flex flex-col space-y-2">
                <button 
                    className='border-2 border-agency-red-700 text-agency-red-700 rounded py-2 font-bold cursor-pointer'
                    onClick={submitLogin}
                    disabled={isPending}
                >
                    Log In
                </button>
            </div>
        </div>
    );
}