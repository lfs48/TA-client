import { RiArrowLeftSFill } from "@remixicon/react";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

export default function NavLeft() {
    const {pathname} = useLocation();
    const navigate = useNavigate();

    const content = useMemo(()=>{
        if(pathname.includes('game')) {
            return(
                <button
                    className="flex space-x-2 -ml-2 cursor-pointer text-white"
                    onClick={()=>navigate('/lobby')}
                >
                    <RiArrowLeftSFill />
                    Back to Lobby
                </button>
            )
        }
        return <></>;
    }, [pathname])

    return content;
}