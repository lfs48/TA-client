import { useContext, useEffect, useState } from "react";

import { useRegisterMutation } from "@/api/auth.api";
import Button from "@/components/UI/button";
import { ButtonColors, ButtonStyles } from "@/enum";
import LandingContext from "./landing-context";
import { isErrorResponse } from "@/util/error.util";
import PasswordInput from "./password-input";

export default function SignupForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { setErrors } = useContext(LandingContext);

    const [triggerLogin, { error, isLoading }] = useRegisterMutation();

    const handleRegister = () => {
        if (password !== confirmPassword) {
            setErrors(["Passwords must match"]);
            return;
        }
        triggerLogin({
            credentials: {
                username,
                password
            }
        });
    };

    useEffect(() => {
        if (error) {
            console.log(error)
            if ( isErrorResponse(error) ) {
                setErrors(error.data.messages);
            } else {
                setErrors(["Something went wrong."]);
            }
        }
    }, [error]);
    
    const signupDisabled = (
        username.length === 0 || 
        password.length === 0 || 
        confirmPassword.length === 0
    );

    return (
        <div className='flex flex-col space-y-8 rounded-lg p-4 bg-white shadow-md'>
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
                <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    show={showPassword}
                    onToggleShow={() => setShowPassword(!showPassword)}
                />
            </div>
            <div className='flex flex-col space-y-0.5'>
                <label className='px-0.5 text-agency-red font-bold text-xs'>Confirm Password</label>
                <PasswordInput
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    show={showPassword}
                    onToggleShow={() => setShowPassword(!showPassword)}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <Button
                    color={ButtonColors.RED}
                    style={ButtonStyles.OUTLINE}
                    className='w-full'
                    buttonClasses='w-full py-2'
                    onClick={handleRegister}
                    disabled={signupDisabled}
                    loading={isLoading}
                >
                    Sign Up
                </Button>
            </div>
        </div>
    );
}