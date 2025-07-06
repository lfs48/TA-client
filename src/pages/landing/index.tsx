import { useState } from "react";

import LoginForm from "./login-form";
import SignupForm from "./signup-form";
import LandingContext from "./landing-context";
import ErrorList from "@/components/UI/errors/error-list";
import compatabilityUrl from '@/assets/svg/compatability.svg';

const stableText = Array(33).fill('STABILIZE REALITY').join(' ');

enum FormState {
    Login,
    Register,
};

export default function Landing() {

    const [formState, setFormState] = useState(FormState.Login);
    const [errors, setErrors] = useState<string[]>([]);

    const handleSwitchForm = () => {
        setFormState(formState === FormState.Login ? FormState.Register : FormState.Login);
        setErrors([]);
    }

    return (
        <div className={`
            flex justify-center items-center w-screen h-screen bg-agency-red`
        }>        
            <div className={`
                    origin-top-left fixed top-8 md:-top-8 -left-1/3 md:left-2/3 
                    rotate-12 md:rotate-45 w-[150vw] h-8 bg-white 
                    text-agency-red font-bold text-nowrap overflow-hidden 
                    flex items-center justify-center select-none shadow-md`}>
                {stableText}
            </div>
            <div className={`
                origin-bottom-right fixed bottom-8 md:-bottom-8 md:right-2/3 
                rotate-12 md:rotate-45  w-[150vw] h-8 bg-white 
                text-agency-red font-bold text-nowrap overflow-hidden 
                flex items-center justify-center select-none shadow-md`}>
                {stableText}
            </div>
            <div className='space-y-2'>
                <h1 className={`
                    text-xl md:text-4xl font-bold text-center mb-4 text-white select-none
                `}>Welcome, {'<'}Agent / User{'>'}</h1>
                <LandingContext value={{errors, setErrors}}> 
                    {(formState === FormState.Login) ? (
                        <LoginForm />
                    ) : (
                        <SignupForm />
                    )}
                </LandingContext>
                <ErrorList errors={errors} />
                <button 
                    className="w-full flex justify-center text-white underline cursor-pointer"
                    onClick={handleSwitchForm}
                >{formState === FormState.Login ? 'Create an Account' : 'Have an Account? Log In'}</button>
            </div>
            <img src={compatabilityUrl} className='size-24 md:size-32 fixed -bottom-4 left-4'/>
        </div>
    );
}