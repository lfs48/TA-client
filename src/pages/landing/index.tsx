import { useState } from "react";

import LoginForm from "./login-form";
import SignupForm from "./signup-form";

const stableText = Array(33).fill('STABILIZE REALITY').join(' ');

enum FormState {
    Login,
    Register,
};

export default function Landing() {

    const [formState, setFormState] = useState(FormState.Login);


    return (
        <div className="flex justify-center items-center w-screen h-screen bg-agency-red">        
            <div className="origin-top-left fixed -top-8 left-2/3 rotate-45 w-[150vw] h-8 bg-white text-agency-red font-bold text-nowrap overflow-hidden flex items-center justify-center select-none">
                {stableText}
            </div>
            <div className="origin-bottom-right fixed -bottom-8 right-2/3 rotate-45 w-[150vw] h-8 bg-white text-agency-red font-bold text-nowrap overflow-hidden flex items-center justify-center select-none">
                {stableText}
            </div>
            <div className='space-y-2'>
                <h1 className="text-4xl font-bold mb-4 text-white select-none">Welcome, {'<'}Agent / User{'>'}</h1>
                {(formState === FormState.Login) ? (
                    <LoginForm />
                ) : (
                    <SignupForm />
                )}
                <button 
                    className="w-full flex justify-center text-white underline cursor-pointer"
                    onClick={() => setFormState(formState === FormState.Login ? FormState.Register : FormState.Login)}
                >{formState === FormState.Login ? 'Create an Account' : 'Have an Account? Log In'}</button>
            </div>
        </div>
    );
}